'use client';

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ViewType } from './types';
import { trackEvent } from './lib/analytics';
import { logger } from './lib/logger';
import { GlobalErrorBoundary } from './components/common/GlobalErrorBoundary';

// Homepage Sections
import { HeroSection } from './components/sections/HeroSection';
import { ProblemTransformation } from './components/sections/ProblemTransformation';
import { WhatWeBuild } from './components/sections/WhatWeBuild';
import { IndustriesSection } from './components/sections/IndustriesSection';
import { ProductsSection } from './components/sections/ProductsSection';
import { PulseSection } from './components/sections/PulseSection';
import { CaseStudiesSection } from './components/sections/CaseStudiesSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { EngineeringSection } from './components/sections/EngineeringSection';
import { WhyNovixaSection } from './components/sections/WhyNovixaSection';
import { FounderSection } from './components/sections/FounderSection';
import { InsightsSection } from './components/sections/InsightsSection';
import { ProjectDiscoveryWizard } from './components/sections/ProjectDiscoveryWizard';

// Subviews
import { SolutionsView } from './components/views/SolutionsView';
import { IndustriesView } from './components/views/IndustriesView';
import { ProductsView } from './components/views/ProductsView';
import { WorkView } from './components/views/WorkView';
import { AboutView } from './components/views/AboutView';
import { InsightsView } from './components/views/InsightsView';
import { StartProjectView } from './components/views/StartProjectView';
import { DevIntegrationTestView } from './components/views/DevIntegrationTestView';

export function AppContent() {
  const { language, setLanguage, isRtl, t } = useLanguage();
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);

  // Sync state with URL hash on mount & hash change
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) return;

      const parts = hash.split('/');
      let targetLang = parts[0];
      let targetView = parts[1];

      if (targetLang === 'ar' || targetLang === 'en') {
        if (targetLang !== language) setLanguage(targetLang);
      } else {
        targetView = targetLang;
      }

      if (targetView && ['home', 'solutions', 'industries', 'products', 'work', 'about', 'insights', 'start', 'dev_integration'].includes(targetView)) {
        setCurrentView(targetView as ViewType);
      } else if (hash.includes('dev/integration-test') || targetView === 'dev') {
        setCurrentView('dev_integration');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Update URL hash, page title & track analytics on view/lang change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash
    const newHash = `/${language}/${currentView}`;
    if (window.location.hash !== `#${newHash}`) {
      window.history.replaceState(null, '', `#${newHash}`);
    }

    // Dynamic Title Map
    const titleMap: Record<ViewType, { ar: string; en: string }> = {
      home: { ar: 'نوڤيكسا | هندسة البرمجيات والمنتجات الرقمية', en: 'Novixa | Software Engineering & Digital Products' },
      solutions: { ar: 'منصات الأعمال والحلول المخصصة | نوڤيكسا', en: 'Business Platforms & Custom Solutions | Novixa' },
      industries: { ar: 'القطاعات والحلول التشغيلية | نوڤيكسا', en: 'Industry Solutions & Vertical Engineering | Novixa' },
      products: { ar: 'كتالوج المنتجات الرقمية | نوڤيكسا', en: 'Digital Product Catalog | Novixa' },
      work: { ar: 'الأعمال المختارة والمعمارية | نوڤيكسا', en: 'Selected Work & System Architecture | Novixa' },
      'case-study-detail': { ar: 'تفاصيل المعمارية الهندسية | نوڤيكسا', en: 'Selected Work Architecture Detail | Novixa' },
      about: { ar: 'عن نوڤيكسا وفلسفة الهندسة', en: 'About Novixa & Engineering Philosophy' },
      insights: { ar: 'مقالات الهندسة والتقنية | نوڤيكسا', en: 'Engineering Insights & Tech Articles | Novixa' },
      'insight-detail': { ar: 'تفاصيل المقال الهندسي | نوڤيكسا', en: 'Engineering Insight Detail | Novixa' },
      start: { ar: 'ابدأ مشروعك وابنِ نظامك | نوڤيكسا', en: 'Start Your Project Discovery | Novixa' },
      dev_integration: { ar: 'لوحة الاختبار الهندسي الشامل | نوڤيكسا', en: 'Novixa Development Integration Test Dashboard' }
    };

    const currentTitle = titleMap[currentView] ? t(titleMap[currentView].ar, titleMap[currentView].en) : 'Novixa';
    document.title = currentTitle;

    // Track pageview
    trackEvent('page_view', { view: currentView }, `/${language}/${currentView}`, language);
  }, [currentView, language]);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    trackEvent('navigate', { targetView: view });
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
            <WhatWeBuild onNavigate={handleNavigate} />
            <IndustriesSection onNavigate={handleNavigate} />
            <ProductsSection onNavigate={handleNavigate} onSelectProduct={(id) => setSelectedProductId(id)} />
            <PulseSection />
            <CaseStudiesSection onNavigate={handleNavigate} />
            <ProcessSection />
            <EngineeringSection />
            <WhyNovixaSection />
            <FounderSection />
            <InsightsSection onNavigate={handleNavigate} />
            <ProjectDiscoveryWizard />
          </>
        )}

        {currentView === 'solutions' && <SolutionsView onNavigate={handleNavigate} />}
        {currentView === 'industries' && <IndustriesView onNavigate={handleNavigate} />}
        {currentView === 'products' && (
          <ProductsView onNavigate={handleNavigate} selectedProductId={selectedProductId} />
        )}
        {currentView === 'work' && <WorkView onNavigate={handleNavigate} />}
        {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}
        {currentView === 'insights' && <InsightsView onNavigate={handleNavigate} />}
        {currentView === 'start' && <StartProjectView onNavigate={handleNavigate} />}
        {currentView === 'dev_integration' && <DevIntegrationTestView />}
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
