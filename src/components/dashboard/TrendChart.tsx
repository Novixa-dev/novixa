'use client';

import React, { useId, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import type { Bilingual, SeriesPoint } from '@/lib/dashboard-demo';
import { CHART_COLORS } from '@/lib/dashboard-demo';

interface TrendChartProps {
  label: Bilingual;
  unit: Bilingual;
  series: SeriesPoint[];
  /**
   * Period-over-period change across the window, as a percentage. Computed by
   * the caller from this same series — never asserted alongside it — so a
   * reader can recompute it from the data table below the panel.
   */
  change?: number | null;
  /** The selected window, named in the header and the accessible description. */
  windowDays?: number;
}

const VIEW_W = 640;
const VIEW_H = 200;
const PAD = { top: 16, right: 16, bottom: 26, left: 16 };
const PLOT_W = VIEW_W - PAD.left - PAD.right;
const PLOT_H = VIEW_H - PAD.top - PAD.bottom;

const STROKE = CHART_COLORS[0];

/**
 * Daily trend, drawn as an area with a 2px line and an on-hover crosshair.
 *
 * Hand-rolled SVG rather than a charting library: the whole site ships 102 kB
 * of shared JS and a chart library would be a large fraction of that again for
 * two chart shapes. It also keeps the marks under the same hairline/mono
 * treatment as the rest of the interface.
 *
 * In RTL the plot is mirrored so time runs right-to-left with the reading
 * direction. Only the geometry flips — labels are positioned in their mirrored
 * slots and drawn normally, because mirroring the SVG wholesale would reverse
 * the text too.
 */
export const TrendChart: React.FC<TrendChartProps> = ({ label, unit, series, change = null, windowDays }) => {
  const { language, isRtl, t } = useLanguage();
  const gradientId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { points, path, areaPath, max, min } = useMemo(() => {
    const values = series.map((p) => p.value);
    const rawMax = Math.max(...values);
    const rawMin = Math.min(...values);
    // Pad the range so the line never rides the top or bottom edge.
    const headroom = Math.max(1, (rawMax - rawMin) * 0.25);
    const max = rawMax + headroom;
    const min = Math.max(0, rawMin - headroom);
    const span = max - min || 1;

    const pts = series.map((point, i) => {
      const ratio = series.length > 1 ? i / (series.length - 1) : 0;
      const x = PAD.left + (isRtl ? 1 - ratio : ratio) * PLOT_W;
      const y = PAD.top + PLOT_H - ((point.value - min) / span) * PLOT_H;
      return { x, y, ...point };
    });

    // Drawing order must follow x, not data order, or the mirrored path
    // zig-zags back across itself.
    const ordered = [...pts].sort((a, b) => a.x - b.x);
    const line = ordered.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
    const baseline = PAD.top + PLOT_H;
    const area = `${line} L${ordered[ordered.length - 1].x.toFixed(2)},${baseline} L${ordered[0].x.toFixed(2)},${baseline} Z`;

    return { points: pts, path: line, areaPath: area, max, min };
  }, [series, isRtl]);

  const active = activeIndex === null ? null : points[activeIndex];

  /** Maps a pointer position to the nearest data point. */
  const handlePointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    // The SVG scales to its container, so convert client px into viewBox units.
    const x = ((event.clientX - rect.left) / rect.width) * VIEW_W;
    let nearest = 0;
    let bestDistance = Infinity;
    points.forEach((point, i) => {
      const distance = Math.abs(point.x - x);
      if (distance < bestDistance) {
        bestDistance = distance;
        nearest = i;
      }
    });
    setActiveIndex(nearest);
  };

  const dayLabel = (day: number) => {
    const daysAgo = series.length - 1 - day;
    if (daysAgo === 0) return t('اليوم', 'Today');
    if (daysAgo === 1) return t('أمس', 'Yesterday');
    return t(`قبل ${daysAgo} يوماً`, `${daysAgo} days ago`);
  };

  const first = points.find((p) => p.day === 0);
  const last = points.find((p) => p.day === series.length - 1);

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h2 className="text-sm font-bold font-display text-white">{label[language]}</h2>
        <span className="flex items-baseline gap-2 text-[11px] font-mono text-slate-400">
          {change !== null && (
            <span
              className={change >= 0 ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}
            >
              {/* U+2212 minus, not a hyphen: it aligns with the digits. */}
              {change >= 0 ? '+' : '−'}
              {Math.abs(change).toFixed(1)}%
            </span>
          )}
          <span>{t(`آخر ${windowDays ?? series.length} يوماً`, `Last ${windowDays ?? series.length} days`)}</span>
        </span>
      </div>
      {change !== null && (
        <p className="text-[11px] text-slate-400 leading-relaxed">
          {t(
            'النسبة هي الفرق بين متوسط النصف الأحدث من النافذة ومتوسط نصفها الأقدم — محسوبة من نفس الأرقام الظاهرة في جدول البيانات أدناه.',
            'The percentage is the mean of the window’s most recent half against the mean of its older half — computed from the same figures shown in the data table below.'
          )}
        </p>
      )}

      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full h-[200px] touch-none"
          role="img"
          aria-label={t(
            `${label.ar} — رسم بياني لآخر ${series.length} يوماً. القيم متاحة في جدول البيانات أسفل اللوحة.`,
            `${label.en} — trend over the last ${series.length} days. Values are available in the data table below the panel.`
          )}
          onPointerMove={handlePointer}
          onPointerLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={STROKE} stopOpacity="0.28" />
              <stop offset="100%" stopColor={STROKE} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Recessive gridlines — three bands is enough to read level. */}
          {[0, 0.5, 1].map((ratio) => {
            const y = PAD.top + ratio * PLOT_H;
            return (
              <line
                key={ratio}
                x1={PAD.left}
                x2={PAD.left + PLOT_W}
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            );
          })}

          <path d={areaPath} fill={`url(#${gradientId})`} />
          <path d={path} fill="none" stroke={STROKE} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

          {active && (
            <g>
              <line
                x1={active.x}
                x2={active.x}
                y1={PAD.top}
                y2={PAD.top + PLOT_H}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {/* 2px surface ring keeps the marker legible over the line. */}
              <circle cx={active.x} cy={active.y} r="5" fill={STROKE} stroke="#0F172A" strokeWidth="2" />
            </g>
          )}

          {/* Endpoint labels only — never a number on every point. */}
          {first && (
            <text
              x={first.x}
              y={VIEW_H - 8}
              textAnchor={isRtl ? 'end' : 'start'}
              className="fill-slate-400"
              style={{ fontSize: 11, fontFamily: 'ui-monospace, monospace' }}
            >
              {t(`قبل ${series.length - 1} يوماً`, `−${series.length - 1}d`)}
            </text>
          )}
          {last && (
            <text
              x={last.x}
              y={VIEW_H - 8}
              textAnchor={isRtl ? 'start' : 'end'}
              className="fill-slate-400"
              style={{ fontSize: 11, fontFamily: 'ui-monospace, monospace' }}
            >
              {t('اليوم', 'Today')}
            </text>
          )}
        </svg>

        {active && (
          <div
            className="pointer-events-none absolute -top-1 z-10 rounded-lg border border-white/10 bg-slate-950/95 px-2.5 py-1.5 shadow-xl"
            style={{
              // Position in container percentage so it tracks the scaled SVG.
              insetInlineStart: `calc(${(active.x / VIEW_W) * 100}% - 0px)`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="text-[10px] font-mono text-slate-400">{dayLabel(active.day)}</div>
            <div className="text-sm font-bold text-white tabular-nums">
              {active.value.toLocaleString('en-US')}{' '}
              <span className="text-[11px] font-normal text-slate-400">{unit[language]}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>
          {t('الأدنى', 'Low')} {Math.round(min).toLocaleString('en-US')}
        </span>
        <span>
          {t('الأعلى', 'High')} {Math.round(max).toLocaleString('en-US')}
        </span>
      </div>
    </div>
  );
};
