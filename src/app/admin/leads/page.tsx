import Link from 'next/link';
import { Download, Search, Calendar, Tag } from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import {
  getLeadStore,
  isLeadPriority,
  isLeadSource,
  isLeadStatus,
  LEAD_PRIORITIES,
  LEAD_SOURCES,
  LEAD_STATUSES,
} from '@/lib/leads';
import { AdminShell } from '@/components/admin/AdminShell';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { PriorityBadge } from '@/components/admin/PriorityBadge';
import {
  formatDate,
  formatDateTime,
  getAdminLang,
  PRIORITY_LABELS,
  SOURCE_LABELS,
  STATUS_LABELS,
  translator,
} from '../i18n';

const PAGE_SIZE = 25;

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    source?: string;
    priority?: string;
    q?: string;
    page?: string;
    deleted?: string;
  }>;
}) {
  const session = await requireAdmin();
  const lang = await getAdminLang();
  const t = translator(lang);
  const params = await searchParams;
  const status = isLeadStatus(params.status) ? params.status : undefined;
  const source = isLeadSource(params.source) ? params.source : undefined;
  const priority = isLeadPriority(params.priority) ? params.priority : undefined;
  const q = params.q?.slice(0, 200) ?? '';
  const page = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1);

  const store = getLeadStore();
  const result = store
    ? await store.list({
        status,
        source,
        priority,
        search: q,
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
      })
    : { rows: [], total: 0 };
  const pages = Math.max(1, Math.ceil(result.total / PAGE_SIZE));

  const query = (overrides: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    const merged = { status, source, priority, q: q || undefined, ...overrides };
    for (const [key, value] of Object.entries(merged)) if (value) next.set(key, value);
    const text = next.toString();
    return text ? `?${text}` : '';
  };

  const quickPills = [
    { label: t('الكل', 'All'), queryStr: '' },
    { label: t('بانتظار الرد', 'Awaiting reply'), queryStr: '?status=new' },
    { label: t('عاجل', 'Urgent'), queryStr: '?priority=urgent' },
    { label: t('أولوية عالية', 'High priority'), queryStr: '?priority=high' },
    { label: t('عروض مُرسلة', 'Proposals'), queryStr: '?status=proposal' },
    { label: t('تم التعاقد', 'Won'), queryStr: '?status=won' },
  ];

  return (
    <AdminShell lang={lang} email={session.email} active="leads">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white leading-snug">{t('الطلبات', 'Leads')}</h1>
          <p className="text-sm text-slate-400">{t(`${result.total} طلباً مطابقاً`, `${result.total} matching`)}</p>
        </div>
        <a
          href={`/admin/leads/export${query({})}`}
          className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-slate-900/70 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          {t('تصدير CSV', 'Export CSV')}
        </a>
      </div>

      {params.deleted && (
        <p
          role="status"
          className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-100"
        >
          {t('حُذف الطلب نهائياً.', 'The lead was permanently deleted.')}
        </p>
      )}

      {/* Quick filter tabs */}
      <div className="mb-4 flex items-center gap-1.5 overflow-x-auto pb-1">
        {quickPills.map((pill) => {
          const isActive = pill.queryStr
            ? pill.queryStr.includes(`status=${status}`) || pill.queryStr.includes(`priority=${priority}`)
            : !status && !priority && !source && !q;
          return (
            <Link
              key={pill.label}
              href={`/admin/leads${pill.queryStr}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-900/80 text-slate-300 border border-white/[0.06] hover:bg-slate-800'
              }`}
            >
              {pill.label}
            </Link>
          );
        })}
      </div>

      {/* Filters in one row above the table. Plain GET form: shareable, back-button safe, no JS. */}
      <form method="get" className="mb-5 flex flex-wrap items-end gap-2.5 bg-slate-900/40 p-3 rounded-xl border border-white/[0.06]">
        <div className="space-y-1">
          <label htmlFor="f-status" className="block text-xs text-slate-400">
            {t('المرحلة', 'Stage')}
          </label>
          <select
            id="f-status"
            name="status"
            defaultValue={status ?? ''}
            className="rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">{t('كل المراحل', 'All stages')}</option>
            {LEAD_STATUSES.map((value) => (
              <option key={value} value={value}>
                {STATUS_LABELS[value][lang]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="f-priority" className="block text-xs text-slate-400">
            {t('الأولوية', 'Priority')}
          </label>
          <select
            id="f-priority"
            name="priority"
            defaultValue={priority ?? ''}
            className="rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">{t('كل الأولويات', 'All priorities')}</option>
            {LEAD_PRIORITIES.map((val) => (
              <option key={val} value={val}>
                {PRIORITY_LABELS[val][lang]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="f-source" className="block text-xs text-slate-400">
            {t('المصدر', 'Source')}
          </label>
          <select
            id="f-source"
            name="source"
            defaultValue={source ?? ''}
            className="rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">{t('كل المصادر', 'All sources')}</option>
            {LEAD_SOURCES.map((value) => (
              <option key={value} value={value}>
                {SOURCE_LABELS[value][lang]}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[13rem] flex-1 space-y-1">
          <label htmlFor="f-q" className="block text-xs text-slate-400">
            {t('بحث بالاسم، البريد، الشركة، أو الوسم', 'Search contact, company, tags or reference')}
          </label>
          <input
            id="f-q"
            name="q"
            defaultValue={q}
            placeholder={t('اكتب للبحث...', 'Search...')}
            className="w-full rounded-lg border border-white/[0.1] bg-slate-900 px-2.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          {t('تصفية', 'Filter')}
        </button>
      </form>

      {/* Desktop: the table. */}
      <div className="glass-card hidden overflow-x-auto rounded-2xl border border-white/[0.08] md:block">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-xs text-slate-400">
              <th scope="col" className="px-4 py-3 text-start font-medium">
                {t('العميل', 'Contact')}
              </th>
              <th scope="col" className="px-4 py-3 text-start font-medium">
                {t('الأولوية', 'Priority')}
              </th>
              <th scope="col" className="px-4 py-3 text-start font-medium">
                {t('المرحلة', 'Stage')}
              </th>
              <th scope="col" className="px-4 py-3 text-start font-medium">
                {t('المصدر', 'Source')}
              </th>
              <th scope="col" className="px-4 py-3 text-start font-medium">
                {t('التاريخ / المتابعة', 'Date & Follow-up')}
              </th>
            </tr>
          </thead>
          <tbody>
            {result.rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                  {t('لا توجد طلبات مطابقة.', 'No matching leads.')}
                </td>
              </tr>
            ) : (
              result.rows.map((lead) => (
                <tr key={lead.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-medium text-white hover:text-blue-200 transition-colors"
                    >
                      {lead.name}
                    </Link>
                    <div className="text-xs text-slate-400 font-mono" dir="ltr">
                      {lead.email}
                    </div>
                    {lead.company && <div className="text-xs text-slate-300">{lead.company}</div>}
                    {lead.tags && lead.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {lead.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.2 text-[10px] text-teal-300 bg-teal-950/40 border border-teal-500/20"
                          >
                            <Tag className="h-2.5 w-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={lead.priority} lang={lang} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} lang={lang} />
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">
                    <div>{SOURCE_LABELS[lead.source][lang]}</div>
                    {lead.utmSource && (
                      <div className="font-mono text-[11px] text-slate-400" translate="no">
                        utm: {lead.utmSource}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">
                    <div>{formatDateTime(lead.createdAt, lang)}</div>
                    {lead.followUpDate && (
                      <div className="mt-0.5 flex items-center gap-1 font-mono text-[11px] text-amber-300">
                        <Calendar className="h-3 w-3" />
                        {formatDate(lead.followUpDate, lang)}
                      </div>
                    )}
                  </td>
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
            <li key={lead.id} className="glass-card rounded-2xl border border-white/[0.08] p-4 space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link href={`/admin/leads/${lead.id}`} className="block font-medium text-white hover:text-blue-200">
                    {lead.name}
                  </Link>
                  {lead.company && <div className="text-xs text-slate-300">{lead.company}</div>}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge status={lead.status} lang={lang} />
                  <PriorityBadge priority={lead.priority} lang={lang} />
                </div>
              </div>

              {lead.tags && lead.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {lead.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] text-teal-300 bg-teal-950/40 border border-teal-500/20"
                    >
                      <Tag className="h-2.5 w-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-1 flex flex-wrap items-center justify-between gap-y-1 text-xs text-slate-400 border-t border-white/[0.04]">
                <span dir="ltr" translate="no" className="font-mono">
                  {lead.email}
                </span>
                <span>{formatDateTime(lead.createdAt, lang)}</span>
              </div>
            </li>
          ))
        )}
      </ul>

      {pages > 1 && (
        <nav aria-label={t('الصفحات', 'Pages')} className="mt-5 flex items-center justify-between text-sm">
          {page > 1 ? (
            <Link
              href={`/admin/leads${query({ page: String(page - 1) })}`}
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              {t('السابق', 'Previous')}
            </Link>
          ) : (
            <span />
          )}
          <span className="text-slate-400 font-mono text-xs">
            {t(`صفحة ${page} من ${pages}`, `Page ${page} of ${pages}`)}
          </span>
          {page < pages ? (
            <Link
              href={`/admin/leads${query({ page: String(page + 1) })}`}
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              {t('التالي', 'Next')}
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </AdminShell>
  );
}
