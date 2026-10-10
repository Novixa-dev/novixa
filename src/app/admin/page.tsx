import Link from 'next/link';
import {
  Mail,
  Database,
  GitCommit,
  Clock,
  Inbox,
  CalendarDays,
  TrendingUp,
  Trophy,
  Calendar,
} from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { getLeadStore, LEAD_PRIORITIES, LEAD_SOURCES, LEAD_STATUSES } from '@/lib/leads';
import { getMailer } from '@/lib/mail';
import { AdminShell } from '@/components/admin/AdminShell';
import { BarList, DailyChart, KpiTile } from '@/components/admin/charts';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { PriorityBadge } from '@/components/admin/PriorityBadge';
import {
  formatDateTime,
  getAdminLang,
  PRIORITY_LABELS,
  SOURCE_LABELS,
  STATUS_LABELS,
  translator,
} from './i18n';

export default async function AdminOverviewPage() {
  const session = await requireAdmin();
  const lang = await getAdminLang();
  const t = translator(lang);
  const store = getLeadStore();
  const [stats, recent, health] = store
    ? await Promise.all([store.stats(), store.list({ limit: 6, offset: 0 }), store.health()])
    : [null, null, { ok: false, detail: t('غير مضبوطة', 'not configured') }];
  const mailer = getMailer();
  const build = process.env.NEXT_PUBLIC_BUILD_SHA || process.env.BUILD_SHA || '';

  return (
    <AdminShell lang={lang} email={session.email} active="overview">
      <h1 className="mb-6 font-display text-2xl font-bold text-white leading-snug">{t('نظرة عامة', 'Overview')}</h1>

      {stats && recent ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <KpiTile
              Icon={Inbox}
              accent={stats.awaitingFirstResponse > 0 ? 'rose' : 'blue'}
              label={t('بانتظار أول رد', 'Awaiting first reply')}
              value={stats.awaitingFirstResponse}
              hint={t('يجب أن يكون صفراً', 'Should be zero')}
            />
            <KpiTile
              Icon={Calendar}
              accent={stats.followUpDue > 0 ? 'amber' : 'teal'}
              label={t('مستحق المتابعة', 'Follow-up due')}
              value={stats.followUpDue}
              hint={t('مواعيد حانت', 'Due today or overdue')}
            />
            <KpiTile Icon={CalendarDays} accent="blue" label={t('آخر ٧ أيام', 'Last 7 days')} value={stats.last7Days} />
            <KpiTile Icon={TrendingUp} accent="teal" label={t('آخر ٣٠ يوماً', 'Last 30 days')} value={stats.last30Days} />
            <KpiTile
              Icon={Trophy}
              accent="teal"
              label={t('تم التعاقد', 'Won')}
              value={stats.byStatus.won}
              hint={t(`من ${stats.total} إجمالاً`, `of ${stats.total} total`)}
            />
          </div>

          <DailyChart
            title={t('الطلبات اليومية — آخر ٣٠ يوماً', 'Daily enquiries — last 30 days')}
            series={stats.daily}
            rtl={lang === 'ar'}
            unitLabel={t('طلبات', 'enquiries')}
            dayLabel={t('اليوم', 'Day')}
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <BarList
              title={t('حسب المرحلة', 'By stage')}
              items={LEAD_STATUSES.map((status) => ({
                key: status,
                label: STATUS_LABELS[status][lang],
                value: stats.byStatus[status],
              }))}
            />
            <BarList
              title={t('حسب الأولوية', 'By priority')}
              items={LEAD_PRIORITIES.map((priority) => ({
                key: priority,
                label: PRIORITY_LABELS[priority][lang],
                value: stats.byPriority[priority],
              }))}
            />
            <BarList
              title={t('حسب المصدر', 'By source')}
              items={LEAD_SOURCES.map((source) => ({
                key: source,
                label: SOURCE_LABELS[source][lang],
                value: stats.bySource[source],
              }))}
            />
          </div>

          <section className="glass-card rounded-2xl border border-white/[0.08] p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-sm font-bold text-white leading-snug">
                {t('أحدث الطلبات', 'Latest enquiries')}
              </h2>
              <Link href="/admin/leads" className="text-xs text-blue-300 hover:text-blue-200">
                {t('كل الطلبات', 'All leads')}
              </Link>
            </div>
            {recent.rows.length === 0 ? (
              <p className="text-sm text-slate-400">{t('لا توجد طلبات بعد.', 'No enquiries yet.')}</p>
            ) : (
              <ul className="divide-y divide-white/[0.05]">
                {recent.rows.map((lead) => (
                  <li key={lead.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="min-w-0 text-sm text-white hover:text-blue-200">
                      <span className="font-medium">{lead.name}</span>
                      {lead.company && <span className="text-slate-400"> · {lead.company}</span>}
                    </Link>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-slate-400">{formatDateTime(lead.createdAt, lang)}</span>
                      <PriorityBadge priority={lead.priority} lang={lang} />
                      <StatusBadge status={lead.status} lang={lang} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      ) : (
        <p className="text-sm text-slate-400">
          {t('لا توجد بيانات لعرضها بدون قاعدة بيانات.', 'There is nothing to show without a database.')}
        </p>
      )}

      <section className="mt-6 glass-card rounded-2xl border border-white/[0.08] p-5">
        <h2 className="mb-4 font-display text-sm font-bold text-white leading-snug">
          {t('حالة النظام', 'System status')}
        </h2>
        <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-2">
            <Database className="mt-0.5 h-4 w-4 text-slate-400" aria-hidden="true" />
            <div>
              <dt className="text-xs text-slate-400">{t('قاعدة البيانات', 'Database')}</dt>
              <dd className={health.ok ? 'text-emerald-300' : 'text-rose-300'}>
                {health.ok ? t('متصلة', 'Connected') : t('غير متاحة', 'Unavailable')}{' '}
                <span className="text-xs text-slate-400">({health.detail})</span>
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Mail className="mt-0.5 h-4 w-4 text-slate-400" aria-hidden="true" />
            <div>
              <dt className="text-xs text-slate-400">{t('البريد', 'Email')}</dt>
              <dd className={mailer ? 'text-emerald-300' : 'text-amber-300'}>
                {mailer ? (
                  <>
                    {t('مضبوط', 'Configured')}{' '}
                    <span className="text-xs text-slate-400" translate="no">
                      ({mailer.kind === 'smtp' ? 'SMTP' : 'Resend'} · {mailer.from})
                    </span>
                  </>
                ) : (
                  t('غير مضبوط — الطلبات تُحفظ ولا تُرسل', 'Not configured — leads are stored, not emailed')
                )}
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 text-slate-400" aria-hidden="true" />
            <div>
              <dt className="text-xs text-slate-400">{t('آخر طلب', 'Latest enquiry')}</dt>
              <dd className="text-slate-200">{stats?.latestAt ? formatDateTime(stats.latestAt, lang) : '—'}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <GitCommit className="mt-0.5 h-4 w-4 text-slate-400" aria-hidden="true" />
            <div>
              <dt className="text-xs text-slate-400">{t('الإصدار', 'Build')}</dt>
              <dd className="font-mono text-xs text-slate-200" translate="no">
                {build ? build.slice(0, 7) : '—'}
              </dd>
            </div>
          </div>
        </dl>
      </section>
    </AdminShell>
  );
}
