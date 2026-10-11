import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Compass,
  Award,
  Filter,
  Layers,
  ArrowUpRight,
  PieChart,
} from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { AdminShell } from '@/components/admin/AdminShell';
import { getLeadStore } from '@/lib/leads';
import { getAdminLang, translator, STATUS_LABELS } from '../i18n';
import { KpiTile } from '@/components/admin/charts';

export default async function AdminAnalyticsPage() {
  const session = await requireAdmin();
  const lang = await getAdminLang();
  const t = translator(lang);
  const store = getLeadStore();

  const [stats, leadsResult] = store
    ? await Promise.all([store.stats(), store.list({ limit: 500, offset: 0 })])
    : [null, { rows: [], total: 0 }];

  const leads = leadsResult.rows;

  // Funnel calculation
  const total = stats?.total || 0;
  const newCount = stats?.byStatus.new || 0;
  const contactedCount = stats?.byStatus.contacted || 0;
  const qualifiedCount = stats?.byStatus.qualified || 0;
  const proposalCount = stats?.byStatus.proposal || 0;
  const wonCount = stats?.byStatus.won || 0;
  const lostCount = stats?.byStatus.lost || 0;

  // Conversion rate (won / (total - new - spam))
  const activeProcessed = Math.max(1, total - newCount);
  const winRate = total > 0 ? Math.round((wonCount / total) * 100) : 0;
  const qualificationRate = activeProcessed > 0 ? Math.round(((qualifiedCount + proposalCount + wonCount) / activeProcessed) * 100) : 0;

  // Breakdown by industry from lead records
  const industryCounts: Record<string, number> = {};
  const budgetCounts: Record<string, number> = {};
  const sourceCounts: Record<string, number> = {
    contact: stats?.bySource.contact || 0,
    'start-project': stats?.bySource['start-project'] || 0,
  };

  leads.forEach((l) => {
    if (l.industry) {
      industryCounts[l.industry] = (industryCounts[l.industry] || 0) + 1;
    }
    if (l.budgetRange) {
      budgetCounts[l.budgetRange] = (budgetCounts[l.budgetRange] || 0) + 1;
    }
  });

  const sortedIndustries = Object.entries(industryCounts).sort((a, b) => b[1] - a[1]);
  const sortedBudgets = Object.entries(budgetCounts).sort((a, b) => b[1] - a[1]);

  return (
    <AdminShell lang={lang} email={session.email} active="analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.06] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-600/15 text-teal-400 text-xs font-semibold mb-2">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>{t('تحليلات الأداء ومسار التحويل', 'Performance & Conversion Analytics')}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white leading-snug">
              {t('مؤشرات التحويل ومصادر الطلبات', 'Conversion Pipeline & Lead Attribution')}
            </h1>
            <p className="text-sm text-slate-400">
              {t(
                'تحليل مسار تحويل العملاء من أول استفسار إلى توقيع العقد، وتوزيع مصادر الطلبات ونطاقات الميزانية.',
                'Funnel conversion tracking from initial enquiry to signed engagement, channel attribution, and scope breakdown.'
              )}
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-slate-900/80 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            <span>{t('إدارة الطلبات المباشرة', 'Manage Leads')}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-blue-400" />
          </Link>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile
            Icon={Target}
            accent="blue"
            label={t('نسبة إتمام الصفقات (Win Rate)', 'Win Rate')}
            value={`${winRate}%`}
            hint={t(`${wonCount} عقود من أصل ${total} طلباً`, `${wonCount} won of ${total} total`)}
          />
          <KpiTile
            Icon={TrendingUp}
            accent="teal"
            label={t('معدل تأهيل العملاء', 'Qualification Rate')}
            value={`${qualificationRate}%`}
            hint={t('نسبة الطلبات المؤهلة للعروض', 'Leads reaching qualified or proposal')}
          />
          <KpiTile
            Icon={Clock}
            accent={stats && stats.awaitingFirstResponse > 0 ? 'rose' : 'teal'}
            label={t('بانتظار الرد الأول', 'Awaiting Reply')}
            value={stats?.awaitingFirstResponse || 0}
            hint={t('طلبات جديدة لم تتم معالجتها', 'Unprocessed incoming enquiries')}
          />
          <KpiTile
            Icon={Award}
            accent="teal"
            label={t('الطلبات المكتملة بنجاح', 'Won Deals')}
            value={wonCount}
            hint={t('مشاريع تم التعاقد عليها', 'Engagements successfully closed')}
          />
        </div>

        {/* Funnel Visualisation Card */}
        <section className="glass-card rounded-2xl border border-white/[0.08] p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-base font-bold text-white leading-snug flex items-center gap-2">
                <Filter className="h-4 w-4 text-blue-400" />
                {t('مسار تحويل الطلبات (Conversion Funnel)', 'Lead Conversion Funnel')}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {t('تدرج انتقال العملاء المحتملين عبر مراحل المبيعات والتعاقد', 'Progression of prospects through business pipeline stages')}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {t(`إجمالي السجل: ${total}`, `Total Volume: ${total}`)}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { status: 'new' as const, count: newCount, color: 'bg-blue-500' },
              { status: 'contacted' as const, count: contactedCount, color: 'bg-sky-500' },
              { status: 'qualified' as const, count: qualifiedCount, color: 'bg-amber-500' },
              { status: 'proposal' as const, count: proposalCount, color: 'bg-teal-500' },
              { status: 'won' as const, count: wonCount, color: 'bg-emerald-500' },
            ].map((stage, idx) => {
              const pct = total > 0 ? Math.round((stage.count / total) * 100) : 0;
              return (
                <div key={stage.status} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-slate-500 text-[10px]">{idx + 1}.</span>
                      <span>{STATUS_LABELS[stage.status][lang]}</span>
                    </span>
                    <span className="font-mono text-slate-400">
                      {stage.count} <span className="text-slate-500">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/[0.05]">
                    <div
                      className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                      style={{ width: `${Math.max(pct, stage.count > 0 ? 3 : 0)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {lostCount > 0 && (
            <p className="text-xs text-slate-400 pt-2 border-t border-white/[0.05]">
              {t(`* تم استبعاد أو خسارة ${lostCount} طلباً خلال دورة التواصل.`, `* ${lostCount} leads closed as lost/cancelled.`)}
            </p>
          )}
        </section>

        {/* Source and Demand Distribution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Source Attribution */}
          <section className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-4">
            <h3 className="font-display text-sm font-bold text-white leading-snug flex items-center gap-2">
              <Compass className="h-4 w-4 text-blue-400" />
              {t('قنوات التقاط الطلبات', 'Lead Capture Source')}
            </h3>
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-900/80 border border-white/[0.05] p-3 flex justify-between items-center">
                <div>
                  <div className="text-xs font-semibold text-white">{t('نموذج التواصل السريع', 'Contact Form')}</div>
                  <div className="text-[11px] text-slate-400">/contact</div>
                </div>
                <div className="font-mono text-base font-bold text-blue-400">{sourceCounts['contact']}</div>
              </div>
              <div className="rounded-xl bg-slate-900/80 border border-white/[0.05] p-3 flex justify-between items-center">
                <div>
                  <div className="text-xs font-semibold text-white">{t('معالج ابدأ مشروعك', 'Project Wizard')}</div>
                  <div className="text-[11px] text-slate-400">/start-project</div>
                </div>
                <div className="font-mono text-base font-bold text-teal-400">{sourceCounts['start-project']}</div>
              </div>
            </div>
          </section>

          {/* Top Industry Requests */}
          <section className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-4">
            <h3 className="font-display text-sm font-bold text-white leading-snug flex items-center gap-2">
              <Layers className="h-4 w-4 text-teal-400" />
              {t('القطاعات الأكثر طلباً', 'Top Industry Demands')}
            </h3>
            {sortedIndustries.length === 0 ? (
              <p className="text-xs text-slate-400">{t('لا توجد بيانات قطاعات مسجلة بعد.', 'No industry data recorded yet.')}</p>
            ) : (
              <ul className="space-y-2 text-xs">
                {sortedIndustries.slice(0, 5).map(([ind, count]) => (
                  <li key={ind} className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                    <span className="text-slate-300 font-medium truncate max-w-[140px]">{ind}</span>
                    <span className="font-mono text-slate-200 bg-slate-900 px-2 py-0.5 rounded border border-white/[0.06]">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Budget Range Distribution */}
          <section className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-4">
            <h3 className="font-display text-sm font-bold text-white leading-snug flex items-center gap-2">
              <PieChart className="h-4 w-4 text-sky-400" />
              {t('نطاقات الميزانية المحددة', 'Scope & Budget Ranges')}
            </h3>
            {sortedBudgets.length === 0 ? (
              <p className="text-xs text-slate-400">{t('لا توجد بيانات ميزانية مسجلة بعد.', 'No budget data recorded yet.')}</p>
            ) : (
              <ul className="space-y-2 text-xs">
                {sortedBudgets.slice(0, 5).map(([b, count]) => (
                  <li key={b} className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                    <span className="text-slate-300 font-medium truncate max-w-[140px]">{b}</span>
                    <span className="font-mono text-slate-200 bg-slate-900 px-2 py-0.5 rounded border border-white/[0.06]">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
