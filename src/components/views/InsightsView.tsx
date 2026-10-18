import React from 'react';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { InsightsSection } from '../sections/InsightsSection';

export const InsightsView = ({ lang }: { lang: Language }) => {
  const { t } = createTranslator(lang);

  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Lighting & Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-12">
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {t('رؤى وأبعاد هندسية في بناء النظم الرقمية.', 'Insights & Essays on Digital System Engineering.')}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
            {t(
              'مقالات وتجارب ميدانية توضح كيفية بناء المنتجات الرقمية الحديثة والفرق بين الحلول الجاهزة والنظم المخصصة.',
              'Field notes exploring multi-tenant architecture, custom vs SaaS trade-offs, and workflow automation.'
            )}
          </p>
        </div>
      </div>

      <InsightsSection lang={lang} showHeader={false} />
    </div>
  );
};
