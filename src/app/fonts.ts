import localFont from 'next/font/local';

/**
 * Fonts are served from `public/fonts` via `next/font/local` rather than
 * `next/font/google`.
 *
 * The Google loader emitted no `<link rel="preload" as="font">` at all for
 * these families, so every face was discovered only after the stylesheet
 * parsed. The Arabic body font then swapped in late and re-wrapped text —
 * metric-adjusted fallbacks correct line-box height but cannot correct glyph
 * advance widths, so Arabic re-wraps to a different number of lines and the
 * layout moves. That was the whole of the site's desktop CLS.
 *
 * Hand-written `<link rel="preload">` on the `public/` copies does not help:
 * next/font rewrites every face into its own hashed `/_next/static/media/...`
 * URL, so preloading the source file just downloads it twice. The lever that
 * does work is `font-display: optional` on the two faces that drive Arabic
 * text metrics — the browser either has the font within its short block
 * period and paints with it, or keeps the fallback for that page view and
 * never swaps. Either way the layout does not move.
 *
 * The cost is that a first-ever visit on a slow connection may render once in
 * the metric-matched fallback; every later view is cached and correct. Inter
 * keeps `swap`, since Latin metric overrides hold line counts stable.
 *
 * Only weights the codebase actually uses are shipped (400/500/600/700 body,
 * 600/700/800 display). Adding a weight means adding the file here too.
 */

// Body copy — Arabic text. Clean, technical legibility at small sizes.
export const ibmPlexSansArabic = localFont({
  src: [
    { path: '../../public/fonts/IBMPlexSansArabic-arabic-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-arabic-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-latin-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-arabic-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-latin-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-arabic-700.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-latin-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-arabic',
  display: 'optional',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
  // Matches IBM Plex Sans Arabic's metrics onto the fallback face so the
  // pre-swap render occupies close to the same vertical space.
  adjustFontFallback: 'Arial',
});

// Display headings — both languages.
export const alexandria = localFont({
  src: [
    { path: '../../public/fonts/Alexandria-arabic-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Alexandria-latin-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Alexandria-arabic-700.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/Alexandria-latin-700.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/Alexandria-arabic-800.woff2', weight: '800', style: 'normal' },
    { path: '../../public/fonts/Alexandria-latin-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'optional',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

// Body copy — Latin (English) text.
export const inter = localFont({
  src: [
    { path: '../../public/fonts/Inter-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Inter-latin-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Inter-latin-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Inter-latin-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-english',
  display: 'swap',
  // Not preloaded. Inter is applied only under `html[lang="en"]`, but the
  // root layout declares every font once for both locales, so preloading it
  // put four faces (~180 kB) on the critical path of every *Arabic* page —
  // the default and primary locale — where they can never be used.
  //
  // Lighthouse measured 11 font preloads competing for bandwidth while the
  // hero H1 waited: 92% of a 5.4 s LCP was render delay, not network latency.
  // Dropping these four removes a third of that contention from the pages
  // most visitors land on.
  //
  // The cost falls on English pages, where Inter now loads without a preload
  // hint. `display: swap` plus the metric-matched Arial fallback below keeps
  // that swap from moving the layout, which is why this trade is acceptable
  // in this direction and would not be in the other.
  preload: false,
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});
