import React from 'react';
import { constructMetadata } from '@/lib/metadata';
import { InsightsView } from '@/components/views/InsightsView';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'مختبر المعرفة الهندسية والمقالات' : 'Engineering Insights & Architectural Field Notes',
    description: isAr
      ? 'اقرأ مقالات مختبر نوڤيكسا عن معمارية الأنظمة المتعددة المستأجرين، الفرق بين البرامج الجاهزة والمخصصة، وتطبيقات الذكاء الاصطناعي.'
      : 'Read Novixa Engineering Lab articles on multi-tenant SaaS architecture, custom vs off-the-shelf software, and operational AI.',
    lang,
    path: 'insights',
  });
}

export default async function InsightsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  return <InsightsView lang={lang} />;
}
