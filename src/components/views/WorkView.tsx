import React from 'react';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { CaseStudiesSection } from '../sections/CaseStudiesSection';

export const WorkView = ({ lang }: { lang: Language }) => {
  const { t } = createTranslator(lang);

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-12">
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
            <span>{t('سيناريوهات معمارية توضيحية', 'Illustrative Architecture Scenarios')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('كيف نحول مشكلة تشغيلية إلى نظام.', 'How an operational problem becomes a system.')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
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
