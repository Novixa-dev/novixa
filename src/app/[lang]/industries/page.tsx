import React from 'react';
import { constructMetadata } from '@/lib/metadata';
import { IndustriesView } from '@/components/views/IndustriesView';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'حلول القطاعات التجارية والصناعية' : 'Industry Vertical Engineering Solutions',
    description: isAr
      ? 'استكشف تخصصات نوڤيكسا في قطاعات المطاعم والضيافة، الرعاية الصحية والعيادات، اللوجستيات والميدان، والترفيه والألعاب.'
      : 'Tailored software architectures for Hospitality & FnB, Healthcare, Field Logistics, and Gaming & Entertainment in GCC.',
    lang,
    path: 'industries',
  });
}

export default async function IndustriesPage() {
  return <IndustriesView />;
}
