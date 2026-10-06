import { describe, expect, it } from 'vitest';
import {
  DASHBOARD_MODULES,
  TREND_WINDOWS,
  buildTrendSeries,
  periodOverPeriodChange,
} from '@/lib/dashboard-demo';

/**
 * The console's series are generated, and the console lets a visitor change
 * the window. That combination has two failure modes that are invisible in a
 * screenshot and obvious to anyone actually using the page: the chart
 * reshuffling when the window changes, and a server/client mismatch. Both are
 * properties of the generator, so they are asserted here rather than left to a
 * browser test to notice indirectly.
 */
describe('trend series generation', () => {
  it('is deterministic — the same spec and window always give the same points', () => {
    for (const module of DASHBOARD_MODULES) {
      const first = buildTrendSeries(module.trend.spec, 30);
      const second = buildTrendSeries(module.trend.spec, 30);
      expect(second).toEqual(first);
    }
  });

  it('extends the window to the left instead of regenerating it', () => {
    // Widening from 14 to 90 days must leave the fourteen points that were
    // already on screen untouched. If it does not, the chart appears to
    // redraw itself with different history, which reads as a bug.
    for (const module of DASHBOARD_MODULES) {
      const short = buildTrendSeries(module.trend.spec, 14);
      const long = buildTrendSeries(module.trend.spec, 90);
      const tail = long.slice(-14).map((point) => point.value);
      expect(tail).toEqual(short.map((point) => point.value));
    }
  });

  it('reports the same most recent value in every window', () => {
    for (const module of DASHBOARD_MODULES) {
      const values = TREND_WINDOWS.map((days) => {
        const series = buildTrendSeries(module.trend.spec, days);
        return series[series.length - 1].value;
      });
      expect(new Set(values).size).toBe(1);
    }
  });

  it('stays plausible across the widest window', () => {
    // A flat per-day trend drove the early points of a 90-day window to zero
    // and produced a +1131% period-over-period change. Compounding growth
    // replaced it; these bounds are what that fix has to keep holding.
    for (const module of DASHBOARD_MODULES) {
      const series = buildTrendSeries(module.trend.spec, 90);
      const values = series.map((point) => point.value);

      expect(Math.min(...values)).toBeGreaterThan(0);

      const change = periodOverPeriodChange(series);
      expect(change).not.toBeNull();
      expect(Math.abs(change as number)).toBeLessThan(60);
    }
  });

  it('produces one point per requested day, indexed from oldest to newest', () => {
    for (const days of TREND_WINDOWS) {
      const series = buildTrendSeries(DASHBOARD_MODULES[0].trend.spec, days);
      expect(series).toHaveLength(days);
      expect(series.map((point) => point.day)).toEqual(
        Array.from({ length: days }, (_, index) => index)
      );
    }
  });

  it('varies day to day rather than drawing a smooth curve', () => {
    // A weekly rhythm plus bounded noise is what makes an operations chart
    // read as data. A monotonic series would mean the generator degenerated.
    const series = buildTrendSeries(DASHBOARD_MODULES[0].trend.spec, 30);
    const rises = series.filter((point, i) => i > 0 && point.value > series[i - 1].value).length;
    expect(rises).toBeGreaterThan(5);
    expect(rises).toBeLessThan(series.length - 5);
  });
});

describe('periodOverPeriodChange', () => {
  it('is the mean of the recent half against the mean of the older half', () => {
    const series = [10, 10, 20, 20].map((value, day) => ({ day, value }));
    expect(periodOverPeriodChange(series)).toBeCloseTo(100, 6);
  });

  it('returns null rather than a misleading number on too little data', () => {
    expect(periodOverPeriodChange([])).toBeNull();
    expect(periodOverPeriodChange([{ day: 0, value: 5 }])).toBeNull();
  });

  it('returns null rather than dividing by zero', () => {
    const series = [0, 0, 4, 4].map((value, day) => ({ day, value }));
    expect(periodOverPeriodChange(series)).toBeNull();
  });

  it('reports a decline as negative', () => {
    const series = [40, 40, 20, 20].map((value, day) => ({ day, value }));
    expect(periodOverPeriodChange(series)).toBeCloseTo(-50, 6);
  });
});
