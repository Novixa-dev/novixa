import Link from 'next/link';
import { Download, Search } from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { getLeadStore, isLeadSource, isLeadStatus, LEAD_SOURCES, LEAD_STATUSES } from '@/lib/leads';
import { AdminShell } from '@/components/admin/AdminShell';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatDateTime, getAdminLang, SOURCE_LABELS, STATUS_LABELS, translator } from '../i18n';

const PAGE_SIZE = 25;

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; source?: string; q?: string; page?: string; deleted?: string }>;
}) {
  const session = await requireAdmin();
  const lang = await getAdminLang();
  const t = translator(lang);
  const params = await searchParams;
  const status = isLeadStatus(params.status) ? params.status : undefined;
  const source = isLeadSource(params.source) ? params.source : undefined;
  const q = params.q?.slice(0, 200) ?? '';
  const page = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1);

  const store = getLeadStore();
  const result = store
    ? await store.list({ status, source, search: q, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE })
    : { rows: [], total: 0 };
  const pages = Math.max(1, Math.ceil(result.total / PAGE_SIZE));

  const query = (overrides: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    const merged = { status, source, q: q || undefined, ...overrides };
    for (const [key, value] of Object.entries(merged)) if (value) next.set(key, value);
    const text = next.toString();
    return text ? `?${text}` : '';
  };

  return (
    <AdminShell lang={lang} email={session.email} active="leads">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white leading-snug">{t('الطلبات', 'Leads')}</h1>
          <p className="text-sm text-slate-400">{t(`${result.total} طلباً مطابقاً`, `${result.total} matching`)}</p>
        </div>
        <a
          href={`/admin/leads/export${query({})}`}
          className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-slate-900/70 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          {t('تصدير CSV', 'Export CSV')}
        </a>
      </div>

      {params.deleted && (
        <p role="status" className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-100">
          {t('حُذف الطلب نهائياً.', 'The lead was permanently deleted.')}
        </p>
      )}

      {/* Filters in one row above the table. Plain GET form: shareable, back-button safe, no JS. */}
      <form method="get" className="mb-4 flex flex-wrap items-end gap-2">
        <div className="space-y-1">
          <label htmlFor="f-status" className="block text-xs text-slate-400">{t('المرحلة', 'Stage')}</label>
          <select id="f-status" name="status" defaultValue={status ?? ''} className="rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-sm text-white">
            <option value="">{t('الكل', 'All')}</option>
            {LEAD_STATUSES.map((value) => (
              <option key={value} value={value}>{STATUS_LABELS[value][lang]}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="f-source" className="block text-xs text-slate-400">{t('المصدر', 'Source')}</label>
          <select id="f-source" name="source" defaultValue={source ?? ''} className="rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-sm text-white">
            <option value="">{t('الكل', 'All')}</option>
            {LEAD_SOURCES.map((value) => (
              <option key={value} value={value}>{SOURCE_LABELS[value][lang]}</option>
            ))}
          </select>
        </div>
        <div className="min-w-[14rem] flex-1 space-y-1">
          <label htmlFor="f-q" className="block text-xs text-slate-400">{t('بحث بالاسم أو البريد أو الشركة أو رقم الطلب', 'Search name, email, company or reference')}</label>
          <input id="f-q" name="q" defaultValue={q} className="w-full rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-sm text-white" />
        </div>
        <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-blue-500">
          <Search className="h-4 w-4" aria-hidden="true" />
          {t('تصفية', 'Filter')}
        </button>
      </form>

      {/* Desktop: the table. Below md the same rows render as cards, because a
          six-column table scrolled sideways is how a phone presents "we do not
          actually support phones". Exactly one of the two is visible per
          breakpoint, so the lead-name links are never duplicated in the
          accessibility tree. */}
      <div className="glass-card hidden overflow-x-auto rounded-2xl border border-white/[0.08] md:block">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-xs text-slate-400">
              <th scope="col" className="px-4 py-3 text-start font-medium">{t('العميل', 'Contact')}</th>
              <th scope="col" className="px-4 py-3 text-start font-medium">{t('المصدر', 'Source')}</th>
              <th scope="col" className="px-4 py-3 text-start font-medium">{t('التاريخ', 'Received')}</th>
              <th scope="col" className="px-4 py-3 text-start font-medium">{t('المرحلة', 'Stage')}</th>
              <th scope="col" className="px-4 py-3 text-start font-medium">{t('البريد', 'Email sent')}</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-400">{t('لا توجد طلبات مطابقة.', 'No matching leads.')}</td>
              </tr>
            ) : (
              result.rows.map((lead) => (
                <tr key={lead.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="font-medium text-white hover:text-blue-200">{lead.name}</Link>
                    <div className="text-xs text-slate-400" dir="ltr">{lead.email}</div>
                    {lead.company && <div className="text-xs text-slate-400">{lead.company}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-300">{SOURCE_LABELS[lead.source][lang]}</td>
                  <td className="px-4 py-3 text-slate-300">{formatDateTime(lead.createdAt, lang)}</td>
                  <td className="px-4 py-3"><StatusBadge status={lead.status} lang={lang} /></td>
                  <td className="px-4 py-3 text-xs text-slate-300">{lead.emailDelivered ? t('نعم', 'Yes') : t('لا', 'No')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile: one card per lead. */}
      <ul className="space-y-3 md:hidden">
        {result.rows.length === 0 ? (
          <li className="glass-card rounded-2xl border border-white/[0.08] p-6 text-center text-sm text-slate-400">
            {t('لا توجد طلبات مطابقة.', 'No matching leads.')}
          </li>
        ) : (
          result.rows.map((lead) => (
            <li key={lead.id} className="glass-card rounded-2xl border border-white/[0.08] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link href={`/admin/leads/${lead.id}`} className="block font-medium text-white hover:text-blue-200">{lead.name}</Link>
                  {lead.company && <div className="text-xs text-slate-400">{lead.company}</div>}
                </div>
                <StatusBadge status={lead.status} lang={lang} />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                <span dir="ltr" translate="no">{lead.email}</span>
                <span>{SOURCE_LABELS[lead.source][lang]}</span>
                <span>{formatDateTime(lead.createdAt, lang)}</span>
              </div>
            </li>
          ))
        )}
      </ul>

      {pages > 1 && (
        <nav aria-label={t('الصفحات', 'Pages')} className="mt-4 flex items-center justify-between text-sm">
          {page > 1 ? (
            <Link href={`/admin/leads${query({ page: String(page - 1) })}`} className="text-blue-300 hover:text-blue-200">{t('السابق', 'Previous')}</Link>
          ) : <span />}
          <span className="text-slate-400">{t(`صفحة ${page} من ${pages}`, `Page ${page} of ${pages}`)}</span>
          {page < pages ? (
            <Link href={`/admin/leads${query({ page: String(page + 1) })}`} className="text-blue-300 hover:text-blue-200">{t('التالي', 'Next')}</Link>
          ) : <span />}
        </nav>
      )}
    </AdminShell>
  );
}
