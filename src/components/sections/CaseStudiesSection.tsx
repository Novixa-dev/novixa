import React from 'react';
import Link from 'next/link';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { CASE_STUDIES } from '../../content/data';
import {
  Briefcase,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

interface CaseStudiesSectionProps {
  lang: Language;
  /** The /work page renders its own page-level H1 and intro (with a
   * link back to itself that would be redundant here), so it passes
   * false to skip this section's homepage-teaser header entirely. */
  showHeader?: boolean;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
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
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden border-t border-slate-900/80">
      {/* Background subtle architectural grid */}
      <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-right rtl:text-right ltr:text-left">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-mono font-medium">
                <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                <span>{t('أعمالنا ونماذجنا المعمارية', 'Selected Engineering Case Studies')}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
                {t('كيف نتعامل مع المشاكل التشغيلية المعقدة.', 'How we engineer solutions for real operational hurdles.')}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-arabic">
                {t(
                  'سيناريوهات معمارية توضيحية — مبنية على متطلبات تشغيلية دقيقة في قطاعات الأعمال الحيوية — تُظهر منهجيتنا الهندسية في تحويل التعقيد إلى استقرار.',
                  'Illustrative architecture scenarios grounded in real operational constraints across vital enterprise sectors — showing our methodology end-to-end.'
                )}
              </p>
            </div>

            <Link
              href={`/${language}/work`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start md:self-auto group"
            >
              <span>{t('عرض جميع الأعمال المختارة', 'Explore All Selected Work')}</span>
              <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        )}

        {/* Case Studies Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs, idx) => (
            <div
              key={cs.id}
              className="glass-card rounded-2xl p-6 sm:p-7 border border-white/[0.08] bg-slate-900/60 hover:border-blue-500/40 transition-colors duration-300 flex flex-col justify-between gap-6 relative group"
            >
              <div className="space-y-4 text-right rtl:text-right ltr:text-left">
                {/* Meta Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-300 bg-slate-950 border border-white/[0.06] px-2 py-0.5 rounded">
                      ARCH-0{idx + 1}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-blue-950/70 text-blue-300 border border-blue-900/60">
                      {cs.industry[isRtl ? 'ar' : 'en']}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-white/[0.06]">
                    {cs.caseStudyTypeLabel[isRtl ? 'ar' : 'en']}
                  </span>
                </div>

                {/* Title */}
                <CardTitle className="text-base sm:text-lg font-bold text-white font-display leading-snug group-hover:text-blue-300 transition-colors">
                  <Link href={`/${language}/work/${cs.id}`}>
                    {cs.title[isRtl ? 'ar' : 'en']}
                  </Link>
                </CardTitle>

                {/* Challenge Excerpt */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-arabic line-clamp-3">
                  {cs.challenge[isRtl ? 'ar' : 'en']}
                </p>

                {/* Metrics Highlights — explicitly modelled, not measured.
                    The card's type badge says "Product Demonstration" /
                    "Concept Architecture"; without a marker on the figures
                    themselves a reader takes them for client results. */}
                <div className="text-[10px] font-mono text-slate-400 pt-1 uppercase tracking-wide">
                  {t('أرقام توضيحية للسيناريو', 'Modelled scenario figures')}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {cs.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx} className="p-3 bg-slate-950/90 rounded-xl border border-white/[0.06]">
                      <div className="text-base sm:text-lg font-bold font-display text-blue-400">{m.value}</div>
                      <div className="text-[11px] text-slate-300 font-arabic truncate mt-0.5">{m.label[isRtl ? 'ar' : 'en']}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cs.technologies.slice(0, 4).map((tech, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-slate-300 bg-slate-950 border border-white/[0.06] px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
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

    </section>
  );
};
