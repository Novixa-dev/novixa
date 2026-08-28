'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Network, Blocks, Workflow, Globe2, ArrowLeft, ArrowRight, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const CompanyGrowthStory: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const steps = [
    {
      id: 1,
      icon: Network,
      titleAr: 'حلول القطاعات المخصصة',
      titleEn: 'Sector-Specific Engineering',
      descAr: 'هندسة منصات وحلول تشغيلية مصممة خصيصًا لتحديات الأعمال المعقدة في الضيافة، الصحة، العقار، والتجارة.',
      descEn: 'Bespoke operational engines solving high-friction challenges across hospitality, healthcare, and commerce.',
      badgeAr: 'المرحلة 01: حلول ميدانية',
      badgeEn: 'Stage 01: Domain Solvers',
      color: 'blue'
    },
    {
      id: 2,
      icon: Blocks,
      titleAr: 'النواة الهندسية المشتركة',
      titleEn: 'Reusable Engineering Core',
      descAr: 'استخلاص الأنماط والوحدات الناجحة إلى بنية تحتية ومكتبات برمجية قابلة لإعادة الاستخدام بأعلى كفاءة وأمان.',
      descEn: 'Extracting verified architectural patterns into high-performance, modular internal technology foundations.',
      badgeAr: 'المرحلة 02: كفاءة تسريع',
      badgeEn: 'Stage 02: Core Asset',
      color: 'teal'
    },
    {
      id: 3,
      icon: Workflow,
      titleAr: 'منتجات B2B SaaS مملوكة',
      titleEn: 'Proprietary B2B SaaS Platforms',
      descAr: 'إطلاق منتجات سحابية مملوكة للشركة تحل مشاكل قطاعية متكررة وتولد إيرادات مستدامة وقيمة استثمارية.',
      descEn: 'Launching multi-tenant cloud platforms that solve repeatable operational hurdles with recurring enterprise value.',
      badgeAr: 'المرحلة 03: منتجات رقمية',
      badgeEn: 'Stage 03: Product Scale',
      color: 'indigo'
    },
    {
      id: 4,
      icon: Globe2,
      titleAr: 'التوسع الخليجي والعالمي',
      titleEn: 'Regional & Global Expansion',
      descAr: 'توسيع نطاق المنتجات والخدمات الهندسية من اليمن والسعودية لتشمل أسواق الخليج والأسواق العالمية.',
      descEn: 'Scaling mature products and technical services from Yemen and Saudi Arabia across the GCC and global markets.',
      badgeAr: 'المرحلة 04: انتشار مستدام',
      badgeEn: 'Stage 04: Global Reach',
      color: 'emerald'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#030712] relative border-t border-slate-800/80 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[450px] bg-radial-gradient pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-mono font-medium tracking-wide">
            <Layers className="w-3.5 h-3.5" />
            <span>{t('مسار وتوجه نوڤيكسا الاستراتيجي', 'The Novixa Strategic Trajectory')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('من هندسة الحلول إلى ابتكار المنتجات السحابية.', 'From Custom Engineering to Scalable Digital Products.')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-arabic leading-relaxed">
            {t(
              'نحن لسنا مجرد وكالة لتنفيذ ساعات تطويرية؛ نموذج عملنا مبني على تحويل الخبرة البرمجية العميقة إلى منتجات سحابية (SaaS) مملوكة وقابلة للتوسع محليًا وإقليميًا.',
              'We are not a conventional agency. Our engineering model extracts deep domain problem-solving into reusable core architectures, evolving into proprietary B2B SaaS platforms built for long-term scale.'
            )}
          </p>
        </div>

        {/* Roadmap Trajectory Cards */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-px bg-gradient-to-r from-blue-500/20 via-teal-500/30 to-emerald-500/20 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div 
                  key={step.id} 
                  className="glass-card p-6 sm:p-7 rounded-2xl border border-slate-800 text-right rtl:text-right ltr:text-left relative group hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon & Step Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border bg-slate-950/90 shadow-sm
                        ${step.color === 'blue' ? 'border-blue-500/40 text-blue-400' : ''}
                        ${step.color === 'teal' ? 'border-teal-500/40 text-teal-400' : ''}
                        ${step.color === 'indigo' ? 'border-indigo-500/40 text-indigo-400' : ''}
                        ${step.color === 'emerald' ? 'border-emerald-500/40 text-emerald-400' : ''}
                      `}>
                        <IconComp className="w-5 h-5" />
                      </div>

                      <span className="text-3xl font-black font-display text-slate-500 group-hover:text-slate-400 transition-colors">
                        0{step.id}
                      </span>
                    </div>

                    {/* Step Stage Badge */}
                    <div className="mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                        {t(step.badgeAr, step.badgeEn)}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {t(step.titleAr, step.titleEn)}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed">
                      {t(step.descAr, step.descEn)}
                    </p>
                  </div>

                  {/* Arrow Indicator (Mobile) */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-6 pt-4 border-t border-slate-800/40">
                      <ArrowIcon className="w-4 h-4 text-slate-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <Link
            href={`/${language}/about`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>{t('تعرف على فلسفة نوڤيكسا وفريق القيادة', 'Learn more about Novixa engineering vision')}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
