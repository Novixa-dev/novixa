'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dir: 'rtl' | 'ltr';
  isRtl: boolean;
  t: (arText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ initialLang?: Language; children: React.ReactNode }> = ({ initialLang = 'ar', children }) => {
  const [language, setLanguageState] = useState<Language>(initialLang);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (initialLang && initialLang !== language) {
      setLanguageState(initialLang);
    }
  }, [initialLang]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }

    if (pathname) {
      const segments = pathname.split('/');
      if (segments[1] === 'ar' || segments[1] === 'en') {
        segments[1] = lang;
        const newPath = segments.join('/');
        router.push(newPath);
      }
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const isRtl = language === 'ar';

  const t = (arText: string, enText: string) => {
    return language === 'ar' ? arText : enText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, dir, isRtl, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const defaultContextValue: LanguageContextType = {
  language: 'ar',
  setLanguage: () => {},
  toggleLanguage: () => {},
  dir: 'rtl',
  isRtl: true,
  t: (arText: string, enText: string) => arText,
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return defaultContextValue;
  }
  return context;
};
