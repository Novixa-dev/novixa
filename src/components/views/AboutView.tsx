'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ViewType } from '../../types';
import { BRAND_INFO, FOUNDER_INFO } from '../../content/data';
import { FounderSection } from '../sections/FounderSection';
import { WhyNovixaSection } from '../sections/WhyNovixaSection';
import { Shield, Sparkles, CheckCircle2, Terminal, Award, Target, Heart } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: ViewType) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const { isRtl, t } = useLanguage();

  const values = [
    {
      titleAr: 'الإتقان والحرَفية (Craft)',
      titleEn: 'Craft & Precision',
      descAr: 'نصمم ونكتب البرمجيات بعناية فائقة، بدءًا من سرعة الاستجابة وحتى جودة خطوط الكود.',
      descEn: 'Obsessive attention to UI polish, clean architecture, and sub-second performance.'
    },
    {
      titleAr: 'الوضوح والشفافية (Clarity)',
      titleEn: 'Clarity & Honesty',
      descAr: 'تواصل مباشر وصريح دون مصطلحات هلامية أو وعود زرقاء غير واقعية.',
      descEn: 'Transparent updates, weekly demos, and honest engineering consultations.'
    },
    {
      titleAr: 'روح الملكية (Ownership)',
      titleEn: 'Product Ownership',
      descAr: 'نتعامل مع مشروعك وكأنه منتجنا الخاص؛ نهتم بالأرباح وتجربة المستخدم.',
      descEn: 'We treat your product as our own asset, prioritizing business outcomes.'
    },
    {
      titleAr: 'الاستدامة والاعتمادية (Reliability)',
      titleEn: 'High Reliability',
      descAr: 'أنظمتنا مصممة لتعمل باستقرار تام دون توقف مفاجئ في أوقات الذروة.',
      descEn: 'Zero-downtime architecture built to handle peak traffic effortlessly.'
    },
    {
      titleAr: 'التطوير المستمر (Continuous Growth)',
      titleEn: 'Continuous Improvement',
      descAr: 'نرافق نمو أعمالك بالتحديثات والتحسينات الدورية بعد الإطلاق.',
      descEn: 'Active SLAs and feature updates matching your evolving strategy.'
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#030712] min-h-screen space-y-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Minimalist Hero */}
        <div className="space-y-6 text-right rtl:text-right ltr:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono font-medium tracking-wide">
            {t('بيان نوڤيكسا', 'The Novixa Manifesto')}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
            {t('نحن مهندسون، لسنا وكالة.', 'We are Engineers. Not an Agency.')}
          </h1>
          <div className="w-20 h-1 bg-blue-600 rounded-full mt-6 mb-8"></div>
          <p className="text-slate-300 text-lg sm:text-xl font-arabic leading-relaxed max-w-2xl">
            {t(
              'تأسست نوڤيكسا على مبدأ واحد: البرمجيات العظيمة لا تُبنى عن طريق قوالب جاهزة أو فرق خارجية رخيصة. إنها تتطلب حِرفية هندسية، فهماً عميقاً للأعمال، والتزاماً لا يتزعزع بالجودة والأداء.',
              'Novixa was founded on a singular principle: Great software is not built with off-the-shelf templates or outsourced commodity teams. It requires engineering craft, deep domain expertise, and an unwavering commitment to performance.'
            )}
          </p>
        </div>

        {/* Values List (Architectural Layout) */}
        <div className="pt-16 border-t border-slate-800/60 space-y-12">
          <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest text-right rtl:text-right ltr:text-left">
            {t('المبادئ الهندسية الأساسية', 'Core Engineering Tenets')}
          </h2>

          <div className="space-y-12 text-right rtl:text-right ltr:text-left">
            {values.map((v, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start group">
                <div className="md:col-span-3">
                  <div className="text-3xl font-black font-display text-slate-800 transition-colors group-hover:text-blue-600">
                    0{idx + 1}
                  </div>
                </div>
                <div className="md:col-span-9 space-y-3">
                  <h3 className="text-2xl font-bold font-display text-white">{t(v.titleAr, v.titleEn)}</h3>
                  <p className="text-base sm:text-lg text-slate-400 font-arabic leading-relaxed max-w-2xl">{t(v.descAr, v.descEn)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="border-t border-slate-800/50 pt-24 bg-slate-950">
        <WhyNovixaSection />
        <FounderSection />
      </div>
    </div>
  );
};
