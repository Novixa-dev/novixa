'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import type { Bilingual, Breakdown } from '@/lib/dashboard-demo';
import { CHART_COLORS } from '@/lib/dashboard-demo';

interface BreakdownChartProps {
  label: Bilingual;
  unit: Bilingual;
  items: Breakdown[];
}

/**
 * Horizontal bars for a categorical split.
 *
 * Horizontal rather than vertical because the category labels are full Arabic
 * and English phrases ("QR menu at table"), which would need rotating under a
 * vertical axis. Bars grow from the inline start, so they run right-to-left in
 * Arabic without any extra handling.
 *
 * Each bar carries its own hue in fixed slot order and is directly labelled
 * with its value, so identity never rests on colour alone.
 */
export const BreakdownChart: React.FC<BreakdownChartProps> = ({ label, unit, items }) => {
  const { language, t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  const total = items.reduce((sum, item) => sum + item.value, 0);
  const max = Math.max(...items.map((item) => item.value), 1);
  // Latin digits in both locales: the rest of the site writes numbers this
  // way, and mixing numeral systems on one screen is worse than either
  // choice alone. `tabular-nums` (set globally) keeps columns aligned.
  const numberLocale = 'en-US';

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-bold font-display text-white">{label[language]}</h2>
        <span className="text-[11px] font-mono text-slate-400">
          {total.toLocaleString(numberLocale)} {unit[language]}
        </span>
      </div>

      <ul className="space-y-2.5">
        {items.map((item, index) => {
          const share = total ? (item.value / total) * 100 : 0;
          const color = CHART_COLORS[index % CHART_COLORS.length];
          const isActive = activeId === item.id;

          return (
            <li
              key={item.id}
              className="space-y-1.5"
              onPointerEnter={() => setActiveId(item.id)}
              onPointerLeave={() => setActiveId(null)}
            >
              <div className="flex items-baseline justify-between gap-3 text-xs">
                <span className="flex items-center gap-2 text-slate-300 min-w-0">
                  <span
                    className="w-2 h-2 rounded-sm shrink-0"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.label[language]}</span>
                </span>
                <span className="font-mono text-slate-400 shrink-0 tabular-nums">
                  {item.value.toLocaleString(numberLocale)}
                  <span className={isActive ? 'text-slate-300' : 'text-slate-400'}>
                    {' '}
                    ({share.toFixed(0)}%)
                  </span>
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-800/70 overflow-hidden">
                <div
                  className="h-full rounded-full transition-[width,opacity] duration-300"
                  style={{
                    width: `${(item.value / max) * 100}%`,
                    backgroundColor: color,
                    opacity: activeId && !isActive ? 0.55 : 1,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <p className="sr-only">
        {t(
          `${label.ar}: ${items.map((i) => `${i.label.ar} ${i.value}`).join('، ')}.`,
          `${label.en}: ${items.map((i) => `${i.label.en} ${i.value}`).join(', ')}.`
        )}
      </p>
    </div>
  );
};
