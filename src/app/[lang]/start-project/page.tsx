import React from 'react';
import { constructMetadata } from '@/lib/metadata';
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

export default async function StartProjectPage() {
  return <StartProjectView onNavigate={() => {}} />;
}
