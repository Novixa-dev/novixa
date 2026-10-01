import React from 'react';
import { constructMetadata, generateOrganizationJsonLd, generateWebSiteJsonLd } from '@/lib/metadata';
import { HeroSection } from '@/components/sections/HeroSection';
import { DualEngineSection } from '@/components/sections/DualEngineSection';
import { ProblemTransformation } from '@/components/sections/ProblemTransformation';
import { ServicesSummarySection } from '@/components/sections/ServicesSummarySection';
import { ReadySolutionsSection } from '@/components/sections/ReadySolutionsSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { WhyNovixaSection } from '@/components/sections/WhyNovixaSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { DeploymentHostingSection } from '@/components/sections/DeploymentHostingSection';
import { MaintenanceSupportSection } from '@/components/sections/MaintenanceSupportSection';
import { HomeCTASection } from '@/components/sections/HomeCTASection';
import { Language } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
  const isAr = lang === 'ar';

  return constructMetadata({
    title: isAr
      ? 'نوڤيكسا | هندسة البرمجيات، الحلول الجاهزة، والنشر السحابي المدار'
      : 'Novixa | Software Engineering, Productized Solutions & Managed Hosting',
    description: isAr
      ? 'نبني الأنظمة والمنتجات الرقمية التي تجعل أعمالك تعمل بشكل أفضل. حلول برمجية مخصصة وجاهزة للأعمال في اليمن والخليج مع استضافة سحابية مدارة وصيانة مستمرة.'
      : 'We build the software systems and digital products that help businesses operate better. Custom software, turnkey business solutions, cloud deployment, and managed hosting for Yemen, GCC, and beyond.',
    lang,
    path: '',
  });
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang: Language = paramLang === 'en' ? 'en' : 'ar';
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
      
      {/* 1. Hero: What Novixa is + Value Proposition + Dual CTAs */}
      <HeroSection />

      {/* 2. Dual Engine: Custom Engineering vs Ready Turnkey Solutions */}
      <DualEngineSection lang={lang} />

      {/* 3. Problem Transformation: Disconnected Chaos vs Unified Software Engine */}
      <ProblemTransformation />

      {/* 4. Core Services: 9 Customer-Facing Engineering & Operations Services */}
      <ServicesSummarySection />

      {/* 5. Ready Solutions: 8 Reusable Turnkey Business Software Foundations (5–14 Days) */}
      <ReadySolutionsSection lang={lang} />

      {/* 6. Proprietary Products: Transparent Status Badges (Aqar, Restaurant, Booking, Pulse) */}
      <ProductsSection lang={lang} />

      {/* 7. Selected Work: Honestly Labeled Demonstrations & Prototypes */}
      <CaseStudiesSection lang={lang} />

      {/* 8. Why Novixa: Real Code Ownership, Problem-First, Anti-Agency Value */}
      <WhyNovixaSection lang={lang} />

      {/* 9. Engagement Process: 6-Stage Transparent Lifecycle */}
      <ProcessSection />

      {/* 10. Deployment & Hosting: "Deployment, Hosting & Operations" */}
      <DeploymentHostingSection lang={lang} />

      {/* 11. Maintenance & Support: Continuous SLA, Security Patches, Monitoring */}
      <MaintenanceSupportSection lang={lang} />

      {/* 12. Final High-Conversion CTA: Start Project OR Explore Ready Solutions */}
      <HomeCTASection lang={lang} />
    </>
  );
}
