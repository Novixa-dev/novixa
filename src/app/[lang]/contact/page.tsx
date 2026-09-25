import React from 'react';
import { constructMetadata, generateBreadcrumbJsonLd, generateContactPageJsonLd } from '@/lib/metadata';
import { ContactView } from '@/components/views/ContactView';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr
      ? 'تواصل مع نوڤيكسا | طلب مشروع أو استشارة هندسية'
      : 'Contact Novixa | Start a Project or Request an Engineering Consultation',
    description: isAr
      ? 'تحدث مباشرة مع مهندسي نوڤيكسا حول نظامك القادم: برمجيات مخصصة، حلول جاهزة، نشر سحابي، أو صيانة مستمرة. نخدم اليمن ودول الخليج بالعربية والإنجليزية.'
      : 'Talk directly to Novixa engineers about your next system: custom software, turnkey solutions, cloud deployment, or ongoing maintenance. Serving Yemen and the GCC in Arabic and English.',
    lang,
    path: 'contact',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: isAr ? 'الرئيسية' : 'Home', url: `/${lang}` },
    { name: isAr ? 'تواصل معنا' : 'Contact', url: `/${lang}/contact` },
  ]);
  const contactJsonLd = generateContactPageJsonLd(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactView />
    </>
  );
}
