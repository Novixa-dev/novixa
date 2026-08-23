'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ViewType } from './types';
import { trackEvent } from './lib/analytics';
import { logger } from './lib/logger';
import { GlobalErrorBoundary } from './components/common/GlobalErrorBoundary';
import { PageLoader } from './components/ui/PageLoader';

// Homepage Sections
import { HeroSection } from './components/sections/HeroSection';
import { ProblemTransformation } from './components/sections/ProblemTransformation';
import { WhatWeBuild } from './components/sections/WhatWeBuild';
import { CompanyGrowthStory } from './components/sections/CompanyGrowthStory';
import { IndustriesSection } from './components/sections/IndustriesSection';
import { ProductsSection } from './components/sections/ProductsSection';
import { PulseSection } from './components/sections/PulseSection';
import { CaseStudiesSection } from './components/sections/CaseStudiesSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { EngineeringSection } from './components/sections/EngineeringSection';
import { WhyNovixaSection } from './components/sections/WhyNovixaSection';
import { FounderSection } from './components/sections/FounderSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { InsightsSection } from './components/sections/InsightsSection';
import { ProjectDiscoveryWizard } from './components/sections/ProjectDiscoveryWizard';

// Subviews (Lazy Loaded for Performance)
const SolutionsView = lazy(() => import('./components/views/SolutionsView').then(m => ({ default: m.SolutionsView })));
const IndustriesView = lazy(() => import('./components/views/IndustriesView').then(m => ({ default: m.IndustriesView })));
const ProductsView = lazy(() => import('./components/views/ProductsView').then(m => ({ default: m.ProductsView })));
const WorkView = lazy(() => import('./components/views/WorkView').then(m => ({ default: m.WorkView })));
const AboutView = lazy(() => import('./components/views/AboutView').then(m => ({ default: m.AboutView })));
const InsightsView = lazy(() => import('./components/views/InsightsView').then(m => ({ default: m.InsightsView })));
const StartProjectView = lazy(() => import('./components/views/StartProjectView').then(m => ({ default: m.StartProjectView })));
const DevIntegrationTestView = lazy(() => import('./components/views/DevIntegrationTestView').then(m => ({ default: m.DevIntegrationTestView })));

