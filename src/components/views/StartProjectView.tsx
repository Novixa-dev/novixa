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
    <div className="bg-slate-950 min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* View Switcher Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl bg-slate-900/90 p-1 border border-white/[0.08] shadow-lg">
            <button
              type="button"
              onClick={() => setActiveTab('wizard')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'wizard'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t('معالج استكشاف المشروع', 'Discovery Intake Wizard')}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('estimator')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'estimator'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
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
