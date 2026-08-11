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
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
            <span>{t('عن نوڤيكسا والقيم', 'About Novixa & Core Values')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            {t('شركة هندسة برمجيات تضع نتائج أعمالك أولاً.', 'A software engineering company focused on real business outcomes.')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {t(
              'تأسست نوڤيكسا لتقديم بديل متقدم وموثوق للشركات المتنامية عبر دمج التفكير التجاري والخبرة البرمجية المعتمدة.',
              'Novixa was created to provide ambitious companies with a mature, reliable tech partner blending strategic acumen with software craft.'
            )}
          </p>
        </div>

        {/* Values Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-display text-white text-right rtl:text-right ltr:text-left">
            {t('قيمنا الهندسية والثابتة:', 'Our Core Engineering Values:')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-right rtl:text-right ltr:text-left">
            {values.map((v, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center font-bold text-xs font-mono">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold font-display text-white">{t(v.titleAr, v.titleEn)}</h3>
                <p className="text-xs text-slate-300 font-arabic leading-relaxed">{t(v.descAr, v.descEn)}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <WhyNovixaSection />
      <FounderSection />
    </div>
  );
};
