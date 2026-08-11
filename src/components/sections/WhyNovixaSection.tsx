'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Target, Compass, Layers, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const WhyNovixaSection: React.FC = () => {
  const { isRtl, t } = useLanguage();

  const differentiators = [
    {
      titleAr: 'نفكر كصنّاع منتجات',
      titleEn: 'Product Thinkers',
      descAr: 'نهتم بالنتيجة النهائية وتجربة العميل الحقيقية، وليس فقط بتنفيذ قائمة مهام مجردة.',
      descEn: 'We focus on business outcomes and real user adoption, not just checking off a features list.',
      icon: Target
    },
    {
      titleAr: 'نبدأ من المشكلة التشغيلية',
      titleEn: 'Problem-First Mindset',
      descAr: 'نحلل كواليس عمليتك التجارية أولاً لاختيار التقنية الأنسب المجدية اقتصادياً.',
      descEn: 'We dissect your operational friction before choosing technology, ensuring maximum ROI.',
      icon: Compass
    },
    {
      titleAr: 'نبني للمستقبل والتوسع',
      titleEn: 'Built for Sustainable Scale',
      descAr: 'أنظمتنا مصممة لتستوعب زيادة الفروع والزوار بمرونة ودون الحاجة لإعادة البناء.',
      descEn: 'Architectures engineered to handle multi-branch expansion without costly rewrites.',
      icon: Layers
    },
    {
      titleAr: 'إتقان التفاصيل والجودة',
      titleEn: 'Obsessive Craft & Performance',
      descAr: 'دقة متناهية في تصميم الواجهات (RTL)، الأمان، وسرعة تحميل بالملي ثانية.',
      descEn: 'Relentless polish across RTL UX, sub-second load speeds, and SOC2 security standards.',
      icon: ShieldCheck
    },
    {
      titleAr: 'شراكة دائمًا بعد الإطلاق',
      titleEn: 'Lifetime Tech Partnership',
      descAr: 'لا نتخلى عنك بعد التسليم؛ نرافق نموك بالتحديثات والصيانة المستمرة.',
      descEn: 'We don\'t disappear after launch. We back your team with active SLAs and feature upgrades.',
      icon: HeartHandshake
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-900/40 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('الفارق الجوهري', 'The Novixa Difference')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            {t('لماذا تختار نوڤيكسا لشراكتك التقنية؟', 'Why businesses trust Novixa for technology.')}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t(
              'لسنا مجرد شركة برمجة تبيع ساعات عمل. نحن شريك هندسي يتبنى أهداف شركتك ويضمن تحولها إلى واقع برمجي ناجح.',
              'We are not a body-shopping agency. We are product engineers invested in turning your operational vision into a thriving tech asset.'
            )}
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((diff, idx) => {
            const IconComp = diff.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-7 border border-slate-800 text-right rtl:text-right ltr:text-left space-y-4 relative group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 font-bold group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white font-display">
                  {t(diff.titleAr, diff.titleEn)}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-arabic">
                  {t(diff.descAr, diff.descEn)}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs text-teal-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('معيار هندسي ثابت', 'Novixa Standard')}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
