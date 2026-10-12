'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getAdminConfig } from '@/lib/auth/config';
import { verifyPassword } from '@/lib/auth/password';
import { clearAttempts, recordFailedAttempt, tooManyAttempts } from '@/lib/auth/rate-limit';
import { createSessionToken, SESSION_COOKIE, SESSION_TTL_SECONDS } from '@/lib/auth/session';
import { clientIp, requireAdmin } from '@/lib/auth/admin';
import { getLeadStore, isLeadPriority, isLeadStatus, type LeadPriority } from '@/lib/leads';
import {
  getContentStore,
  type CatalogKind,
  type FaqTopic,
  type PartnerStatus,
  type CommissionStatus,
  type CampaignStatus,
  type ApplicationStatus,
} from '@/lib/content-store';
import { ADMIN_LANG_COOKIE } from './i18n';

export interface LoginState {
  error: 'invalid' | 'locked' | 'unconfigured' | null;
}

/**
 * Secure unless explicitly disabled. The browser suite runs over plain HTTP on
 * 127.0.0.1 and sets ADMIN_COOKIE_SECURE=false; production never should.
 */
function secureCookies(): boolean {
  return process.env.ADMIN_COOKIE_SECURE !== 'false';
}

/** Only same-site relative paths under /admin may be a post-login destination. */
function safeNext(value: FormDataEntryValue | null): string {
  const next = typeof value === 'string' ? value : '';
  return next.startsWith('/admin') && !next.startsWith('//') ? next : '/admin';
}

export async function login(_previous: LoginState, form: FormData): Promise<LoginState> {
  const config = getAdminConfig();
  if (!config) return { error: 'unconfigured' };

  const ip = await clientIp();
  if (tooManyAttempts(ip)) return { error: 'locked' };

  const email = String(form.get('email') ?? '').trim().toLowerCase();
  const password = String(form.get('password') ?? '');

  // Always run the hash comparison, even for a wrong email, so response time
  // does not reveal which half of the credentials was wrong.
  const passwordOk = await verifyPassword(password, config.passwordHash);
  if (!passwordOk || email !== config.email) {
    recordFailedAttempt(ip);
    return { error: 'invalid' };
  }

  clearAttempts(ip);
  const token = await createSessionToken(config.sessionSecret, config.email);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: secureCookies(),
    sameSite: 'strict',
    path: '/admin',
    maxAge: SESSION_TTL_SECONDS,
  });
  redirect(safeNext(form.get('next')));
}

export async function logout(): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, '', { httpOnly: true, secure: secureCookies(), sameSite: 'strict', path: '/admin', maxAge: 0 });
  redirect('/admin/login');
}

export async function setAdminLang(form: FormData): Promise<void> {
  const lang = form.get('lang') === 'en' ? 'en' : 'ar';
  (await cookies()).set(ADMIN_LANG_COOKIE, lang, { sameSite: 'strict', path: '/admin', maxAge: 60 * 60 * 24 * 365 });
  const back = (await headers()).get('referer');
  redirect(back && new URL(back).pathname.startsWith('/admin') ? new URL(back).pathname + new URL(back).search : '/admin');
}

function requireStore() {
  const store = getLeadStore();
  if (!store) throw new Error('No lead store configured.');
  return store;
}

export async function updateLeadStatus(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  const status = form.get('status');
  if (!isLeadStatus(status)) return;
  await requireStore().updateStatus(id, status);
  revalidatePath('/admin');
  revalidatePath(`/admin/leads/${id}`);
}

export async function updateLeadPriority(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  const priority = form.get('priority');
  if (!isLeadPriority(priority)) return;
  await requireStore().updatePriority(id, priority);
  revalidatePath('/admin');
  revalidatePath(`/admin/leads/${id}`);
}

export async function updateLeadFollowUp(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  const rawDate = String(form.get('followUpDate') ?? '').trim();
  const date = rawDate ? new Date(`${rawDate}T00:00:00Z`) : null;
  await requireStore().updateFollowUp(id, date && !Number.isNaN(date.getTime()) ? date : null);
  revalidatePath('/admin');
  revalidatePath(`/admin/leads/${id}`);
}

