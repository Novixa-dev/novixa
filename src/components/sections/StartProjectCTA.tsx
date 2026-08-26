'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export const StartProjectCTA: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-2xl p-8 sm:p-12 border border-slate-800 bg-slate-900/60 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('ابدأ مشروعك معنا', 'Start Your Project')}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('لديك مشكلة تشغيلية تستحق نظامًا أفضل؟', 'Have an operational problem that deserves a better system?')}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t(
              'أخبرنا بما تريد بناءه، وسنساعدك على تحويل الفكرة أو المشكلة التشغيلية إلى خطة تنفيذية وهندسية واضحة خلال خمس خطوات سريعة.',
              'Tell us what you want to build — we\'ll help you turn the idea or operational problem into a clear engineering plan in five quick steps.'
            )}
          </p>

          <div className="flex justify-center pt-2">
            <Link
              href={`/${language}/start-project`}
              className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm sm:text-base font-semibold px-6 py-3 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t('ابدأ الاستكشاف الهندسي', 'Start the Discovery Wizard')}</span>
              <ArrowIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