export function AppContent() {
  const { language, setLanguage, isRtl, t } = useLanguage();
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);

  // Sync state with URL pathname & hash on mount and on popstate/hashchange
  useEffect(() => {
    const parseLocation = () => {
      let rawPath = '';
      if (typeof window !== 'undefined') {
        if (window.location.hash && window.location.hash.startsWith('#/')) {
          const hashPath = window.location.hash.replace(/^#\/?/, '');
          rawPath = hashPath;
          // Upgrade legacy hash routing to clean URL
          window.history.replaceState(null, '', `/${hashPath}`);
        } else {
          rawPath = window.location.pathname.replace(/^\//, '');
        }
      }
      if (!rawPath) {
        // Default to Arabic home if no path
        if (typeof window !== 'undefined') {
           window.history.replaceState(null, '', '/ar');
        }
        return;
      }

      const parts = rawPath.split('/').filter(Boolean);
      if (parts.length === 0) return;

      let targetLang = parts[0];
      let targetView = parts[1] || 'home';
      let subSlug = parts[2];

      if (targetLang === 'ar' || targetLang === 'en') {
        if (targetLang !== language) {
          setLanguage(targetLang);
        }
      } else {
        targetView = targetLang;
      }

      if (targetView === 'start-project' || targetView === 'start') {
        setCurrentView('start');
      } else if (targetView === 'products') {
        setCurrentView('products');
        if (subSlug) {
          setSelectedProductId(subSlug);
        }
      } else if (['home', 'solutions', 'services', 'industries', 'work', 'about', 'insights', 'dev_integration'].includes(targetView)) {
        setCurrentView(targetView as ViewType);
      } else if (rawPath.includes('dev/integration-test') || targetView === 'dev') {
        setCurrentView('dev_integration');
      }
    };

    parseLocation();
    window.addEventListener('popstate', parseLocation);
    window.addEventListener('hashchange', parseLocation);
    return () => {
      window.removeEventListener('popstate', parseLocation);
      window.removeEventListener('hashchange', parseLocation);
    };
  }, [language]);

  // Update browser URL & title on view/lang change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Build canonical route path
    const viewSegment = currentView === 'home' ? '' : `/${currentView === 'start' ? 'start-project' : currentView}`;
    const productSegment = currentView === 'products' && selectedProductId ? `/${selectedProductId}` : '';
    const newPath = `/${language}${viewSegment}${productSegment}`;

    // Dynamic Title & Meta Map
    const seoMap: Record<ViewType, { titleAr: string; titleEn: string; descAr: string; descEn: string }> = {
      home: { 
        titleAr: 'نوڤيكسا | هندسة البرمجيات والمنتجات الرقمية', 
        titleEn: 'Novixa | Enterprise Software Architecture & Digital Systems',
        descAr: 'شركة هندسة برمجيات متخصصة في بناء المنصات السحابية، المنتجات الرقمية (SaaS)، وتحديث الأنظمة المعقدة.',
        descEn: 'Software engineering firm specializing in cloud platforms, proprietary B2B SaaS, and complex system modernization.'
      },
      services: { 
        titleAr: 'الخدمات الهندسية التقنية | نوڤيكسا', 
        titleEn: 'Technical Engineering Services | Novixa',
        descAr: 'نقدم خدمات بناء المعمارية السحابية، تطوير الواجهات البرمجية، وهندسة الأداء العالي للشركات.',
        descEn: 'We provide cloud architecture, robust API development, and high-performance engineering services for enterprises.'
      },
      solutions: { 
        titleAr: 'منصات الأعمال والحلول المخصصة | نوڤيكسا', 
        titleEn: 'Enterprise Business Platforms & Custom Systems | Novixa',
        descAr: 'حلول تشغيلية وأنظمة مخصصة لحل مشاكل الأعمال المعقدة.',
        descEn: 'Custom operational engines and systems tailored to solve complex business friction.'
      },
      industries: { 
        titleAr: 'القطاعات والحلول التشغيلية | نوڤيكسا', 
        titleEn: 'Industry Verticals & Operations Engineering | Novixa',
        descAr: 'حلول برمجية متخصصة لقطاعات التجزئة، العقارات، الترفيه، والرعاية الصحية.',
        descEn: 'Specialized software solutions for Retail, PropTech, Entertainment, and Healthcare.'
      },
      products: { 
        titleAr: 'كتالوج المنتجات البرمجية الرقمية | نوڤيكسا', 
        titleEn: 'Digital Product Catalog (SaaS) | Novixa',
        descAr: 'استكشف منتجاتنا السحابية (SaaS) المصممة لحل تحديات متكررة في السوق.',
        descEn: 'Explore our proprietary B2B SaaS platforms engineered to solve recurring market friction.'
      },
      work: { 
        titleAr: 'الأعمال المختارة والمعمارية | نوڤيكسا', 
        titleEn: 'Selected Work & System Architecture | Novixa',
        descAr: 'استعرض نماذج من أعمالنا الهندسية وبنيتنا التحتية الموثوقة.',
        descEn: 'Review our selected engineering case studies and robust infrastructure architectures.'
      },
      'case-study-detail': { 
        titleAr: 'تفاصيل المعمارية الهندسية | نوڤيكسا', 
        titleEn: 'Architecture Case Detail | Novixa',
        descAr: 'تفاصيل بناء وهندسة المشاريع المعقدة وتحديات التوسع.',
        descEn: 'In-depth architectural breakdown and scale engineering challenges.'
      },
      about: { 
        titleAr: 'عن نوڤيكسا وفلسفة الهندسة', 
        titleEn: 'About Novixa & Engineering Philosophy',
        descAr: 'نحن مهندسون ولسنا وكالة. تعرف على فلسفتنا في بناء برمجيات حقيقية تخدم الأعمال.',
        descEn: 'We are engineers, not an agency. Discover our philosophy on building real software that drives business outcomes.'
      },
      insights: { 
        titleAr: 'مختبر المعرفة ومقالات الهندسة | نوڤيكسا', 
        titleEn: 'Engineering Insights & Tech Articles | Novixa',
        descAr: 'مقالات تقنية متعمقة حول هندسة البرمجيات والتطوير وبنية السحابة.',
        descEn: 'Deep technical articles covering software engineering, architecture, and cloud deployment.'
      },
      'insight-detail': { 
        titleAr: 'تفاصيل المقال الهندسي | نوڤيكسا', 
        titleEn: 'Engineering Insight Detail | Novixa',
        descAr: 'مقال تفصيلي من مختبر المعرفة لنوڤيكسا.',
        descEn: 'Detailed technical insight from the Novixa Lab.'
      },
      start: { 
        titleAr: 'ابدأ مشروعك وابنِ نظامك | نوڤيكسا', 
        titleEn: 'Start Your Project Discovery | Novixa',
        descAr: 'تواصل معنا لبدء مشروعك البرمجي، نبدأ بجلسة اكتشاف معمارية.',
        descEn: 'Contact us to start your software project. We begin with a deep architectural discovery session.'
      },
      dev_integration: { 
        titleAr: 'لوحة الاختبار الهندسي الشامل | نوڤيكسا', 
        titleEn: 'Novixa Development Integration Test Dashboard',
        descAr: 'لوحة اختبارات التكامل والتطوير.',
        descEn: 'Development and integration testing dashboard.'
      }
    };

    const currentSEO = seoMap[currentView];
    if (currentSEO) {
      document.title = t(currentSEO.titleAr, currentSEO.titleEn);
      
      // Update Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', t(currentSEO.descAr, currentSEO.descEn));
    } else {
      document.title = 'Novixa';
    }

    // Track pageview
    trackEvent('page_view', { view: currentView, productId: selectedProductId }, newPath, language);
  }, [currentView, language, selectedProductId]);

  const handleNavigate = (view: ViewType, subSlug?: string) => {
    trackEvent('navigate', { targetView: view });
    
    // Build path
    const viewSegment = view === 'home' ? '' : `/${view === 'start' ? 'start-project' : view}`;
    const productSegment = view === 'products' && subSlug ? `/${subSlug}` : '';
    const newPath = `/${language}${viewSegment}${productSegment}`;
    
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', newPath);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-arabic selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Content Render */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <HeroSection onNavigate={handleNavigate} />
            <ProblemTransformation />
            <CompanyGrowthStory />
            <WhatWeBuild onNavigate={handleNavigate} />
            <IndustriesSection onNavigate={handleNavigate} />
            <ProductsSection onNavigate={handleNavigate} onSelectProduct={(id) => setSelectedProductId(id)} />
            <PulseSection />
            <CaseStudiesSection onNavigate={handleNavigate} />
            <ProcessSection />
            <EngineeringSection />
            <WhyNovixaSection />
            <FounderSection />
            <TestimonialsSection onNavigate={handleNavigate} />
            <InsightsSection onNavigate={handleNavigate} />
            <ProjectDiscoveryWizard />
          </>
        )}

        <Suspense fallback={<PageLoader />}>
          {currentView === 'solutions' && <SolutionsView onNavigate={handleNavigate} />}
          {currentView === 'services' && <SolutionsView onNavigate={handleNavigate} />}
          {currentView === 'industries' && <IndustriesView onNavigate={handleNavigate} />}
          {currentView === 'products' && (
            <ProductsView onNavigate={handleNavigate} selectedProductId={selectedProductId} />
          )}
          {currentView === 'work' && <WorkView onNavigate={handleNavigate} />}
          {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}
          {currentView === 'insights' && <InsightsView onNavigate={handleNavigate} />}
          {currentView === 'start' && <StartProjectView onNavigate={handleNavigate} />}
          {currentView === 'dev_integration' && <DevIntegrationTestView />}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    logger.initGlobalErrorHandlers();
  }, []);

  return (
    <GlobalErrorBoundary>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </GlobalErrorBoundary>
  );
}
