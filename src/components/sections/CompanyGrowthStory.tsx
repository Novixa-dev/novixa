'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Network, Blocks, Workflow, Globe2, ArrowLeft, ArrowRight } from 'lucide-react';

export const CompanyGrowthStory: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const steps = [
    {
      id: 1,
      icon: Network,
      titleAr: 'حلول القطاعات',
      titleEn: 'Sector Solutions',
      descAr: 'هندسة منصات وحلول تشغيلية مصممة خصيصًا لتحديات الأعمال المعقدة.',
      descEn: 'Engineering bespoke platforms tailored for complex sector-specific operational friction.',
      color: 'blue'
    },
    {
      id: 2,
      icon: Blocks,
      titleAr: 'النواة الهندسية',
      titleEn: 'Reusable Engineering Core',
      descAr: 'تحويل الحلول الناجحة إلى بنية تحتية ومكتبات برمجية قابلة لإعادة الاستخدام بأعلى كفاءة.',
      descEn: 'Extracting successful architectures into highly efficient, reusable internal technology cores.',
      color: 'teal'
    },
    {
      id: 3,
      icon: Workflow,
      titleAr: 'منتجات SaaS',
      titleEn: 'Proprietary B2B SaaS',
      descAr: 'إطلاق منتجات سحابية مملوكة للشركة تحل مشاكل مشتركة وتولد إيرادات مستدامة.',
      descEn: 'Launching proprietary multi-tenant cloud products generating sustainable recurring revenue.',
      color: 'indigo'
    },
    {
      id: 4,
      icon: Globe2,
      titleAr: 'التوسع العالمي',
      titleEn: 'Global Expansion',
      descAr: 'توسيع نطاق المنتجات والخدمات لتشمل أسواق الخليج والأسواق العالمية.',
      descEn: 'Scaling proven products and engineering services across the GCC and global markets.',
      color: 'emerald'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#030712] relative border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono font-medium tracking-wide">
            {t('خارطة طريق نوڤيكسا', 'The Novixa Trajectory')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            {t('من هندسة الحلول إلى ابتكار المنتجات.', 'From Custom Engineering to Global Products.')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-arabic leading-relaxed">
            {t(
              'نحن لسنا مجرد وكالة تطوير. نموذج عملنا يعتمد على تراكم الخبرة الهندسية لتحويل التحديات التشغيلية إلى منتجات سحابية (SaaS) قابلة للتوسع محليًا وعالميًا.',
              'We are not a traditional agency. Our model extracts deep sector expertise into reusable technology cores, scaling them into proprietary B2B SaaS platforms for global markets.'
            )}
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-slate-800 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div key={step.id} className="glass-card p-6 rounded-2xl border border-slate-800 text-right rtl:text-right ltr:text-left relative group hover:bg-slate-900/80 transition-colors">
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-6 rtl:left-6 ltr:right-6 text-4xl font-black font-display text-slate-800/40 group-hover:text-slate-800/70 transition-colors">
                    0{step.id}
                  </div>

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border bg-slate-950
                    ${step.color === 'blue' ? 'border-blue-500/30 text-blue-400' : ''}
                    ${step.color === 'teal' ? 'border-teal-500/30 text-teal-400' : ''}
                    ${step.color === 'indigo' ? 'border-indigo-500/30 text-indigo-400' : ''}
                    ${step.color === 'emerald' ? 'border-emerald-500/30 text-emerald-400' : ''}
                  `}>
                    <IconComp className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold font-display text-white mb-2">{t(step.titleAr, step.titleEn)}</h3>
                  <p className="text-sm text-slate-400 font-arabic leading-relaxed">
                    {t(step.descAr, step.descEn)}
                  </p>

                  {/* Arrow Indicator (Mobile/Tablet) */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-6">
                      <ArrowIcon className="w-5 h-5 text-slate-700" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
