import React from 'react';
import { constructMetadata, generateBreadcrumbJsonLd, generateItemListJsonLd } from '@/lib/metadata';
import { IndustriesView } from '@/components/views/IndustriesView';
import { industriesCatalog } from '@/lib/content';
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

export default async function IndustriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'حلول القطاعات' : 'Industries', url: `/${lang}/industries` },
  ]);

  const itemListJsonLd = generateItemListJsonLd(
    industriesCatalog.map((ind) => ({
      name: ind.name[isAr ? 'ar' : 'en'],
      url: `/${lang}/industries/${ind.id}`,
    })),
    isAr ? 'حلول نوڤيكسا للقطاعات التجارية' : 'Novixa Industry Vertical Solutions'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <IndustriesView lang={lang} />
    </>
  );
}
