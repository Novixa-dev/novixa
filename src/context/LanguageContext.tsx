'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  /** Navigates to the same page in the given locale. */
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  /**
   * Href of the current page in the other locale. Prefer rendering this as a
   * real `<Link>`/`<a>` over calling `toggleLanguage()` from an `onClick`: an
   * anchor is keyboard- and middle-click-friendly, survives JS failing to
   * load, and gives crawlers a discoverable path between locales.
   */
  alternateHref: string;
  dir: 'rtl' | 'ltr';
  isRtl: boolean;
  t: (arText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const DEFAULT_LANGUAGE: Language = 'ar';

function isLanguage(value: string | undefined): value is Language {
  return value === 'ar' || value === 'en';
}

/**
 * The locale lives in the URL (`/ar/...`, `/en/...`), so the URL is the single
 * source of truth.
 *
 * This used to be mirrored into `useState` and re-synced from `initialLang` by
 * an effect. That made the same fact exist in two places, which is a bug
 * generator rather than a convenience: switching locale set the state first and
 * pushed the route second, so for one render the state and the URL disagreed,
 * and any effect reconciling them could just as easily undo the user's choice
 * as apply it. Deriving instead means there is nothing to keep in sync.
 */
function languageFromPathname(pathname: string | null): Language | undefined {
  if (!pathname) return undefined;
  const segment = pathname.split('/')[1];
  return isLanguage(segment) ? segment : undefined;
}

/** Same path, other locale — `/ar/products/aqar` → `/en/products/aqar`. */
function swapLocaleInPath(pathname: string | null, target: Language): string {
  if (!pathname) return `/${target}`;
  const segments = pathname.split('/');
  if (isLanguage(segments[1])) {
    segments[1] = target;
    return segments.join('/') || `/${target}`;
  }
  return `/${target}`;
}

export const LanguageProvider: React.FC<{
  initialLang?: Language;
  children: React.ReactNode;
}> = ({ initialLang = DEFAULT_LANGUAGE, children }) => {
  const router = useRouter();
  const pathname = usePathname();

  // `initialLang` comes from the server-rendered route segment and only acts as
  // a fallback for the first paint and for any route the matcher cannot read.
  const language = languageFromPathname(pathname) ?? initialLang;

  const value = useMemo<LanguageContextType>(() => {
    const otherLang: Language = language === 'ar' ? 'en' : 'ar';
    const alternateHref = swapLocaleInPath(pathname, otherLang);

    const setLanguage = (lang: Language) => {
      if (lang === language) return;
      router.push(swapLocaleInPath(pathname, lang));
    };

    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(otherLang),
      alternateHref,
      dir: language === 'ar' ? 'rtl' : 'ltr',
      isRtl: language === 'ar',
      t: (arText: string, enText: string) => (language === 'ar' ? arText : enText),
    };
  }, [language, pathname, router]);

  // `<html lang dir>` is owned by the root layout, which sits above the
  // `[lang]` segment and so never re-renders on a locale switch. The blocking
  // script in `src/app/layout.tsx` gets a hard load right; this keeps a
  // client-side navigation between locales right too.
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

/**
 * Fallback for components rendered outside a provider (Arabic is the site's
 * default and primary locale, so it is the correct unmarked state).
 */
const defaultContextValue: LanguageContextType = {
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  toggleLanguage: () => {},
  alternateHref: '/en',
  dir: 'rtl',
  isRtl: true,
  t: (arText: string) => arText,
};

export const useLanguage = () => useContext(LanguageContext) ?? defaultContextValue;
