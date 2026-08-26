import React from 'react';
import { constructMetadata } from '@/lib/metadata';
import { WorkView } from '@/components/views/WorkView';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'الأعمال المختارة والدراسات المعمارية' : 'Selected Work & Concept Architectures',
    description: isAr
      ? 'استعرض المعرض المعماري والنماذج البرمجية لنوڤيكسا: تشمل عروض المنتجات والتصاميم المعتمدة في الترفيه، الصحة، واللوجستيات.'
      : 'Explore Novixa Selected Work featuring Product Demonstrations, Concept Architectures, and Engineering Prototypes across GCC.',
    lang,
    path: 'work',
  });
}

export default async function WorkPage() {
  return <WorkView />;
}
