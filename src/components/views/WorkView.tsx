import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CASE_STUDIES } from '../../content/data';
import { ViewType, CaseStudy } from '../../types';
import { CaseStudiesSection } from '../sections/CaseStudiesSection';

interface WorkViewProps {
  onNavigate: (view: ViewType) => void;
  onSelectCaseStudy?: (caseStudy: CaseStudy) => void;
}

export const WorkView: React.FC<WorkViewProps> = ({ onNavigate, onSelectCaseStudy }) => {
  const { isRtl, t } = useLanguage();

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-12">
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
            <span>{t('معرض الأعمال ودراسات الحالة', 'Selected Case Studies Portfolio')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            {t('نتائج حقيقية ونظم تعمل في الميدان.', 'Real Results & Systems Live in Production.')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {t(
              'اطلع على التفاصيل الهندسية والاستراتيجيات التي اعتمدناها لتحويل التحديات المعقدة لشركائنا إلى نجاحات تشغيلية.',
              'Detailed engineering breakdowns and operational results across gaming, healthcare, and logistics verticals.'
            )}
          </p>
        </div>
      </div>

      <CaseStudiesSection onNavigate={onNavigate} onSelectCaseStudy={onSelectCaseStudy} />
    </div>
  );
};
