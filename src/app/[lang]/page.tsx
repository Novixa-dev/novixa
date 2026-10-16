import React from 'react';
import { constructMetadata, generateOrganizationJsonLd, generateWebSiteJsonLd } from '@/lib/metadata';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesStrip } from '@/components/sections/ServicesStrip';
import { HomeAboutSection } from '@/components/sections/HomeAboutSection';
import { servicesCatalog } from '@/lib/content';
import { DualEngineSection } from '@/components/sections/DualEngineSection';
import { ProblemTransformation } from '@/components/sections/ProblemTransformation';
import { ServicesSummarySection } from '@/components/sections/ServicesSummarySection';
import { ReadySolutionsSection } from '@/components/sections/ReadySolutionsSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { WhyNovixaSection } from '@/components/sections/WhyNovixaSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { DeploymentHostingSection } from '@/components/sections/DeploymentHostingSection';
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
      
      {/* 1. Hero & Services Strip: Unified 100vh First Viewport (Above the Fold) */}
      <div className="relative min-h-screen lg:h-[100dvh] flex flex-col justify-between">
        <HeroSection servicesCount={servicesCatalog.length} />
        <ServicesStrip />
      </div>

      {/* 3. About Section: Who Novixa is + Workspace Visual */}
      <HomeAboutSection />

      {/* 4. Dual Engine: Custom Engineering vs Ready Turnkey Solutions */}
      <div className="defer-offscreen">
        <DualEngineSection lang={lang} />
      </div>

      {/* 3. Problem Transformation: Disconnected Chaos vs Unified Software Engine */}
      <div className="defer-offscreen">
        <ProblemTransformation />
      </div>

      {/* 4. Core Services: 9 Customer-Facing Engineering & Operations Services */}
      <div className="defer-offscreen">
        <ServicesSummarySection />
      </div>

      {/* 5. Ready Solutions: 8 Reusable Turnkey Business Software Foundations (5–14 Days) */}
      <div className="defer-offscreen">
        <ReadySolutionsSection lang={lang} />
      </div>

      {/* 6. Proprietary Products: Transparent Status Badges (Aqar, Restaurant, Booking, Pulse) */}
      <div className="defer-offscreen">
        <ProductsSection lang={lang} />
      </div>

      {/* 7. Selected Work: Honestly Labeled Demonstrations & Prototypes */}
      <div className="defer-offscreen">
        <CaseStudiesSection lang={lang} />
      </div>

      {/* 8. Why Novixa: Real Code Ownership, Problem-First, Anti-Agency Value */}
      <div className="defer-offscreen">
        <WhyNovixaSection lang={lang} />
      </div>

      {/* 9. Engagement Process: 6-Stage Transparent Lifecycle */}
      <div className="defer-offscreen">
        <ProcessSection />
      </div>

      {/* 10. Deployment & Hosting: "Deployment, Hosting & Operations" */}
      <div className="defer-offscreen">
        <DeploymentHostingSection lang={lang} />
      </div>

    </>
  );
}
