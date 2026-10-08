import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Mail, Phone, Trash2 } from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { getLeadStore, LEAD_STATUSES } from '@/lib/leads';
import { AdminShell } from '@/components/admin/AdminShell';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { deleteLead, updateLeadNotes, updateLeadStatus } from '../../actions';
import { formatDateTime, getAdminLang, SOURCE_LABELS, STATUS_LABELS, translator } from '../../i18n';

export default async function AdminLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  const lang = await getAdminLang();
  const t = translator(lang);
  const { id } = await params;
  const store = getLeadStore();
  const lead = store ? await store.get(id) : null;
  if (!lead) notFound();

  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const whatsapp = lead.phone ? lead.phone.replace(/[^\d]/g, '') : '';

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
      <Link href="/admin/leads" className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white">
        <BackIcon className="h-4 w-4" aria-hidden="true" />
        {t('كل الطلبات', 'All leads')}
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold text-white leading-snug">{lead.name}</h1>
          <p className="text-sm text-slate-400">
            {SOURCE_LABELS[lead.source][lang]} · {formatDateTime(lead.createdAt, lang)} ·{' '}
            <span className="font-mono" translate="no">{lead.receiptId}</span>
          </p>
        </div>
        <StatusBadge status={lead.status} lang={lang} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="glass-card rounded-2xl border border-white/[0.08] p-5 lg:col-span-2">
          <h2 className="mb-4 font-display text-sm font-bold text-white leading-snug">{t('تفاصيل الطلب', 'Enquiry')}</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs text-slate-400">{t('البريد', 'Email')}</dt>
              <dd dir="ltr" className="text-white">{lead.email}</dd>
            </div>
            {fields
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-slate-400">{label}</dt>
                  <dd className="whitespace-pre-wrap text-slate-200">{value}</dd>
                </div>
              ))}
            <div>
              <dt className="text-xs text-slate-400">{t('لغة الطلب', 'Language')}</dt>
              <dd className="text-slate-200">{lead.locale === 'ar' ? 'العربية' : 'English'}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">{t('إشعار البريد إلى نوڤيكسا', 'Notification email to Novixa')}</dt>
              <dd className="text-slate-200">{lead.emailDelivered ? t('أُرسل', 'Sent') : t('لم يُرسل — راجع إعدادات البريد', 'Not sent — check the email settings')}</dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            <a href={`mailto:${lead.email}?subject=${encodeURIComponent(`Novixa — ${lead.receiptId}`)}`} className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-500">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {t('رد بالبريد', 'Reply by email')}
            </a>
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] px-3.5 py-2 text-xs text-slate-200 hover:bg-white/[0.04]">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {t('واتساب', 'WhatsApp')}
              </a>
            )}
          </div>
        </section>

        <div className="space-y-4">
          <section className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <h2 className="mb-3 font-display text-sm font-bold text-white leading-snug">{t('المرحلة', 'Stage')}</h2>
            {/* Keyed on the saved state: React 19 resets a form after its action to each
                field's *initial* default, and a select never adopts a new defaultValue
                after mount — so without a remount the saved stage would snap back. */}
            <form key={`status-${lead.status}`} action={updateLeadStatus} className="flex gap-2">
              <input type="hidden" name="id" value={lead.id} />
              <label htmlFor="lead-status" className="sr-only">{t('المرحلة', 'Stage')}</label>
              <select id="lead-status" name="status" defaultValue={lead.status} className="flex-1 rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-sm text-white">
                {LEAD_STATUSES.map((value) => (
                  <option key={value} value={value}>{STATUS_LABELS[value][lang]}</option>
                ))}
              </select>
              <button type="submit" className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500">{t('حفظ', 'Save')}</button>
            </form>
          </section>

          <section className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <h2 className="mb-3 font-display text-sm font-bold text-white leading-snug">{t('ملاحظات داخلية', 'Internal notes')}</h2>
            <form action={updateLeadNotes} className="space-y-2">
              <input type="hidden" name="id" value={lead.id} />
              <label htmlFor="lead-notes" className="sr-only">{t('ملاحظات داخلية', 'Internal notes')}</label>
              <textarea id="lead-notes" name="notes" defaultValue={lead.notes} rows={6} maxLength={10000} className="w-full rounded-lg border border-white/[0.1] bg-slate-900 px-3 py-2 text-sm text-white" />
              <button type="submit" className="rounded-lg border border-white/[0.1] px-3 py-2 text-sm text-slate-200 hover:bg-white/[0.04]">{t('حفظ الملاحظات', 'Save notes')}</button>
            </form>
          </section>

          <section className="rounded-2xl border border-rose-500/25 bg-rose-950/20 p-5">
            <h2 className="mb-2 font-display text-sm font-bold text-rose-100 leading-snug">{t('حذف نهائي', 'Delete permanently')}</h2>
            <p className="mb-3 text-xs text-rose-100/80">
              {t('لتنفيذ طلب حذف من صاحب البيانات، كما تعد سياسة الخصوصية. لا يمكن التراجع.', 'To honour a deletion request, as the privacy policy promises. Cannot be undone.')}
            </p>
            <form action={deleteLead} className="space-y-2">
              <input type="hidden" name="id" value={lead.id} />
              <label className="flex items-center gap-2 text-xs text-rose-100">
                <input type="checkbox" name="confirm" value="yes" required />
                {t('أؤكد الحذف النهائي لهذا الطلب', 'I confirm permanent deletion of this lead')}
              </label>
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-500">
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                {t('حذف', 'Delete')}
              </button>
            </form>
          </section>

          <p className="text-xs text-slate-400">{t('آخر تحديث:', 'Last updated:')} {formatDateTime(lead.updatedAt, lang)}</p>
        </div>
      </div>
    </AdminShell>
  );
}
