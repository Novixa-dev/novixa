import React from 'react';
import { constructMetadata, generateBreadcrumbJsonLd } from '@/lib/metadata';
import { SolutionsView } from '@/components/views/SolutionsView';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr
      ? 'الحلول البرمجية الجاهزة للتخصيص والسريعة الإطلاق'
      : 'Turnkey Productized Business Software Solutions',
    description: isAr
      ? 'قواعد برمجية مجربة للمطاعم، الحجوزات، المتاجر، العيادات، المخازن، وإدارة العقارات تطلق خلال 5 إلى 14 يوماً بهويتك الخاصة.'
      : 'Proven, turnkey business software solutions for restaurants, bookings, clinics, retail, inventory, and real estate deployed in 5–14 days.',
    lang,
    path: 'solutions',
  });
}

export default async function SolutionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'الحلول الجاهزة' : 'Solutions', url: `/${lang}/solutions` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SolutionsView />
    </>
  );
}
