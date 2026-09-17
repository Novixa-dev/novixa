import React from 'react';
import { constructMetadata, generateBreadcrumbJsonLd } from '@/lib/metadata';
import { ServicesView } from '@/components/views/ServicesView';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr
      ? 'خدمات هندسة البرمجيات والتشغيل السحابي'
      : 'Software Engineering & Cloud Operations Services',
    description: isAr
      ? 'استكشف خدمات نوڤيكسا الـ 9: تطوير البرمجيات المخصصة، حلول الأعمال، تطوير المنتجات، تحديث الأنظمة، النشر السحابي، الاستضافة المدارة، الصيانة، الأتمتة، والذكاء الاصطناعي.'
      : 'Explore Novixa 9 core engineering services: custom software development, turnkey business solutions, legacy modernization, cloud deployment, managed hosting, SLA maintenance, integrations, and practical AI.',
    lang,
    path: 'services',
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'الخدمات الهندسية' : 'Services', url: `/${lang}/services` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServicesView />
    </>
  );
}
