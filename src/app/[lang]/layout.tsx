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
        <Navbar />
        <CommandMenu />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
