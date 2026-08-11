'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { InsightArticle, ViewType } from '../../types';
import { InsightsSection } from '../sections/InsightsSection';

interface InsightsViewProps {
  onNavigate: (view: ViewType) => void;
  onSelectInsight?: (article: InsightArticle) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ onNavigate, onSelectInsight }) => {
  const { isRtl, t } = useLanguage();

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-12">
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-teal-300 text-xs font-semibold">
            <span>{t('مختبر المعرفة الهندسية', 'Engineering Knowledge Lab')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            {t('رؤى وأبعاد هندسية في بناء النظم الرقمية.', 'Insights & Essays on Digital System Engineering.')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {t(
              'مقالات وتجارب ميدانية توضح كيفية بناء المنتجات الرقمية الحديثة والفرق بين الحلول الجاهزة والنظم المخصصة.',
              'Field notes exploring multi-tenant architecture, custom vs SaaS trade-offs, and practical AI implementation.'
            )}
          </p>
        </div>
      </div>

      <InsightsSection onNavigate={onNavigate} onSelectInsight={onSelectInsight} />
    </div>
  );
};
