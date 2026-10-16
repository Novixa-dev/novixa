import React from 'react';
import { constructMetadata, generateBreadcrumbJsonLd, generateItemListJsonLd } from '@/lib/metadata';
import { InsightsView } from '@/components/views/InsightsView';
import { insightsArticles } from '@/lib/content';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'مختبر المعرفة الهندسية والمقالات' : 'Engineering Insights & Architectural Field Notes',
    description: isAr
      ? 'اقرأ مقالات مختبر نوڤيكسا عن معمارية الأنظمة المتعددة المستأجرين، الفرق بين البرامج الجاهزة والمخصصة، وأتمتة مسارات العمليات.'
      : 'Read Novixa Engineering Lab articles on multi-tenant SaaS architecture, custom vs off-the-shelf software, and workflow automation.',
    lang,
    path: 'insights',
  });
}

export default async function InsightsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'مختبر المعرفة' : 'Insights Lab', url: `/${lang}/insights` },
  ]);

  const itemListJsonLd = generateItemListJsonLd(
    insightsArticles.map((a) => ({
      name: a.title[isAr ? 'ar' : 'en'],
      url: `/${lang}/insights/${a.id}`,
    })),
    isAr ? 'مقالات مختبر نوڤيكسا الهندسية' : 'Novixa Engineering Insights'
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
      <InsightsView lang={lang} />
    </>
  );
}