export async function updateLeadAssignee(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  const assignee = String(form.get('assignee') ?? '').trim() || null;
  await requireStore().updateAssignee(id, assignee);
  revalidatePath('/admin');
  revalidatePath(`/admin/leads/${id}`);
}

export async function updateLeadTags(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  const rawTags = String(form.get('tags') ?? '').trim();
  const tags = rawTags
    ? rawTags
        .split(/[,;\n]/)
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  await requireStore().updateTags(id, tags);
  revalidatePath('/admin');
  revalidatePath(`/admin/leads/${id}`);
}

export async function addLeadActivity(form: FormData): Promise<void> {
  const session = await requireAdmin();
  const id = String(form.get('id') ?? '');
  const action = String(form.get('action') ?? 'note').trim();
  const details = String(form.get('details') ?? '').trim().slice(0, 4000);
  if (!details) return;
  await requireStore().logActivity(id, session.email.split('@')[0], action, details);
  revalidatePath(`/admin/leads/${id}`);
}

export async function updateLeadNotes(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  const notes = String(form.get('notes') ?? '').slice(0, 10_000);
  await requireStore().updateNotes(id, notes);
  revalidatePath(`/admin/leads/${id}`);
}

/**
 * Permanent deletion — what the privacy policy promises on request. Requires an
 * explicit confirmation box so a stray click cannot erase a lead.
 */
export async function deleteLead(form: FormData): Promise<void> {
  await requireAdmin();
  if (form.get('confirm') !== 'yes') return;
  const id = String(form.get('id') ?? '');
  await requireStore().remove(id);
  revalidatePath('/admin');
  redirect('/admin/leads?deleted=1');
}

/**
 * Manual Lead Creation (Master Prompt §11)
 * Allows administrators to record enquiries received via phone, WhatsApp, or direct meetings.
 */
export async function createLeadManual(form: FormData): Promise<void> {
  const session = await requireAdmin();
  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  if (!name || !email) return;

  const phone = String(form.get('phone') ?? '').trim() || undefined;
  const company = String(form.get('company') ?? '').trim() || undefined;
  const projectType = String(form.get('projectType') ?? '').trim() || undefined;
  const budgetRange = String(form.get('budgetRange') ?? '').trim() || undefined;
  const timeline = String(form.get('timeline') ?? '').trim() || undefined;
  const details = String(form.get('details') ?? '').trim() || undefined;
  const priority = isLeadPriority(form.get('priority')) ? (form.get('priority') as LeadPriority) : 'medium';

  const rawTags = String(form.get('tags') ?? '').trim();
  const tags = rawTags
    ? rawTags.split(/[,;\n]/).map((t) => t.trim()).filter(Boolean)
    : ['Manual Entry'];

  const receiptId = `NVX-M-${Date.now().toString(36).toUpperCase()}`;

  const lead = await requireStore().create({
    receiptId,
    source: 'manual',
    locale: 'ar',
    name,
    email,
    phone,
    company,
    projectType,
    budgetRange,
    timeline,
    details,
    priority,
    tags,
  });

  await requireStore().logActivity(
    lead.id,
    session.email.split('@')[0],
    'manual_created',
    'Lead manually recorded by admin'
  );

  revalidatePath('/admin');
  revalidatePath('/admin/leads');
}

/**
 * Updates full contact and project details for an existing lead.
 */
export async function updateLeadDetails(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  if (!id || !name || !email) return;

  const phone = String(form.get('phone') ?? '').trim() || undefined;
  const company = String(form.get('company') ?? '').trim() || undefined;
  const projectType = String(form.get('projectType') ?? '').trim() || undefined;
  const budgetRange = String(form.get('budgetRange') ?? '').trim() || undefined;
  const timeline = String(form.get('timeline') ?? '').trim() || undefined;
  const details = String(form.get('details') ?? '').trim() || undefined;

  await requireStore().updateDetails(id, {
    name,
    email,
    phone,
    company,
    projectType,
    budgetRange,
    timeline,
    details,
  });

  revalidatePath('/admin');
  revalidatePath('/admin/leads');
  revalidatePath(`/admin/leads/${id}`);
}

