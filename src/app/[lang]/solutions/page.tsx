import React from 'react';
import { constructMetadata } from '@/lib/metadata';
import { SolutionsView } from '@/components/views/SolutionsView';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'منظومة الحلول البرمجية والأنظمة المخصصة' : 'Custom Software Solutions & Platforms',
    description: isAr
      ? 'استكشف قائمة الحلول البرمجية المخصصة من نوڤيكسا، تشمل المنصات السحابية، البوابات التشغيلية، ومحركات الربط الأوتوماتيكي.'
      : 'Explore Novixa custom enterprise solutions including multi-tenant SaaS architectures, custom ERP/CRM, and operational portals.',
    lang,
    path: 'solutions',
  });
}

export default async function SolutionsPage() {
  return <SolutionsView />;
}
