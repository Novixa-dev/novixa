'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { INSIGHTS } from '../../content/data';
import { InsightArticle } from '../../types';
import { BookOpen, ArrowLeft, ArrowRight, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InsightsSectionProps {
  onSelectInsight?: (article: InsightArticle) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ 
  onSelectInsight,
}) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);

  const handleOpenArticle = (art: InsightArticle) => {
    if (onSelectInsight) onSelectInsight(art);
    setActiveArticle(art);
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-900/60 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-mono font-medium">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('من مختبر نوڤيكسا', 'Novixa Engineering & Insights Lab')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
              {t('معرفة هندسية ورؤى في تقنية الأعمال.', 'Engineering insights for modern enterprise.')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t(
                'مقالات ودراسات ناتجة عن تجاربنا الميدانية في بناء النظم الرقمية وتحويل العمليات المعقدة.',
                'Field notes and architectural essays written by our product engineering team.'
              )}
            </p>
          </div>

          <Link
            href={`/${language}/insights`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start md:self-auto"
          >
            <span>{t('تصفح مكتبة المقالات بالكامل', 'Browse All Insights')}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSIGHTS.map((art) => (
            <div
              key={art.id}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between gap-6 relative group"
            >
              <div className="space-y-3 text-right rtl:text-right ltr:text-left">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-blue-400 border border-slate-800 text-[11px]">
                    {art.category[isRtl ? 'ar' : 'en']}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime[isRtl ? 'ar' : 'en']}</span>
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white font-display leading-snug group-hover:text-blue-400 transition-colors">
                  <Link href={`/${language}/insights/${art.id}`}>
                    {art.title[isRtl ? 'ar' : 'en']}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-arabic line-clamp-3">
                  {art.excerpt[isRtl ? 'ar' : 'en']}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">{art.date}</span>

                <Link
                  href={`/${language}/insights/${art.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white transition-colors"
                >
                  <span>{t('قراءة المقال', 'Read Essay')}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 text-right rtl:text-right ltr:text-left relative"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-5 left-5 rtl:left-5 ltr:right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-950 text-blue-400 border border-slate-800">
                  {activeArticle.category[isRtl ? 'ar' : 'en']} • {activeArticle.readTime[isRtl ? 'ar' : 'en']}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white">
                  {activeArticle.title[isRtl ? 'ar' : 'en']}
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed">
                {activeArticle.content[isRtl ? 'ar' : 'en'].map((paragraph, idx) => (
                  <p key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Date: {activeArticle.date}</span>
                <Link
                  href={`/${language}/start-project`}
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs"
                >
                  {t('ابدأ مشروعك معنا', 'Start Your Project')}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
