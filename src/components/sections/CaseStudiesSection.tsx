'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { CASE_STUDIES } from '../../content/data';
import { CaseStudy } from '../../types';
import { 
  Briefcase, ArrowLeft, ArrowRight, ExternalLink, Quote, 
  CheckCircle2, Layers, Cpu, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CaseStudiesSectionProps {
  onSelectCaseStudy?: (caseStudy: CaseStudy) => void;
  /** The /work page renders its own page-level H1 and intro (with a
   * link back to itself that would be redundant here), so it passes
   * false to skip this section's homepage-teaser header entirely. */
  showHeader?: boolean;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onSelectCaseStudy,
  showHeader = true,
}) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeModalCase, setActiveModalCase] = useState<CaseStudy | null>(null);

  const handleOpenDetail = (cs: CaseStudy) => {
    if (onSelectCaseStudy) {
      onSelectCaseStudy(cs);
    }
    setActiveModalCase(cs);
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-right rtl:text-right ltr:text-left">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-mono font-medium">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{t('أعمالنا المختارة والمعمارية', 'Selected Engineering Case Studies')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
                {t('كيف نتعامل مع مشاكل تشغيلية حقيقية.', 'How we approach real operational problems.')}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t(
                  'سيناريوهات معمارية توضيحية — مبنية على مشاكل تشغيلية شائعة في هذه القطاعات — تُظهر كيف نفكر هندسيًا في تحويل التحدي إلى نظام مستقر.',
                  'Illustrative architecture scenarios — grounded in operational problems common to each sector — showing how we engineer systems end-to-end.'
                )}
              </p>
            </div>

            <Link
              href={`/${language}/work`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start md:self-auto"
            >
              <span>{t('عرض جميع الأعمال المختارة', 'Explore All Selected Work')}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Case Studies Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between gap-6 relative group"
            >
              <div className="space-y-4 text-right rtl:text-right ltr:text-left">
                {/* Meta Badge */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 text-blue-400 border border-slate-800">
                    {cs.industry[isRtl ? 'ar' : 'en']}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800">
                    {cs.caseStudyTypeLabel[isRtl ? 'ar' : 'en']}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white font-display leading-snug group-hover:text-blue-400 transition-colors">
                  <Link href={`/${language}/work/${cs.id}`}>
                    {cs.title[isRtl ? 'ar' : 'en']}
                  </Link>
                </h3>

                {/* Challenge Excerpt */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-arabic line-clamp-3">
                  {cs.challenge[isRtl ? 'ar' : 'en']}
                </p>

                {/* Metrics Highlights */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {cs.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-base sm:text-lg font-bold font-display text-blue-400">{m.value}</div>
                      <div className="text-[10px] text-slate-300 font-arabic truncate">{m.label[isRtl ? 'ar' : 'en']}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cs.technologies.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-mono text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-mono">{cs.location[isRtl ? 'ar' : 'en']}</span>

                <Link
                  href={`/${language}/work/${cs.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white transition-colors"
                >
                  <span>{t('عرض التفاصيل المعمارية', 'View Architecture Details')}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Editorial Case Study Modal */}
      <AnimatePresence>
        {activeModalCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 text-right rtl:text-right ltr:text-left relative"
            >
              <button
                onClick={() => setActiveModalCase(null)}
                className="absolute top-5 left-5 rtl:left-5 ltr:right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-950 text-blue-400 border border-slate-800">
                  {activeModalCase.industry[isRtl ? 'ar' : 'en']} • {activeModalCase.caseStudyTypeLabel[isRtl ? 'ar' : 'en']}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white">
                  {activeModalCase.title[isRtl ? 'ar' : 'en']}
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed">
                <div>
                  <div className="font-bold text-white mb-1">{t('التحدي التشغيلي:', 'The Operational Challenge:')}</div>
                  <p className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    {activeModalCase.challenge[isRtl ? 'ar' : 'en']}
                  </p>
                </div>

                <div>
                  <div className="font-bold text-white mb-1">{t('المعمارية والحل التقني:', 'The Engineered Architecture:')}</div>
                  <p className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    {activeModalCase.solution[isRtl ? 'ar' : 'en']}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Location: {activeModalCase.location[isRtl ? 'ar' : 'en']}</span>
                <Link
                  href={`/${language}/start-project`}
                  onClick={() => setActiveModalCase(null)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs"
                >
                  {t('ناقش مشروعك معنا', 'Consult on Your System')}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
