import React from 'react';
import Link from 'next/link';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { ArrowLeft, ArrowRight, Sparkles, LayoutGrid, Clock, ShieldCheck, MessageSquare } from 'lucide-react';

export const HomeCTASection = ({ lang }: { lang: Language }) => {
  const { language, isRtl, t } = createTranslator(lang);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 lg:py-32 bg-[#0B1726] relative overflow-hidden border-t border-slate-800">
      {/* Background Accent Glow & Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 border border-cyan-500/30 bg-gradient-to-b from-slate-900/95 to-[#0B1726] text-center space-y-8 shadow-2xl shadow-cyan-950/50 relative">
          
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/70 text-cyan-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('شراكة تقنية موثوقة للأعمال', 'Practical Software Partnership')}</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug max-w-3xl mx-auto">
            {t('جاهز لبناء نظامك البرمجي أو إطلاق حلك الجاهز؟', 'Ready to engineer your custom software or launch a ready solution?')}
          </h2>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-arabic">
            {t(
              'تحدث مباشرة مع فريقنا الهندسي لمناقشة متطلبات مشروعك، التحديات التشغيلية، واختيار المسار الأمثل بين البناء المخصص أو التهيئة السريعة خلال 5 إلى 14 يوماً فقط.',
              'Connect directly with our engineering team to discuss your operational challenges, roadmap, and choose between custom engineering or fast turnkey launch in 5–14 days.'
            )}
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href={`/${language}/contact`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-slate-900 border border-[#38BDF8] hover:border-cyan-300 text-[#38BDF8] text-sm sm:text-base font-bold px-9 py-4 rounded-xl shadow-xl shadow-cyan-950/60 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="text-[#38BDF8]">{t('ابدأ مشروعك الهندسي الآن', 'Start Your Engineering Project')}</span>
              <ArrowIcon className="w-4 h-4 text-[#38BDF8]" />
            </Link>

            <Link
              href={`/${language}/solutions`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900/90 hover:bg-slate-800/90 border border-[#38BDF8]/40 hover:border-[#38BDF8] text-[#38BDF8] text-sm sm:text-base font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4 text-[#38BDF8]" />
              <span className="text-[#38BDF8]">{t('استكشف كتالوج الحلول الجاهزة', 'Explore Ready Solutions')}</span>
            </Link>
          </div>

          {/* Trust Guarantee Indicators */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-arabic text-slate-300">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{t('رد وتقييم هندسي خلال 24 ساعة', 'Direct triage within 24h')}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t('اتفاقية سرية بيانات كاملة (NDA)', 'Full Mutual NDA Available')}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>{t('نقاش مباشر مع مهندسين كبار', 'Direct talk with Senior Engineers')}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

