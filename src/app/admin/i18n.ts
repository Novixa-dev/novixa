import 'server-only';
import { cookies } from 'next/headers';
import type { LeadSource, LeadStatus } from '@/lib/leads';

/**
 * The admin is bilingual like the site, Arabic first. The choice is a cookie
 * rather than a `[lang]` segment: the admin is a single private tool, not
 * content to be indexed in two languages, and keeping it out of `[lang]` keeps
 * it out of the public navbar, footer and sitemap entirely.
 */
export const ADMIN_LANG_COOKIE = 'nvx_admin_lang';
export type AdminLang = 'ar' | 'en';

export async function getAdminLang(): Promise<AdminLang> {
  const store = await cookies();
  return store.get(ADMIN_LANG_COOKIE)?.value === 'en' ? 'en' : 'ar';
}

export function translator(lang: AdminLang) {
  return (ar: string, en: string) => (lang === 'ar' ? ar : en);
}

export const STATUS_LABELS: Record<LeadStatus, { ar: string; en: string }> = {
  new: { ar: 'جديد — لم يُرد عليه', en: 'New — not yet answered' },
  contacted: { ar: 'تم التواصل', en: 'Contacted' },
  qualified: { ar: 'مؤهَّل', en: 'Qualified' },
  proposal: { ar: 'عرض مُرسَل', en: 'Proposal sent' },
  won: { ar: 'تم التعاقد', en: 'Won' },
  lost: { ar: 'لم يكتمل', en: 'Lost' },
  spam: { ar: 'غير جاد / مزعج', en: 'Spam' },
};

export const SOURCE_LABELS: Record<LeadSource, { ar: string; en: string }> = {
  contact: { ar: 'نموذج التواصل', en: 'Contact form' },
  'start-project': { ar: 'ابدأ مشروعك', en: 'Start a project' },
};

export function formatDateTime(date: Date, lang: AdminLang): string {
  // Latin digits in both languages, matching the public site.
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-u-nu-latn' : 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Aden',
  }).format(date);
}
