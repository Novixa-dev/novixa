import React from 'react';
import { constructMetadata, generateOrganizationJsonLd, generateWebSiteJsonLd } from '@/lib/metadata';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSummarySection } from '@/components/sections/ServicesSummarySection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { HomeCTASection } from '@/components/sections/HomeCTASection';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'هندسة البرمجيات والأنظمة الرقمية المتقدمة' : 'Enterprise Software Engineering & Digital Products',
    description: isAr
      ? 'نوڤيكسا متخصصة في هندسة المنصات البرمجية، محركات SaaS السحابية، والحلول الرقمية عالية الأداء في الخليج والشرق الأوسط.'
      : 'Novixa builds enterprise software platforms, multi-tenant cloud SaaS engines, and high-concurrency systems across the Middle East and GCC.',
    lang,
    path: '',
  });
}

export default async function HomePage() {
  const organizationJsonLd = generateOrganizationJsonLd();
  const websiteJsonLd = generateWebSiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Services Summary Section */}
      <ServicesSummarySection />

      {/* 3. Portfolio & Case Studies Showcase */}
      <CaseStudiesSection />

      {/* 4. Bottom CTA Section pointing to /contact */}
      <HomeCTASection />
    </>
  );
}
