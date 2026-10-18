import React from 'react';
import Link from 'next/link';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { INSIGHTS } from '../../content/data';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';

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

  // With the section header hidden, the page supplies the h1 and these cards sit
  // directly under it, so they are h2. Under the header's own h2 they are h3.
  // A fixed h3 skipped a level on /work, /industries and /insights.
  const CardTitle = showHeader ? 'h3' : 'h2';

  return (
    <section className="py-12 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-right rtl:text-right ltr:text-left">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
                {t('معرفة هندسية ورؤى في تقنية الأعمال.', 'Engineering insights for modern enterprise.')}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
                {t(
                  'مقالات ودراسات ناتجة عن تجاربنا الميدانية في بناء النظم الرقمية وتحويل العمليات المعقدة.',
                  'Field notes and architectural essays written by our product engineering team.'
                )}
              </p>
            </div>

            <Link
              href={`/${language}/insights`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group self-start md:self-auto"
            >
              <span>{t('تصفح مكتبة المقالات بالكامل', 'Browse All Insights')}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 text-blue-600" />
            </Link>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSIGHTS.map((art) => (
            <div
              key={art.id}
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-900/5 flex flex-col justify-between gap-6 relative group transition-all duration-300"
            >
              <div className="space-y-3 text-right rtl:text-right ltr:text-left">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-200 text-[11px] font-semibold">
                    {art.category[isRtl ? 'ar' : 'en']}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-cyan-600" />
                    <span>{art.readTime[isRtl ? 'ar' : 'en']}</span>
                  </span>
                </div>

                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 font-display leading-snug group-hover:text-cyan-700 transition-colors">
                  <Link href={`/${language}/insights/${art.id}`}>
                    {art.title[isRtl ? 'ar' : 'en']}
                  </Link>
                </CardTitle>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-arabic line-clamp-3">
                  {art.excerpt[isRtl ? 'ar' : 'en']}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">{art.date}</span>

                <Link
                  href={`/${language}/insights/${art.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-900 transition-colors"
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
