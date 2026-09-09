'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

export const HomeCTASection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-2xl p-8 sm:p-12 border border-slate-800 bg-slate-900/80 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('شراكة هندسية مستدامة', 'Engineering Partnership')}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('جاهز لبناء منصة رقمية مستقرة تنقل أعمالك إلى المستوى التالي؟', 'Ready to engineer a scalable digital platform for your enterprise?')}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-arabic">
            {t(
              'تواصل مباشرة مع مهندسينا ومستشارينا لمناقشة متطلبات مشروعك، التحديات الفنية، ووضع خارطة طريق تنفيذية بدقة.',
              'Connect directly with our senior software architects to review your technical roadmap, requirements, and execution plan.'
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href={`/${language}/contact`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm sm:text-base font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>{t('تواصل معنا', 'Contact Us')}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>

            <Link
              href={`/${language}/start-project`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-xl transition-all duration-200"
            >
              <span>{t('معالج التقييم المعماري', 'Architectural Wizard')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