/* =========================================================================
   Catalog & Services CRUD Actions
   ========================================================================= */

export async function createCatalogItemAction(form: FormData): Promise<void> {
  await requireAdmin();
  const kind = (String(form.get('kind') ?? 'service')) as CatalogKind;
  const slug = String(form.get('slug') ?? '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const titleAr = String(form.get('titleAr') ?? '').trim();
  const titleEn = String(form.get('titleEn') ?? '').trim();
  const descAr = String(form.get('descAr') ?? '').trim();
  const descEn = String(form.get('descEn') ?? '').trim();

  if (!slug || !titleAr || !titleEn) return;

  const tags = String(form.get('tags') ?? '')
    .split(/[,;\n]/)
    .map((t) => t.trim())
    .filter(Boolean);

  const features = String(form.get('features') ?? '')
    .split(/[\n]/)
    .map((f) => f.trim())
    .filter(Boolean);

  const publicRoute = `/${kind === 'service' ? 'services' : kind === 'solution' ? 'solutions' : kind === 'product' ? 'products' : 'industries'}/${slug}`;

  await getContentStore().createCatalog({
    kind,
    slug,
    title: { ar: titleAr, en: titleEn },
    description: { ar: descAr, en: descEn },
    categoryBadge: { ar: String(form.get('badgeAr') ?? 'معتمد'), en: String(form.get('badgeEn') ?? 'Verified') },
    tags,
    features,
    publicRoute,
    status: (form.get('status') as 'active' | 'archived') || 'active',
  });

  revalidatePath('/admin/services');
}

export async function updateCatalogItemAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  if (!id) return;

  const titleAr = String(form.get('titleAr') ?? '').trim();
  const titleEn = String(form.get('titleEn') ?? '').trim();
  const descAr = String(form.get('descAr') ?? '').trim();
  const descEn = String(form.get('descEn') ?? '').trim();
  const status = (String(form.get('status') ?? 'active')) as 'active' | 'archived';

  const tags = String(form.get('tags') ?? '')
    .split(/[,;\n]/)
    .map((t) => t.trim())
    .filter(Boolean);

  const features = String(form.get('features') ?? '')
    .split(/[\n]/)
    .map((f) => f.trim())
    .filter(Boolean);

  await getContentStore().updateCatalog(id, {
    title: { ar: titleAr, en: titleEn },
    description: { ar: descAr, en: descEn },
    categoryBadge: { ar: String(form.get('badgeAr') ?? 'معتمد'), en: String(form.get('badgeEn') ?? 'Verified') },
    tags,
    features,
    status,
  });

  revalidatePath('/admin/services');
}

export async function deleteCatalogItemAction(form: FormData): Promise<void> {
  await requireAdmin();
  if (form.get('confirm') !== 'yes') return;
  const id = String(form.get('id') ?? '');
  if (!id) return;

  await getContentStore().deleteCatalog(id);
  revalidatePath('/admin/services');
}

/* =========================================================================
   FAQ CRUD Actions
   ========================================================================= */

export async function createFaqAction(form: FormData): Promise<void> {
  await requireAdmin();
  const topic = (String(form.get('topic') ?? 'engagement')) as FaqTopic;
  const qAr = String(form.get('questionAr') ?? '').trim();
  const qEn = String(form.get('questionEn') ?? '').trim();
  const aAr = String(form.get('answerAr') ?? '').trim();
  const aEn = String(form.get('answerEn') ?? '').trim();
  const order = Number(form.get('order') ?? 1);

  if (!qAr || !qEn || !aAr || !aEn) return;

  await getContentStore().createFaq({
    topic,
    question: { ar: qAr, en: qEn },
    answer: { ar: aAr, en: aEn },
    order: Number.isNaN(order) ? 1 : order,
    status: (form.get('status') as 'published' | 'draft') || 'published',
  });

  revalidatePath('/admin/faq');
}

