import React from 'react';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { CaseStudiesSection } from '../sections/CaseStudiesSection';

export const WorkView = ({ lang }: { lang: Language }) => {
  const { t } = createTranslator(lang);

  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Lighting & Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-12">
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {t('كيف نحول مشكلة تشغيلية إلى نظام.', 'How an operational problem becomes a system.')}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
            {t(
              'هذه سيناريوهات توضيحية مبنية على مشاكل تشغيلية شائعة في هذه القطاعات — وليست شهادات عملاء موثقة — تُظهر منهجيتنا الهندسية من التحدي إلى الحل. كل سيناريو مصنّف بوضوح (عرض توضيحي، معمارية مفاهيمية، أو نموذج هندسي أولي).',
              'These are illustrative scenarios grounded in operational problems common to each sector — not verified client testimonials — showing our engineering approach from challenge to solution. Each one is clearly labeled (Product Demonstration, Concept Architecture, or Engineering Prototype).'
            )}
          </p>
        </div>
      </div>

      <CaseStudiesSection lang={lang} showHeader={false} />
    </div>
  );
};
