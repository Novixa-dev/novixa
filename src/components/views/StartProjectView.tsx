'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ProjectDiscoveryWizard } from '../sections/ProjectDiscoveryWizard';
import { ScopeEstimator } from '../sections/ScopeEstimator';
import { Compass, Calculator } from 'lucide-react';

export const StartProjectView: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'wizard' | 'estimator'>('wizard');
  const [injectedDetails, setInjectedDetails] = useState<string>('');

  const handleScopeApplied = (summary: { category: string; modules: string[]; scale: string }) => {
    const text = `${t('النموذج الهندسي المقدر', 'Estimated Architecture')}: ${summary.category}\n${t('المستوى والسعة', 'Scale Tier')}: ${summary.scale}\n${t('الوحدات المطلوبة', 'Selected Modules')}: ${summary.modules.join(', ')}`;
    setInjectedDetails(text);
    setActiveTab('wizard');
  };

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Lighting & Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* View Switcher Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl bg-white p-1 border border-slate-200 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('wizard')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'wizard'
                  ? 'bg-[#38BDF8] text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t('معالج استكشاف المشروع', 'Discovery Intake Wizard')}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('estimator')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'estimator'
                  ? 'bg-[#38BDF8] text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t('حاسبة النطاق والمعمارية', 'Scope & Architecture Estimator')}</span>
            </button>
          </div>
        </div>

        {activeTab === 'wizard' ? (
          <ProjectDiscoveryWizard initialDetails={injectedDetails} />
        ) : (
          <ScopeEstimator onSelectScope={handleScopeApplied} />
        )}
      </div>
    </div>
  );
};
