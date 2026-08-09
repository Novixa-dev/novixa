import React from 'react';
import { constructMetadata } from '@/lib/metadata';
import { AboutView } from '@/components/views/AboutView';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'عن نوڤيكسا وفلسفة الهندسة' : 'About Novixa & Core Philosophy',
    description: isAr
      ? 'تعرف على شركة نوڤيكسا لهندسة البرمجيات، فريق قيادة المنتجات، والقيم الهندسية القائمة على الدقة، الشفافية، والاستقرار.'
      : 'Learn about Novixa, our engineering philosophy, product leadership, and commitment to high-performance enterprise systems.',
    lang,
    path: 'about',
  });
}

export default async function AboutPage() {
  return <AboutView onNavigate={() => {}} />;
}
