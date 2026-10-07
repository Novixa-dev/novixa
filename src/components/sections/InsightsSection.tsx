import React from 'react';
import Link from 'next/link';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { INSIGHTS } from '../../content/data';
import { BookOpen, ArrowLeft, ArrowRight, Clock } from 'lucide-react';

interface InsightsSectionProps {
  lang: Language;
  /** The /insights page renders its own page-level H1 and intro (with
   * a link back to itself that would be redundant here), so it passes
   * false to skip this section's homepage-teaser header entirely. */
  showHeader?: boolean;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  lang,
  showHeader = true,
}) => {
  const { language, isRtl, t } = createTranslator(lang);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-slate-900/60 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        {showHeader && (
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
        )}

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

    </section>
  );
};
