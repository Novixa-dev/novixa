import React from 'react';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { IndustriesSection } from '../sections/IndustriesSection';

export const IndustriesView = ({ lang }: { lang: Language }) => {
  const { t } = createTranslator(lang);

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Lighting & Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-12">
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold shadow-sm">
            <span>{t('تخصصات القطاعات التجارية', 'Vertical Industry Solutions')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {t('خبرة هندسية موجهة لقطاعك بالتحديد.', 'Domain-Specific Engineering Built for Your Industry.')}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-arabic leading-relaxed">
            {t(
              'كل قطاع يمتلك قواعد عمل وتحديات فريدة. نحن نصمم حلولنا وفقًا لمنطق تشغيل قطاعك.',
              'Every industry has distinct operational nuances. We build custom software adapted to your domain rules.'
            )}
          </p>
        </div>
      </div>

      <IndustriesSection showHeader={false} />
    </div>
  );
};
