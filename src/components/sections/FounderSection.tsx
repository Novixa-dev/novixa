import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FOUNDER_INFO } from '../../content/data';
import { Quote, Terminal, Shield, ArrowLeft, ArrowRight } from 'lucide-react';

export const FounderSection: React.FC = () => {
  const { isRtl, t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 bg-slate-900/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Founder Quote & Philosophy */}
          <div className="lg:col-span-8 space-y-6 text-right rtl:text-right ltr:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>{t('رؤية نوڤيكسا', 'Novixa Founding Vision')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white tracking-tight">
              {t('وراء نوڤيكسا فكرة هندسية بسيطة.', 'Behind Novixa is a clear engineering mandate.')}
            </h2>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 relative space-y-3">
              <Quote className="w-8 h-8 text-blue-500 opacity-40 absolute top-4 left-4 rtl:left-4 ltr:right-4" />
              <p className="text-sm sm:text-base text-slate-200 font-arabic italic leading-relaxed pt-2">
                "{t(FOUNDER_INFO.quote.ar, FOUNDER_INFO.quote.en)}"
              </p>
              <div className="text-xs font-bold font-mono text-blue-400 pt-1">
                — {t(FOUNDER_INFO.name.ar, FOUNDER_INFO.name.en)} • {t(FOUNDER_INFO.role.ar, FOUNDER_INFO.role.en)}
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-arabic">
              {t(FOUNDER_INFO.story.ar, FOUNDER_INFO.story.en)}
            </p>
          </div>

          {/* Founder Graphic Card Placeholder */}
          <div className="lg:col-span-4 bg-slate-950 rounded-2xl p-6 border border-slate-800 text-center space-y-4">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-slate-900 mx-auto flex items-center justify-center text-white font-extrabold font-display text-2xl shadow-xl shadow-blue-900/30">
              [N]
            </div>

            <div>
              <div className="font-display font-bold text-white text-base">
                {t('فريق الهندسة والمنتجات', 'Novixa Product Team')}
              </div>
              <div className="text-xs text-slate-400 font-arabic">
                {t('الشرق الأوسط والخليج العربي', 'Middle East & GCC')}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 font-mono">
              Engineered for Scale
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
