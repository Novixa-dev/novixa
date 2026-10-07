'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  CalendarClock,
  FlaskConical,
  Download,
  Info,
  Table2,
  TrendingDown,
  TrendingUp,
  UtensilsCrossed,
  Users,
} from 'lucide-react';
import { TrendChart } from './TrendChart';
import { BreakdownChart } from './BreakdownChart';
import {
  DASHBOARD_MODULES,
  TREND_WINDOWS,
  TREND_WINDOW_DAYS,
  buildTrendSeries,
  periodOverPeriodChange,
  type ModuleId,
  type TrendWindow,
} from '@/lib/dashboard-demo';

const MODULE_ICONS: Record<ModuleId, React.ComponentType<{ className?: string }>> = {
  restaurant: UtensilsCrossed,
  booking: CalendarClock,
  aqar: Building2,
  pulse: Users,
};

/** Maps a module to the product page a visitor should read next. */
const MODULE_PRODUCT_SLUG: Record<ModuleId, string> = {
  restaurant: 'restaurant',
  booking: 'booking',
  aqar: 'aqar',
  pulse: 'pulse',
};

const SEVERITY_STYLES = {
  ok: 'bg-emerald-400',
  info: 'bg-blue-400',
  warn: 'bg-amber-400',
} as const;

export const DashboardConsole: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('restaurant');
  const [windowDays, setWindowDays] = useState<TrendWindow>(TREND_WINDOW_DAYS);
  const [showTable, setShowTable] = useState(false);

  const activeModule = DASHBOARD_MODULES.find((m) => m.id === activeModuleId) ?? DASHBOARD_MODULES[0];

  /**
   * The visible series, rebuilt when the module or the window changes.
   *
   * Generation is deterministic and anchored to the most recent day, so
   * widening the window extends the chart to the left rather than redrawing
   * it — switch 14 → 90 → 14 and the original fourteen points are identical.
   */
  const series = useMemo(
    () => buildTrendSeries(activeModule.trend.spec, windowDays),
    [activeModule.trend.spec, windowDays]
  );

  /** Derived from `series`, so a reader can recompute it from the table. */
  const trendChange = useMemo(() => periodOverPeriodChange(series), [series]);

  /**
   * State in the URL, so a view can be shared.
   *
   * Written with `history.replaceState` rather than `router.replace`: the
   * router would issue a server request and re-render the route on every tab
   * click, which is a navigation the visitor did not ask for. This writes the
   * address bar and nothing else. Read once on mount, which is also why it is
   * in an effect — applying a URL-derived value during the first render would
   * disagree with the prerendered HTML.
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const moduleParam = params.get('module');
    if (DASHBOARD_MODULES.some((m) => m.id === moduleParam)) {
      setActiveModuleId(moduleParam as ModuleId);
    }

    const windowParam = Number(params.get('days'));
    if (TREND_WINDOWS.some((days) => days === windowParam)) {
      setWindowDays(windowParam as TrendWindow);
    }

    if (params.get('table') === '1') setShowTable(true);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('module', activeModuleId);
    params.set('days', String(windowDays));
    if (showTable) params.set('table', '1');
    else params.delete('table');
    window.history.replaceState(null, '', `${window.location.pathname}?${params}`);
  }, [activeModuleId, windowDays, showTable]);

  /**
   * CSV of exactly what the table shows.
   *
   * The file carries the illustrative-data notice as its first line. A download
   * leaves the page behind, and a spreadsheet of generated figures with no
   * caveat in it is precisely the artefact that could later be mistaken for a
   * client's real numbers.
   */
  const downloadCsv = useCallback(() => {
    const escape = (field: string) => `"${field.replace(/"/g, '""')}"`;
    const notice = t(
      'بيانات توضيحية مولّدة — عرض تفاعلي من موقع نوڤيكسا. لا تمثل نتائج أي عميل.',
      'Illustrative generated data — interactive demo on the Novixa site. Not any client’s results.'
    );

    const rows: string[][] = [
      [notice],
      [],
      [activeModule.label[language], activeModule.product],
      [t('نافذة', 'Window'), t(`${windowDays} يوماً`, `${windowDays} days`)],
      [],
      [t('اليوم', 'Day'), activeModule.trend.unit[language]],
      ...series.map((point) => [
        String(series.length - 1 - point.day),
        String(point.value),
      ]),
      [],
      [activeModule.breakdown.label[language], activeModule.breakdown.unit[language]],
      ...activeModule.breakdown.items.map((item) => [item.label[language], String(item.value)]),
    ];

    // A BOM so Excel reads the Arabic labels as UTF-8 instead of mojibake.
    const csv = `\ufeff${rows.map((row) => row.map(escape).join(',')).join('\r\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `novixa-${activeModule.id}-${windowDays}d-illustrative.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [activeModule, language, series, t, windowDays]);

  /**
   * Arrow-key navigation across the module tabs.
   *
   * `role="tablist"` is a promise to the user that arrow keys move between
   * tabs; without this the markup claimed a pattern it did not implement, and
   * an automated check cannot see the difference. Left and right are swapped
   * in RTL so "next" is always the visually following tab.
   */
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const forward = isRtl ? 'ArrowLeft' : 'ArrowRight';
    const backward = isRtl ? 'ArrowRight' : 'ArrowLeft';
    const last = DASHBOARD_MODULES.length - 1;

    let next: number | null = null;
    if (event.key === forward) next = index === last ? 0 : index + 1;
    else if (event.key === backward) next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    if (next === null) return;

    event.preventDefault();
    setActiveModuleId(DASHBOARD_MODULES[next].id);
    tabRefs.current[next]?.focus();
  };
  // Latin digits in both locales: the rest of the site writes numbers this
  // way, and mixing numeral systems on one screen is worse than either
  // choice alone. `tabular-nums` (set globally) keeps columns aligned.
  const numberLocale = 'en-US';

  const relativeTime = (minutes: number) => {
    if (minutes < 60) return t(`قبل ${minutes} دقيقة`, `${minutes}m ago`);
    const hours = Math.round(minutes / 60);
    return t(`قبل ${hours} ساعة`, `${hours}h ago`);
  };

  return (
    <div className="space-y-6">
      {/* ── Illustrative-data notice ───────────────────────────────────────
          Stated before the numbers, not in a footnote under them: every
          figure on this page is generated to show the shape of the console,
          and none of it is a client result. */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-950/25 p-4">
        <FlaskConical className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed text-amber-100/90 text-right rtl:text-right ltr:text-left">
          <strong className="font-bold text-amber-200">
            {t('بيانات توضيحية — عرض تفاعلي.', 'Illustrative data — interactive demo.')}
          </strong>{' '}
          {t(
            'جميع الأرقام في هذه الصفحة مولّدة لعرض شكل لوحة التشغيل التي نسلّمها مع منتجاتنا وكيفية قراءتها. لا تمثل نتائج أي عميل ولا تُنسب إلى أي جهة.',
            'Every number here is generated to show the shape of the operations console we ship with our products, and how an operator reads it. None of it represents a client’s results, and none is attributed to any organisation.'
          )}
        </div>
      </div>

      {/* ── Module switcher ─────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label={t('وحدات لوحة التشغيل', 'Console modules')}
        className="flex flex-wrap gap-2"
      >
        {DASHBOARD_MODULES.map((module, index) => {
          const Icon = MODULE_ICONS[module.id];
          const isActive = module.id === activeModuleId;
          return (
            <button
              key={module.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role="tab"
              id={`module-tab-${module.id}`}
              aria-selected={isActive}
              aria-controls={`module-panel-${module.id}`}
              // Roving tabindex: Tab reaches the tablist once and lands on the
              // selected tab, then arrow keys move within it.
              tabIndex={isActive ? 0 : -1}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              onClick={() => setActiveModuleId(module.id)}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? 'border-blue-500/70 bg-blue-600/15 text-white font-semibold'
                  : 'border-white/[0.07] bg-slate-900/60 text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
              <span>{module.label[language]}</span>
              <span className="font-mono text-[10px] text-slate-400" translate="no">
                {module.product.replace('Novixa ', '')}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Window selector ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <div
          role="group"
          aria-label={t('نافذة البيانات', 'Data window')}
          className="inline-flex rounded-xl border border-white/[0.07] bg-slate-900/60 p-1"
        >
          {TREND_WINDOWS.map((days) => {
            const isActive = days === windowDays;
            return (
              <button
                key={days}
                type="button"
                aria-pressed={isActive}
                onClick={() => setWindowDays(days)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium tabular-nums transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {t(`${days} يوماً`, `${days} days`)}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={downloadCsv}
          className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-slate-900/60 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          {t('تنزيل البيانات (CSV)', 'Download data (CSV)')}
        </button>
      </div>

      {/* ── Active module ───────────────────────────────────────────────── */}
      <div
        role="tabpanel"
        id={`module-panel-${activeModule.id}`}
        aria-labelledby={`module-tab-${activeModule.id}`}
        className="space-y-5"
      >
        {/* Console chrome — matches the hero's engine panel language. */}
        <div className="glass-card rounded-2xl border border-white/[0.08] overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 sm:px-5 py-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shrink-0" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shrink-0" />
              <span className="ms-2 font-mono text-[11px] text-slate-400 truncate" translate="no">
                {activeModule.id}.console.novixa
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t('متصل', 'LIVE')}</span>
            </div>
          </div>

          <div className="px-4 sm:px-5 py-4 text-right rtl:text-right ltr:text-left">
            <p className="text-sm text-slate-300 leading-relaxed">{activeModule.purpose[language]}</p>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/[0.06]">
            {activeModule.kpis.map((kpi, index) => {
              const isGood =
                kpi.deltaDirection === 'up-good' ? kpi.delta?.startsWith('+') : kpi.delta?.startsWith('−');
              const DeltaIcon = kpi.deltaDirection === 'down-good' ? TrendingDown : TrendingUp;

              return (
                <div
                  key={kpi.id}
                  className={`p-4 sm:p-5 text-right rtl:text-right ltr:text-left space-y-1.5 border-white/[0.06] ${
                    index % 2 === 0 ? 'border-e' : ''
                  } ${index < 2 ? 'border-b lg:border-b-0' : ''} ${index === 2 ? 'lg:border-e' : ''}`}
                >
                  <div className="text-[11px] font-mono uppercase tracking-wide text-slate-400">
                    {kpi.label[language]}
                  </div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-2xl font-extrabold font-display text-white tabular-nums">
                      {kpi.value}
                    </span>
                    {kpi.delta && (
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold ${
                          isGood ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        <DeltaIcon className="w-3 h-3" aria-hidden="true" />
                        {kpi.delta}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug">{kpi.caption[language]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts + operations feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 glass-card rounded-2xl border border-white/[0.08] p-4 sm:p-5">
            <TrendChart
              label={activeModule.trend.label}
              unit={activeModule.trend.unit}
              series={series}
              change={trendChange}
              windowDays={windowDays}
            />
          </div>

          <div className="glass-card rounded-2xl border border-white/[0.08] p-4 sm:p-5">
            <BreakdownChart
              label={activeModule.breakdown.label}
              unit={activeModule.breakdown.unit}
              items={activeModule.breakdown.items}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 glass-card rounded-2xl border border-white/[0.08] p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold font-display text-white">
                {t('سجل العمليات المباشر', 'Live operations feed')}
              </h2>
            </div>
            <ul className="space-y-2.5">
              {activeModule.feed.map((event) => (
                <li
                  key={event.id}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-slate-950/60 p-3 text-right rtl:text-right ltr:text-left"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${SEVERITY_STYLES[event.severity]}`}
                    aria-hidden="true"
                  />
                  <span className="flex-1 min-w-0 text-xs text-slate-300 leading-relaxed">
                    {event.text[language]}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-slate-400 tabular-nums">
                    {relativeTime(event.minutesAgo)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-2xl border border-white/[0.08] p-4 sm:p-5 space-y-4 text-right rtl:text-right ltr:text-left">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-teal-400" />
              <h2 className="text-sm font-bold font-display text-white">
                {t('هذه اللوحة جزء من', 'This console ships with')}
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                `لوحة التشغيل أعلاه هي جزء أصيل من ${activeModule.product}، وتُسلَّم مهيأة بهويتك وصلاحيات فريقك.`,
                `The console above is part of ${activeModule.product}, delivered configured to your brand and your team’s permissions.`
              )}
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href={`/${language}/products/${MODULE_PRODUCT_SLUG[activeModule.id]}`}
                className="inline-flex items-center justify-between gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-semibold text-white transition-colors"
              >
                <span>{t('تفاصيل المنتج', 'Product details')}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/${language}/start-project`}
                className="inline-flex items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-slate-900/70 hover:bg-slate-800 px-4 py-2.5 text-xs font-medium text-slate-200 transition-colors"
              >
                <span>{t('اطلب عرضاً تجريبياً', 'Request a walkthrough')}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Table view ────────────────────────────────────────────────────
            A chart that only exists as a picture excludes screen-reader users
            and anyone who needs the exact figures. Same data, real <table>. */}
        <div className="glass-card rounded-2xl border border-white/[0.08] overflow-hidden">
          <button
            onClick={() => setShowTable((open) => !open)}
            aria-expanded={showTable}
            aria-controls="dashboard-data-table"
            className="flex w-full items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-start hover:bg-white/[0.02] transition-colors"
          >
            <span className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <Table2 className="w-4 h-4 text-slate-400" />
              {t('عرض البيانات كجدول', 'View the data as a table')}
            </span>
            <span className="font-mono text-[11px] text-slate-400">{showTable ? '−' : '+'}</span>
          </button>

          {showTable && (
            <div id="dashboard-data-table" className="border-t border-white/[0.06] p-4 sm:p-5 space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <caption className="sr-only">
                    {t(activeModule.trend.label.ar, activeModule.trend.label.en)}
                  </caption>
                  <thead>
                    <tr className="text-slate-400 font-mono text-[11px]">
                      <th scope="col" className="py-2 pe-4 text-start font-medium">
                        {t('اليوم', 'Day')}
                      </th>
                      <th scope="col" className="py-2 text-start font-medium">
                        {activeModule.trend.unit[language]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {series.map((point) => {
                      const daysAgo = series.length - 1 - point.day;
                      return (
                        <tr key={point.day} className="border-t border-white/[0.05]">
                          <th scope="row" className="py-1.5 pe-4 text-start font-normal text-slate-400">
                            {daysAgo === 0 ? t('اليوم', 'Today') : t(`قبل ${daysAgo} يوماً`, `−${daysAgo}d`)}
                          </th>
                          <td className="py-1.5 tabular-nums">
                            {point.value.toLocaleString(numberLocale)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <caption className="sr-only">
                    {t(activeModule.breakdown.label.ar, activeModule.breakdown.label.en)}
                  </caption>
                  <thead>
                    <tr className="text-slate-400 font-mono text-[11px]">
                      <th scope="col" className="py-2 pe-4 text-start font-medium">
                        {activeModule.breakdown.label[language]}
                      </th>
                      <th scope="col" className="py-2 text-start font-medium">
                        {activeModule.breakdown.unit[language]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {activeModule.breakdown.items.map((item) => (
                      <tr key={item.id} className="border-t border-white/[0.05]">
                        <th scope="row" className="py-1.5 pe-4 text-start font-normal text-slate-400">
                          {item.label[language]}
                        </th>
                        <td className="py-1.5 tabular-nums">{item.value.toLocaleString(numberLocale)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <p className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          {t(
            'اللوحة المسلّمة تُبنى على بيانات نظامك الفعلية، وتُقيَّد بصلاحيات كل دور، وتدعم العربية والإنجليزية بنفس المستوى.',
            'A delivered console runs on your system’s real data, is scoped by each role’s permissions, and supports Arabic and English equally.'
          )}
        </p>
      </div>
    </div>
  );
};
