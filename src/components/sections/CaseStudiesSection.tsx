'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { CASE_STUDIES } from '../../content/data';
import { CaseStudy, ViewType } from '../../types';
import { 
  Briefcase, ArrowLeft, ArrowRight, ExternalLink, Quote, 
  CheckCircle2, Layers, Cpu, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CaseStudiesSectionProps {
  onNavigate?: (view: ViewType) => void;
  onSelectCaseStudy?: (caseStudy: CaseStudy) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onNavigate, onSelectCaseStudy }) => {
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-semibold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t('أعمالنا المختارة والمعمارية', 'Selected Work Architecture')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {t('ما نبنيه يصبح واقعًا تشغيليًا.', 'What we build becomes operational reality.')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t(
                'دراسات حالة ونماذج معمارية توضح كيف حولنا المشاكل المعقدة في قطاعات متعددة إلى أنظمة سريعة تحقق عوائد حقيقية.',
                'Real-world case studies detailing how we converted complex operational bottlenecks into sleek, high-margin software.'
              )}
            </p>
          </div>

          <Link
            href={`/${language}/work`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start md:self-auto"
          >
            <span>{t('عرض جميع الأعمال المختارة', 'Explore All Selected Work')}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Case Studies Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between gap-6 relative group"
            >
              <div className="space-y-4 text-right rtl:text-right ltr:text-left">
                {/* Meta Badge */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-blue-950 text-blue-300 border border-blue-800/60">
                    {cs.industry[isRtl ? 'ar' : 'en']}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-teal-300 border border-teal-800/60">
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
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {cs.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80">
                      <div className="text-lg font-bold font-display text-teal-400">{m.value}</div>
                      <div className="text-[10px] text-slate-400 font-arabic truncate">{m.label[isRtl ? 'ar' : 'en']}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cs.technologies.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">{cs.location[isRtl ? 'ar' : 'en']}</span>

                <Link
                  href={`/${language}/work/${cs.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-white transition-colors"
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
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 text-right rtl:text-right ltr:text-left relative"
            >
              <button
                onClick={() => setActiveModalCase(null)}
                className="absolute top-5 left-5 rtl:left-5 ltr:right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-950 text-blue-300 border border-blue-800">
                  {activeModalCase.industry[isRtl ? 'ar' : 'en']} • {activeModalCase.client}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  {activeModalCase.title[isRtl ? 'ar' : 'en']}
                </h2>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeModalCase.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-2xl font-bold font-display text-teal-400">{m.value}</div>
                    <div className="text-xs text-slate-300">{m.label[isRtl ? 'ar' : 'en']}</div>
                  </div>
                ))}
              </div>

              {/* Strategy & Solution Sections */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed">
                <div>
                  <h4 className="font-bold text-white text-base font-display mb-1">{t('التحدي التشغيلي:', 'Operational Challenge:')}</h4>
                  <p>{activeModalCase.challenge[isRtl ? 'ar' : 'en']}</p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-base font-display mb-1">{t('الاستراتيجية والهندسة:', 'Strategy & Engineering:')}</h4>
                  <p>{activeModalCase.strategy[isRtl ? 'ar' : 'en']}</p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-base font-display mb-1">{t('الميزات التي تم تنفيذها:', 'Delivered Features:')}</h4>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {activeModalCase.features[isRtl ? 'ar' : 'en'].map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {activeModalCase.quote && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-blue-900/50 space-y-2">
                    <Quote className="w-5 h-5 text-blue-400 opacity-60" />
                    <p className="italic text-slate-200">{activeModalCase.quote.text[isRtl ? 'ar' : 'en']}</p>
                    <div className="text-xs text-blue-400 font-bold font-mono">
                      — {activeModalCase.quote.author} ({activeModalCase.quote.role[isRtl ? 'ar' : 'en']})
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveModalCase(null)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all"
                >
                  {t('إغلاق التفاصيل', 'Close Details')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