export async function updateFaqAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  if (!id) return;

  const topic = (String(form.get('topic') ?? 'engagement')) as FaqTopic;
  const qAr = String(form.get('questionAr') ?? '').trim();
  const qEn = String(form.get('questionEn') ?? '').trim();
  const aAr = String(form.get('answerAr') ?? '').trim();
  const aEn = String(form.get('answerEn') ?? '').trim();
  const order = Number(form.get('order') ?? 1);
  const status = (form.get('status') as 'published' | 'draft') || 'published';

  await getContentStore().updateFaq(id, {
    topic,
    question: { ar: qAr, en: qEn },
    answer: { ar: aAr, en: aEn },
    order: Number.isNaN(order) ? 1 : order,
    status,
  });

  revalidatePath('/admin/faq');
}

export async function deleteFaqAction(form: FormData): Promise<void> {
  await requireAdmin();
  if (form.get('confirm') !== 'yes') return;
  const id = String(form.get('id') ?? '');
  if (!id) return;

  await getContentStore().deleteFaq(id);
  revalidatePath('/admin/faq');
}

/* =========================================================================
   Insights CRUD Actions
   ========================================================================= */

export async function createInsightAction(form: FormData): Promise<void> {
  await requireAdmin();
  const slug = String(form.get('slug') ?? '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const titleAr = String(form.get('titleAr') ?? '').trim();
  const titleEn = String(form.get('titleEn') ?? '').trim();
  const excerptAr = String(form.get('excerptAr') ?? '').trim();
  const excerptEn = String(form.get('excerptEn') ?? '').trim();
  const categoryAr = String(form.get('categoryAr') ?? 'هندسة البرمجيات').trim();
  const categoryEn = String(form.get('categoryEn') ?? 'Software Engineering').trim();
  const readTimeAr = String(form.get('readTimeAr') ?? '5 دقائق').trim();
  const readTimeEn = String(form.get('readTimeEn') ?? '5 min read').trim();

  if (!slug || !titleAr || !titleEn) return;

  await getContentStore().createInsight({
    slug,
    title: { ar: titleAr, en: titleEn },
    excerpt: { ar: excerptAr, en: excerptEn },
    category: { ar: categoryAr, en: categoryEn },
    readTime: { ar: readTimeAr, en: readTimeEn },
    date: new Date().toISOString().slice(0, 10),
    authorName: { ar: 'فريق هندسة نوڤيكسا', en: 'Novixa Engineering' },
    authorRole: { ar: 'استشارات برمجية', en: 'Software Practice' },
    status: (form.get('status') as 'published' | 'draft') || 'published',
  });

  revalidatePath('/admin/insights');
}

export async function updateInsightAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  if (!id) return;

  const titleAr = String(form.get('titleAr') ?? '').trim();
  const titleEn = String(form.get('titleEn') ?? '').trim();
  const excerptAr = String(form.get('excerptAr') ?? '').trim();
  const excerptEn = String(form.get('excerptEn') ?? '').trim();
  const status = (form.get('status') as 'published' | 'draft') || 'published';

  await getContentStore().updateInsight(id, {
    title: { ar: titleAr, en: titleEn },
    excerpt: { ar: excerptAr, en: excerptEn },
    status,
  });

  revalidatePath('/admin/insights');
}

export async function deleteInsightAction(form: FormData): Promise<void> {
  await requireAdmin();
  if (form.get('confirm') !== 'yes') return;
  const id = String(form.get('id') ?? '');
  if (!id) return;

  await getContentStore().deleteInsight(id);
  revalidatePath('/admin/insights');
}

/* =========================================================================
   Case Studies CRUD Actions
   ========================================================================= */

