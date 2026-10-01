import React from 'react';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { FOUNDER_INFO } from '../../content/data';
import { Quote, Terminal } from 'lucide-react';

export const FounderSection = ({ lang }: { lang: Language }) => {
  const { t } = createTranslator(lang);

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 bg-slate-900/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Founder Quote & Philosophy */}
          <div className="lg:col-span-8 space-y-5 text-right rtl:text-right ltr:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-blue-400 text-xs font-mono font-medium">
              <Terminal className="w-3.5 h-3.5" />
              <span>{t('رؤية نوڤيكسا الهندسية', 'Novixa Engineering Mandate')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight leading-snug">
              {t('وراء نوڤيكسا فكرة هندسية واضحة.', 'Behind Novixa is a clear engineering mandate.')}
            </h2>

            <div className="p-5 sm:p-6 rounded-xl bg-slate-950 border border-slate-800 relative space-y-3">
              <Quote className="w-6 h-6 text-blue-500 opacity-30 absolute top-4 left-4 rtl:left-4 ltr:right-4" />
              <p className="text-sm sm:text-base text-slate-200 font-arabic italic leading-relaxed pt-1">
                {t('«', '"')}{t(FOUNDER_INFO.quote.ar, FOUNDER_INFO.quote.en)}{t('»', '"')}
              </p>
              <div className="text-xs font-semibold font-mono text-blue-400 pt-1">
                — {t(FOUNDER_INFO.name.ar, FOUNDER_INFO.name.en)} • {t(FOUNDER_INFO.role.ar, FOUNDER_INFO.role.en)}
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-arabic">
              {t(FOUNDER_INFO.story.ar, FOUNDER_INFO.story.en)}
            </p>
          </div>

          {/* Founder Graphic Card */}
          <div className="lg:col-span-4 bg-slate-950 rounded-xl p-6 border border-slate-800 text-center space-y-4">
            <div className="w-20 h-20 rounded-xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-blue-400 font-extrabold font-display text-2xl shadow-inner">
              [N]
            </div>

            <div>
              <div className="font-display font-bold text-white text-base">
                {t('فريق الهندسة والمنتجات', 'Novixa Engineering Core')}
              </div>
              <div className="text-xs text-slate-400 font-arabic">
                {t('الشرق الأوسط والخليج العربي', 'Middle East & Global Hub')}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              Engineered for Enterprise Reliability
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
