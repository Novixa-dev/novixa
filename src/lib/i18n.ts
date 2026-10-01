import type { Language } from '@/types';

/**
 * Server-side counterpart to `useLanguage()`.
 *
 * `useLanguage()` is a React hook, so any component calling it must be a client
 * component — even one that renders nothing but static markup. That is how ten
 * sections and six views on this site ended up in the client bundle: not
 * because they do anything, but because they needed to read the locale.
 *
 * The cost was measured. On throttled mobile the homepage spent 1290 ms in
 * Style & Layout and 838 ms evaluating script, and 92% of its 5.1 s LCP was
 * render delay — the H1 was in the HTML at 460 ms and did not paint for five
 * seconds. Code-splitting those bundles was tried first and made it worse
 * (score 72 → 66), because splitting rearranges work rather than removing it.
 *
 * This removes it. A component that takes `lang` as a prop and calls this
 * helper is a server component: its markup is rendered once at build time and
 * its JavaScript never reaches the browser at all.
 *
 * The returned shape deliberately matches `useLanguage()`'s, so converting a
 * component is a change to its first two lines rather than to its body.
 *
 * Use `useLanguage()` wherever the component genuinely needs interactivity or
 * must react to a locale switch without a navigation; use this everywhere else.
 */
export interface Translator {
  language: Language;
  isRtl: boolean;
  dir: 'rtl' | 'ltr';
  /** Picks the Arabic or English string for the current locale. */
  t: (arText: string, enText: string) => string;
}

export function createTranslator(lang: Language): Translator {
  const isRtl = lang === 'ar';
  return {
    language: lang,
    isRtl,
    dir: isRtl ? 'rtl' : 'ltr',
    t: (arText: string, enText: string) => (isRtl ? arText : enText),
  };
}

/**
 * Narrows an untrusted route param to a supported locale.
 *
 * Arabic is the site's default and primary language, so it is the fallback for
 * anything unrecognised rather than English.
 */
export function resolveLanguage(value: string | undefined): Language {
  return value === 'en' ? 'en' : 'ar';
}
