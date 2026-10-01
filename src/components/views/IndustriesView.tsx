import React from 'react';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { IndustriesSection } from '../sections/IndustriesSection';

export const IndustriesView = ({ lang }: { lang: Language }) => {
  const { t } = createTranslator(lang);

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-12">
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-teal-300 text-xs font-semibold">
            <span>{t('تخصصات القطاعات التجارية', 'Vertical Industry Solutions')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('خبرة هندسية موجهة لقطاعك بالتحديد.', 'Domain-Specific Engineering Built for Your Industry.')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
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
