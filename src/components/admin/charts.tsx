/**
 * Dashboard figures — server-rendered, no chart library, no client JS.
 *
 * Form choices (see the dataviz method): the four headline numbers are stat
 * tiles, not charts. Status and source are *magnitudes of labelled categories*,
 * so they are single-hue bars with the label and count in text — no categorical
 * palette, and the reserved status hues are not borrowed to mean "pipeline
 * stage". The 30-day trend is one series, so it has no legend; each bar carries
 * a native tooltip and the same numbers are exposed as a table for assistive
 * technology.
 */
import { CHART_COLORS } from '@/lib/dashboard-demo';

const BAR = CHART_COLORS[0];

export function KpiTile({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="glass-card rounded-xl border border-white/[0.07] p-4">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 font-display text-3xl font-bold text-white">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-400">{hint}</div>}
    </div>
  );
}

export function BarList({
  title,
  items,
}: {
  title: string;
  items: Array<{ key: string; label: string; value: number }>;
}) {
  const max = Math.max(1, ...items.map((item) => item.value));
  return (
    <section className="glass-card rounded-2xl border border-white/[0.08] p-5">
      <h2 className="mb-4 font-display text-sm font-bold text-white leading-snug">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.key}>
            <div className="mb-1 flex items-baseline justify-between gap-3 text-xs">
              <span className="text-slate-300">{item.label}</span>
              <span className="font-semibold text-white">{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.05]" aria-hidden="true">
              <div
                className="h-2 rounded-full"
                style={{ width: `${(item.value / max) * 100}%`, minWidth: item.value ? 4 : 0, backgroundColor: BAR }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DailyChart({
  title,
  series,
  rtl,
  unitLabel,
  dayLabel,
}: {
  title: string;
  series: Array<{ date: string; count: number }>;
  rtl: boolean;
  unitLabel: string;
  dayLabel: string;
}) {
  const W = 600;
  const H = 120;
  const gap = 2;
  const max = Math.max(1, ...series.map((point) => point.count));
  const barWidth = W / series.length - gap;

  return (
    <section className="glass-card rounded-2xl border border-white/[0.08] p-5">
      <h2 className="mb-4 font-display text-sm font-bold text-white leading-snug">{title}</h2>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-32 w-full" role="img" aria-label={title}>
        <line x1="0" x2={W} y1={H - 0.5} y2={H - 0.5} stroke="rgba(255,255,255,0.08)" />
        {series.map((point, index) => {
          const height = point.count ? Math.max(4, (point.count / max) * (H - 8)) : 0;
          // Time runs with the reading direction: right-to-left in Arabic.
          const slot = rtl ? series.length - 1 - index : index;
          const x = slot * (barWidth + gap);
          return (
            <g key={point.date}>
              <title>{`${point.date}: ${point.count} ${unitLabel}`}</title>
              {/* Hit target taller than the mark, so a one-lead day is still hoverable. */}
              <rect x={x} y={0} width={barWidth + gap} height={H} fill="transparent" />
              {height > 0 && <rect x={x} y={H - height} width={barWidth} height={height} rx={2} fill={BAR} />}
            </g>
          );
        })}
      </svg>
      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">{dayLabel}</th>
            <th scope="col">{unitLabel}</th>
          </tr>
        </thead>
        <tbody>
          {series.map((point) => (
            <tr key={point.date}>
              <th scope="row">{point.date}</th>
              <td>{point.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
