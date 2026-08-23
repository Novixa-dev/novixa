import React from 'react';
import { constructMetadata, generateOrganizationJsonLd } from '@/lib/metadata';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemTransformation } from '@/components/sections/ProblemTransformation';
import { WhatWeBuild } from '@/components/sections/WhatWeBuild';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { PulseSection } from '@/components/sections/PulseSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { EngineeringSection } from '@/components/sections/EngineeringSection';
import { WhyNovixaSection } from '@/components/sections/WhyNovixaSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { InsightsSection } from '@/components/sections/InsightsSection';
import { ProjectDiscoveryWizard } from '@/components/sections/ProjectDiscoveryWizard';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr ? 'هندسة البرمجيات والأنظمة الرقمية' : 'Enterprise Software Architecture',
    description: isAr
      ? 'نوڤيكسا متخصصة في هندسة المنصات البرمجية، أنظمة نقاط البيع والمطاعم، المحركات الذكية، وغرف التحكم التشغيلية في الخليج والشرق الأوسط.'
      : 'Novixa builds enterprise software systems, POS/KDS hospitality tech, booking engines, and real-time logistics control rooms in the Middle East and GCC.',
    lang,
    path: '',
  });
}

export default async function HomePage() {
  const jsonLd = generateOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ProblemTransformation />
      <WhatWeBuild />
      <IndustriesSection />
      <ProductsSection />
      <PulseSection />
      <CaseStudiesSection />
      <ProcessSection />
      <EngineeringSection />
      <WhyNovixaSection />
      <FounderSection />
      <TestimonialsSection />
      <InsightsSection />
      <ProjectDiscoveryWizard />
    </>
  );
}