export async function createCaseStudyAction(form: FormData): Promise<void> {
  await requireAdmin();
  const slug = String(form.get('slug') ?? '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const client = String(form.get('client') ?? '').trim();
  const titleAr = String(form.get('titleAr') ?? '').trim();
  const titleEn = String(form.get('titleEn') ?? '').trim();
  const challengeAr = String(form.get('challengeAr') ?? '').trim();
  const challengeEn = String(form.get('challengeEn') ?? '').trim();
  const solutionAr = String(form.get('solutionAr') ?? '').trim();
  const solutionEn = String(form.get('solutionEn') ?? '').trim();
  const statusLabelAr = String(form.get('statusLabelAr') ?? 'نموذج أولي هندسي').trim();
  const statusLabelEn = String(form.get('statusLabelEn') ?? 'Engineering Prototype').trim();

  if (!slug || !client || !titleAr || !titleEn) return;

  const technologies = String(form.get('technologies') ?? '')
    .split(/[,;\n]/)
    .map((t) => t.trim())
    .filter(Boolean);

  await getContentStore().createCaseStudy({
    slug,
    client,
    title: { ar: titleAr, en: titleEn },
    industry: { ar: String(form.get('industryAr') ?? 'تقنية'), en: String(form.get('industryEn') ?? 'Technology') },
    location: { ar: 'الشرق الأوسط', en: 'Middle East' },
    caseStudyTypeLabel: { ar: statusLabelAr, en: statusLabelEn },
    challenge: { ar: challengeAr, en: challengeEn },
    solution: { ar: solutionAr, en: solutionEn },
    technologies,
    statusLabel: { ar: statusLabelAr, en: statusLabelEn },
    status: (form.get('status') as 'published' | 'draft' | 'archived') || 'published',
  });

  revalidatePath('/admin/work');
}

export async function updateCaseStudyAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  if (!id) return;

  const titleAr = String(form.get('titleAr') ?? '').trim();
  const titleEn = String(form.get('titleEn') ?? '').trim();
  const challengeAr = String(form.get('challengeAr') ?? '').trim();
  const challengeEn = String(form.get('challengeEn') ?? '').trim();
  const solutionAr = String(form.get('solutionAr') ?? '').trim();
  const solutionEn = String(form.get('solutionEn') ?? '').trim();
  const status = (form.get('status') as 'published' | 'draft' | 'archived') || 'published';

  await getContentStore().updateCaseStudy(id, {
    title: { ar: titleAr, en: titleEn },
    challenge: { ar: challengeAr, en: challengeEn },
    solution: { ar: solutionAr, en: solutionEn },
    status,
  });

  revalidatePath('/admin/work');
}

export async function deleteCaseStudyAction(form: FormData): Promise<void> {
  await requireAdmin();
  if (form.get('confirm') !== 'yes') return;
  const id = String(form.get('id') ?? '');
  if (!id) return;

  await getContentStore().deleteCaseStudy(id);
  revalidatePath('/admin/work');
}

/* =========================================================================
   Partners & Commissions CRUD Actions
   ========================================================================= */

export async function createPartnerAction(form: FormData): Promise<void> {
  await requireAdmin();
  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  const company = String(form.get('company') ?? '').trim() || undefined;
  const referralCode = String(form.get('referralCode') ?? '').trim().toUpperCase();
  const rate = Number(form.get('rate') ?? 30);
  const agreementNotes = String(form.get('notes') ?? '').trim() || undefined;

  if (!name || !email || !referralCode) return;

  await getContentStore().createPartner({
    name,
    email,
    company,
    referralCode,
    defaultCommissionRate: Number.isNaN(rate) || rate <= 0 ? 30 : rate,
    status: 'active',
    agreementNotes,
  });

  revalidatePath('/admin/affiliates');
}

export async function updatePartnerAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  if (!id) return;

  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  const rate = Number(form.get('rate') ?? 30);
  const status = (form.get('status') as PartnerStatus) || 'active';
  const agreementNotes = String(form.get('notes') ?? '').trim() || undefined;

  await getContentStore().updatePartner(id, {
    name,
    email,
    defaultCommissionRate: Number.isNaN(rate) || rate <= 0 ? 30 : rate,
    status,
    agreementNotes,
  });

  revalidatePath('/admin/affiliates');
}

