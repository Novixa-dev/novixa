import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Phone,
  Trash2,
  Calendar,
  Tag,
  User,
  Clock,
  Flag,
  Compass,
  MessageSquare,
  Activity,
  Plus,
} from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { getLeadStore, LEAD_PRIORITIES, LEAD_STATUSES } from '@/lib/leads';
import { AdminShell } from '@/components/admin/AdminShell';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { PriorityBadge } from '@/components/admin/PriorityBadge';
import { QuickReplyModal } from '@/components/admin/QuickReplyModal';
import {
  addLeadActivity,
  deleteLead,
  updateLeadAssignee,
  updateLeadFollowUp,
  updateLeadNotes,
  updateLeadPriority,
  updateLeadStatus,
  updateLeadTags,
} from '../../actions';
import {
  formatDate,
  formatDateTime,
  getAdminLang,
  PRIORITY_LABELS,
  SOURCE_LABELS,
  STATUS_LABELS,
  translator,
} from '../../i18n';

export default async function AdminLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  const lang = await getAdminLang();
  const t = translator(lang);
  const { id } = await params;
  const store = getLeadStore();
  const lead = store ? await store.get(id) : null;
  if (!lead) notFound();

  const activities = store ? await store.getActivities(id) : [];
  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const whatsapp = lead.phone ? lead.phone.replace(/[^\d]/g, '') : '';

  const followUpIso = lead.followUpDate ? lead.followUpDate.toISOString().slice(0, 10) : '';
  const isFollowUpDue =
    lead.followUpDate &&
    !['won', 'lost', 'spam'].includes(lead.status) &&
    lead.followUpDate.getTime() <= Date.now() + 86_400_000;

  const fields: Array<[string, string | undefined]> = [
    [t('الشركة', 'Company'), lead.company],
    [t('الهاتف / واتساب', 'Phone / WhatsApp'), lead.phone],
    [t('نوع المشروع', 'Project type'), lead.projectType],
    [t('الخدمة المطلوبة', 'Service needed'), lead.serviceNeeded],
    [t('القطاع', 'Industry'), lead.industry],
    [t('المشكلة التشغيلية', 'Operational problem'), lead.problem],
    [t('الوضع الحالي', 'Existing setup'), lead.existingSystem],
    [t('الميزانية', 'Budget'), lead.budgetRange],
    [t('الإطار الزمني', 'Timeline'), lead.timeline],
    [t('تفاصيل إضافية', 'Details'), lead.details],
  ];

  return (
    <AdminShell lang={lang} email={session.email} active="leads">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/leads" className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white">
          <BackIcon className="h-4 w-4" aria-hidden="true" />
          {t('كل الطلبات', 'All leads')}
        </Link>
        <div className="flex items-center gap-2">
          <QuickReplyModal lead={lead} lang={lang} />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] pb-5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-display text-2xl font-bold text-white leading-snug">{lead.name}</h1>
            <PriorityBadge priority={lead.priority} lang={lang} />
          </div>
          <p className="text-sm text-slate-400">
            {SOURCE_LABELS[lead.source][lang]} · {formatDateTime(lead.createdAt, lang)} ·{' '}
            <span className="font-mono text-slate-300" translate="no">
              {lead.receiptId}
            </span>
            {lead.assignee && (
              <span className="ms-2 text-xs text-blue-300 font-medium">
                • {t('المسؤول:', 'Assignee:')} {lead.assignee}
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <StatusBadge status={lead.status} lang={lang} />
          {lead.followUpDate && (
            <span
              className={`inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-md ${
                isFollowUpDue
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-900 text-slate-400 border border-white/[0.06]'
              }`}
            >
              <Calendar className="h-3 w-3" />
              {t('متابعة:', 'Follow-up:')} {formatDate(lead.followUpDate, lang)}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Enquiry details card */}
          <section className="glass-card rounded-2xl border border-white/[0.08] p-5 sm:p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-white leading-snug flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-400" />
              {t('تفاصيل الطلب والمتطلبات', 'Enquiry & Scope')}
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs text-slate-400 mb-0.5">{t('البريد الإلكتروني', 'Email address')}</dt>
                <dd dir="ltr" className="text-white font-medium select-all">
                  {lead.email}
                </dd>
              </div>
              {fields
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className={label === t('تفاصيل إضافية', 'Details') ? 'sm:col-span-2' : ''}>
                    <dt className="text-xs text-slate-400 mb-0.5">{label}</dt>
                    <dd className="whitespace-pre-wrap text-slate-200">{value}</dd>
                  </div>
                ))}
              <div>
                <dt className="text-xs text-slate-400 mb-0.5">{t('لغة الطلب الأصلية', 'Original form language')}</dt>
                <dd className="text-slate-200">{lead.locale === 'ar' ? 'العربية' : 'English'}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400 mb-0.5">{t('إشعار البريد إلى نوڤيكسا', 'Internal email notification')}</dt>
                <dd className="text-slate-200">
                  {lead.emailDelivered
                    ? t('أُرسل بنجاح', 'Sent successfully')
                    : t('لم يُرسل — راجع إعدادات البريد', 'Not sent — check mail settings')}
                </dd>
              </div>
            </dl>

            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${lead.email}?subject=${encodeURIComponent(`Novixa — ${lead.receiptId}`)}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-500 shadow-sm"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {t('رد بالبريد', 'Reply by email')}
              </a>
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] px-3.5 py-2 text-xs text-slate-200 hover:bg-white/[0.04]"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('واتساب', 'WhatsApp')}
                </a>
              )}
            </div>
          </section>

          {/* Source Attribution & Tags */}
          {(lead.utmSource || lead.referrer || (lead.tags && lead.tags.length > 0)) && (
            <section className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-4">
              <h2 className="font-display text-sm font-bold text-white leading-snug flex items-center gap-2">
                <Compass className="h-4 w-4 text-teal-400" />
                {t('مصدر الاستقطاب والتصنيفات', 'Source Attribution & Tags')}
              </h2>
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {lead.utmSource && (
                  <div>
                    <dt className="text-slate-400">UTM Source</dt>
                    <dd className="font-mono text-slate-200 font-medium" translate="no">
                      {lead.utmSource}
                    </dd>
                  </div>
                )}
                {lead.utmMedium && (
                  <div>
                    <dt className="text-slate-400">UTM Medium</dt>
                    <dd className="font-mono text-slate-200 font-medium" translate="no">
                      {lead.utmMedium}
                    </dd>
                  </div>
                )}
                {lead.utmCampaign && (
                  <div>
                    <dt className="text-slate-400">Campaign</dt>
                    <dd className="font-mono text-slate-200 font-medium" translate="no">
                      {lead.utmCampaign}
                    </dd>
                  </div>
                )}
                {lead.referrer && (
                  <div className="col-span-2 sm:col-span-4">
                    <dt className="text-slate-400">Referrer</dt>
                    <dd className="font-mono text-slate-300 break-all" translate="no">
                      {lead.referrer}
                    </dd>
                  </div>
                )}
              </dl>
              {lead.tags && lead.tags.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {lead.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-lg border border-teal-500/25 bg-teal-950/30 px-2.5 py-1 text-xs text-teal-200"
                    >
                      <Tag className="h-3 w-3 text-teal-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Activity Timeline */}
          <section className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-bold text-white leading-snug flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-400" />
                {t('سجل الأنشطة والمتابعة', 'Activity Timeline')}
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {activities.length} {t('نشاط', 'events')}
              </span>
            </div>

            {/* Add activity note form */}
            <form action={addLeadActivity} className="space-y-2 rounded-xl bg-slate-950/70 p-3 border border-white/[0.06]">
              <input type="hidden" name="id" value={lead.id} />
              <input type="hidden" name="action" value="note" />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="details"
                  placeholder={t('أضف تحديثاً أو ملخص اتصال...', 'Add call summary or note...')}
                  required
                  className="flex-1 rounded-lg border border-white/[0.1] bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shrink-0"
                >
                  <Plus className="h-3 w-3" />
                  {t('إضافة', 'Add')}
                </button>
              </div>
            </form>

            {activities.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">
                {t('لا توجد أنشطة مسجلة بعد.', 'No activity logged yet.')}
              </p>
            ) : (
              <ol className="relative border-s border-white/[0.08] ms-3.5 space-y-4 py-1">
                {activities.map((act) => (
                  <li key={act.id} className="ms-4">
                    <span className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-slate-900 bg-blue-500" />
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <div className="font-semibold text-white">
                        <span>{act.author}</span>
                        <span className="ms-1.5 text-[11px] font-mono font-normal text-blue-300 uppercase">
                          ({act.action.replace('_', ' ')})
                        </span>
                      </div>
                      <time className="text-[11px] text-slate-400 font-mono">
                        {formatDateTime(act.createdAt, lang)}
                      </time>
                    </div>
                    {act.details && (
                      <p className="mt-1 text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-2 rounded-lg border border-white/[0.04]">
                        {act.details}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-4">
          {/* Stage selection */}
          <section className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <h2 className="mb-3 font-display text-sm font-bold text-white leading-snug flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              {t('مرحلة الطلب (Pipeline Stage)', 'Pipeline Stage')}
            </h2>
            <form key={`status-${lead.status}`} action={updateLeadStatus} className="flex gap-2">
              <input type="hidden" name="id" value={lead.id} />
              <label htmlFor="lead-status" className="sr-only">
                {t('المرحلة', 'Stage')}
              </label>
              <select
                id="lead-status"
                name="status"
                defaultValue={lead.status}
                className="flex-1 rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {LEAD_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {STATUS_LABELS[value][lang]}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                {t('حفظ', 'Save')}
              </button>
            </form>
          </section>

          {/* Priority selection */}
          <section className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <h2 className="mb-3 font-display text-sm font-bold text-white leading-snug flex items-center gap-2">
              <Flag className="h-4 w-4 text-amber-400" />
              {t('درجة الأولوية', 'Priority Level')}
            </h2>
            <form key={`priority-${lead.priority}`} action={updateLeadPriority} className="flex gap-2">
              <input type="hidden" name="id" value={lead.id} />
              <label htmlFor="lead-priority" className="sr-only">
                {t('الأولوية', 'Priority')}
              </label>
              <select
                id="lead-priority"
                name="priority"
                defaultValue={lead.priority}
                className="flex-1 rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {LEAD_PRIORITIES.map((val) => (
                  <option key={val} value={val}>
                    {PRIORITY_LABELS[val][lang]}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                {t('حفظ', 'Save')}
              </button>
            </form>
          </section>

          {/* Follow-up date schedule */}
          <section className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <h2 className="mb-3 font-display text-sm font-bold text-white leading-snug flex items-center gap-2">
              <Calendar className="h-4 w-4 text-teal-400" />
              {t('موعد المتابعة القادم', 'Follow-up Due Date')}
            </h2>
            <form action={updateLeadFollowUp} className="space-y-2">
              <input type="hidden" name="id" value={lead.id} />
              <div className="flex gap-2">
                <input
                  type="date"
                  name="followUpDate"
                  defaultValue={followUpIso}
                  className="flex-1 rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="rounded-lg border border-white/[0.1] px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[0.05] transition-colors"
                >
                  {t('جدولة', 'Set')}
                </button>
              </div>
            </form>
          </section>

          {/* Assignee & Tags */}
          <section className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-4">
            <div>
              <h2 className="mb-2 font-display text-sm font-bold text-white leading-snug flex items-center gap-2">
                <User className="h-4 w-4 text-blue-400" />
                {t('المسؤول عن الطلب', 'Assignee')}
              </h2>
              <form action={updateLeadAssignee} className="flex gap-2">
                <input type="hidden" name="id" value={lead.id} />
                <input
                  type="text"
                  name="assignee"
                  defaultValue={lead.assignee || ''}
                  placeholder={t('اسم المهندس أو المشرف...', 'Lead engineer / operator...')}
                  className="flex-1 rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="rounded-lg border border-white/[0.1] px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[0.05]"
                >
                  {t('حفظ', 'Save')}
                </button>
              </form>
            </div>

            <div className="border-t border-white/[0.06] pt-3">
              <h2 className="mb-2 font-display text-sm font-bold text-white leading-snug flex items-center gap-2">
                <Tag className="h-4 w-4 text-teal-400" />
                {t('الوسوم والتصنيفات', 'Tags (comma-separated)')}
              </h2>
              <form action={updateLeadTags} className="space-y-2">
                <input type="hidden" name="id" value={lead.id} />
                <input
                  type="text"
                  name="tags"
                  defaultValue={lead.tags?.join(', ') || ''}
                  placeholder="POS, ERP, Cloud, Custom..."
                  className="w-full rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg border border-white/[0.1] px-3 py-1.5 text-xs text-slate-200 hover:bg-white/[0.05]"
                >
                  {t('تحديث الوسوم', 'Update tags')}
                </button>
              </form>
            </div>
          </section>

          {/* Internal notes */}
          <section className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <h2 className="mb-3 font-display text-sm font-bold text-white leading-snug">
              {t('ملاحظات داخلية دائمة', 'Internal Notes')}
            </h2>
            <form action={updateLeadNotes} className="space-y-2">
              <input type="hidden" name="id" value={lead.id} />
              <label htmlFor="lead-notes" className="sr-only">
                {t('ملاحظات داخلية', 'Internal notes')}
              </label>
              <textarea
                id="lead-notes"
                name="notes"
                defaultValue={lead.notes}
                rows={5}
                maxLength={10000}
                className="w-full rounded-lg border border-white/[0.1] bg-slate-900 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full rounded-lg border border-white/[0.1] px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[0.04]"
              >
                {t('حفظ الملاحظات', 'Save notes')}
              </button>
            </form>
          </section>

          {/* Permanent delete */}
          <section className="rounded-2xl border border-rose-500/25 bg-rose-950/20 p-5">
            <h2 className="mb-2 font-display text-sm font-bold text-rose-100 leading-snug">
              {t('حذف نهائي', 'Delete permanently')}
            </h2>
            <p className="mb-3 text-xs text-rose-100/80 leading-relaxed">
              {t(
                'لتنفيذ طلب حذف من صاحب البيانات، كما تعد سياسة الخصوصية. لا يمكن التراجع.',
                'To honour a deletion request, as the privacy policy promises. Cannot be undone.'
              )}
            </p>
            <form action={deleteLead} className="space-y-2">
              <input type="hidden" name="id" value={lead.id} />
              <label className="flex items-center gap-2 text-xs text-rose-100 cursor-pointer">
                <input type="checkbox" name="confirm" value="yes" required />
                {t('أؤكد الحذف النهائي لهذا الطلب', 'I confirm permanent deletion of this lead')}
              </label>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                {t('حذف', 'Delete')}
              </button>
            </form>
          </section>

          <p className="text-xs text-slate-400">
            {t('آخر تحديث:', 'Last updated:')} {formatDateTime(lead.updatedAt, lang)}
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
