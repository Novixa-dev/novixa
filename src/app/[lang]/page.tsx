import React from 'react';
import { constructMetadata, generateOrganizationJsonLd, generateWebSiteJsonLd } from '@/lib/metadata';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemTransformation } from '@/components/sections/ProblemTransformation';
import { WhatWeBuild } from '@/components/sections/WhatWeBuild';
import { CompanyGrowthStory } from '@/components/sections/CompanyGrowthStory';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { PulseSection } from '@/components/sections/PulseSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { EngineeringSection } from '@/components/sections/EngineeringSection';
import { WhyNovixaSection } from '@/components/sections/WhyNovixaSection';
import { InsightsSection } from '@/components/sections/InsightsSection';
import { StartProjectCTA } from '@/components/sections/StartProjectCTA';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'هندسة البرمجيات والأنظمة الرقمية المتقدمة' : 'Enterprise Software Engineering & Digital Products',
    description: isAr
      ? 'نوڤيكسا متخصصة في هندسة المنصات البرمجية، أنظمة نقاط البيع وإدارة المطاعم، المحركات الذكية، ومنصات SaaS السحابية في الخليج والشرق الأوسط.'
      : 'Novixa builds enterprise software systems, multi-tenant B2B SaaS platforms, POS/KDS tech, and high-concurrency digital architectures across the Middle East and GCC.',
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
      <HeroSection />
      <ProblemTransformation />
      <WhatWeBuild />
      <CompanyGrowthStory />
      <IndustriesSection />
      <ProductsSection />
      <PulseSection />
      <CaseStudiesSection />
      <EngineeringSection />
      <WhyNovixaSection />
      <InsightsSection />
      <StartProjectCTA />
    </>
  );
}
