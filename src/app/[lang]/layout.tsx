import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandMenu } from '@/components/common/CommandMenu';
import { Language } from '@/types';

export function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'en' }];
}

// 'ar' and 'en' are the only valid locales. Without this, Next.js falls back
// to rendering the 'ar' homepage for any garbage single-segment path (e.g.
// /xyz) since [lang] matches any value — a silent soft-404 that would let
// search engines index unlimited duplicate-content URLs.
export const dynamicParams = false;

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageProvider initialLang={lang}>
      <div className={`min-h-screen flex flex-col font-arabic ${lang === 'en' ? 'font-latin' : ''}`} dir={dir}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white text-xs font-semibold"
        >
          {lang === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
        </a>
        <Navbar />
        <CommandMenu />
        <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
