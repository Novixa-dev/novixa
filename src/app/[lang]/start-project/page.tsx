import React from 'react';
import { constructMetadata, generateBreadcrumbJsonLd } from '@/lib/metadata';
import { StartProjectView } from '@/components/views/StartProjectView';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'ابدأ مشروعك الرقمي | أداة التقييم المعماري' : 'Start Your Project | Architectural Discovery Wizard',
    description: isAr
      ? 'حدد أهداف مشروعك البرمجي، المتطلبات الفنية، والجدول الزمني عبر معالج التقييم التفاعلي من نوڤيكسا للحصول على تقدير استشاري بدقيق.'
      : 'Define your scope, technical requirements, and timeline using Novixa Project Discovery Wizard for an immediate advisory assessment.',
    lang,
    path: 'start-project',
  });
}

export default async function StartProjectPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'ابدأ مشروعك' : 'Start Project', url: `/${lang}/start-project` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StartProjectView />
    </>
  );
}