export async function deletePartnerAction(form: FormData): Promise<void> {
  await requireAdmin();
  if (form.get('confirm') !== 'yes') return;
  const id = String(form.get('id') ?? '');
  if (!id) return;

  await getContentStore().deletePartner(id);
  revalidatePath('/admin/affiliates');
}

export async function recordCommissionAction(form: FormData): Promise<void> {
  await requireAdmin();
  const partnerId = String(form.get('partnerId') ?? '').trim();
  const partner = await getContentStore().getPartner(partnerId);
  if (!partner) return;

  const leadId = String(form.get('leadId') ?? '').trim() || undefined;
  const saleAmountUsd = Number(form.get('saleAmountUsd') ?? 0);
  const commissionRate = Number(form.get('commissionRate') ?? partner.defaultCommissionRate);
  if (saleAmountUsd <= 0 || commissionRate <= 0) return;

  const commissionAmountUsd = Math.round((saleAmountUsd * (commissionRate / 100)) * 100) / 100;

  await getContentStore().recordCommission({
    partnerId,
    partnerName: partner.name,
    leadId,
    saleAmountUsd,
    commissionRate,
    commissionAmountUsd,
    status: 'approved',
    notes: String(form.get('notes') ?? '').trim() || undefined,
  });

  revalidatePath('/admin/affiliates');
}

export async function updateCommissionStatusAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  const status = String(form.get('status') ?? '') as CommissionStatus;
  const notes = String(form.get('notes') ?? '').trim() || undefined;
  if (!id || !status) return;

  await getContentStore().updateCommissionStatus(id, status, notes);
  revalidatePath('/admin/affiliates');
}

/* =========================================================================
   Campaigns & Applications CRUD Actions
   ========================================================================= */

export async function createCampaignAction(form: FormData): Promise<void> {
  await requireAdmin();
  const slug = String(form.get('slug') ?? '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const titleAr = String(form.get('titleAr') ?? '').trim();
  const titleEn = String(form.get('titleEn') ?? '').trim();
  const descAr = String(form.get('descAr') ?? '').trim();
  const descEn = String(form.get('descEn') ?? '').trim();
  const eligAr = String(form.get('eligAr') ?? '').trim();
  const eligEn = String(form.get('eligEn') ?? '').trim();
  const quota = Number(form.get('quota') ?? 10);

  if (!slug || !titleAr || !titleEn) return;

  await getContentStore().createCampaign({
    slug,
    title: { ar: titleAr, en: titleEn },
    description: { ar: descAr, en: descEn },
    eligibility: { ar: eligAr, en: eligEn },
    quotaLimit: Number.isNaN(quota) ? 10 : quota,
    status: (form.get('status') as CampaignStatus) || 'active',
    startDate: new Date().toISOString().slice(0, 10),
  });

  revalidatePath('/admin/campaigns');
}

export async function updateCampaignAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  if (!id) return;

  const titleAr = String(form.get('titleAr') ?? '').trim();
  const titleEn = String(form.get('titleEn') ?? '').trim();
  const descAr = String(form.get('descAr') ?? '').trim();
  const descEn = String(form.get('descEn') ?? '').trim();
  const status = (form.get('status') as CampaignStatus) || 'active';

  await getContentStore().updateCampaign(id, {
    title: { ar: titleAr, en: titleEn },
    description: { ar: descAr, en: descEn },
    status,
  });

  revalidatePath('/admin/campaigns');
}

export async function deleteCampaignAction(form: FormData): Promise<void> {
  await requireAdmin();
  if (form.get('confirm') !== 'yes') return;
  const id = String(form.get('id') ?? '');
  if (!id) return;

  await getContentStore().deleteCampaign(id);
  revalidatePath('/admin/campaigns');
}

export async function updateApplicationStatusAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  const status = String(form.get('status') ?? 'new') as ApplicationStatus;
  const notes = String(form.get('notes') ?? '').trim() || undefined;
  if (!id) return;

  await getContentStore().updateApplicationStatus(id, status, notes);
  revalidatePath('/admin/campaigns');
}

