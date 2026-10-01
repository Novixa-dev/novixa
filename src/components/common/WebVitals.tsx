'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Field Core Web Vitals, reported from real visits.
 *
 * Lab numbers — Lighthouse, run on every touched page — say what the site can
 * do on one machine. Field numbers say what visitors on real connections
 * actually get, which is what Core Web Vitals are scored on. Only the second
 * kind can tell you that Arabic font loading is slow on a 3G connection in
 * Sana'a.
 *
 * Deliberately *not* `@vercel/analytics` / `@vercel/speed-insights`. Both carry
 * an optional `@sveltejs/kit` peer dependency that npm tries to resolve against
 * this tree, where it collides with the Vite version Vitest pins. Installing
 * either needs `--legacy-peer-deps`, which weakens dependency resolution for
 * every package in the project — a permanent maintenance cost for one
 * reporting script. `useReportWebVitals` is built into Next.js, adds no
 * dependency, and reports the same metrics.
 *
 * Sends nothing unless `NEXT_PUBLIC_VITALS_ENDPOINT` is set, so this is inert
 * until someone chooses a destination. No cookies, no identifiers, nothing
 * requiring a consent banner — a banner is a real cost on a conversion path
 * and should only be paid when something actually requires it.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    const endpoint = process.env.NEXT_PUBLIC_VITALS_ENDPOINT;
    if (!endpoint) return;

    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      path: window.location.pathname,
      // The locale is the most useful dimension here: Arabic pages load a
      // different font subset, so their LCP can diverge from the English ones.
      locale: document.documentElement.lang,
    });

    // `sendBeacon` survives the page being closed, which is exactly when the
    // final metrics are reported. `fetch` with keepalive is the fallback.
    if (navigator.sendBeacon?.(endpoint, body)) return;
    void fetch(endpoint, { body, method: 'POST', keepalive: true }).catch(() => {
      // Reporting must never surface to the visitor or break the page.
    });
  });

  return null;
}
