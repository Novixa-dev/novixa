import React from 'react';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { Target, Compass, Layers, ShieldCheck, HeartHandshake, Code2, CheckCircle2 } from 'lucide-react';

export const WhyNovixaSection = ({ lang }: { lang: Language }) => {
  const { t } = createTranslator(lang);

  const differentiators = [
    {
      titleAr: 'نفكر كصنّاع منتجات',
      titleEn: 'Product Thinkers',
      descAr: 'نهتم بالنتيجة النهائية وتجربة العميل الحقيقية ونمو الإيرادات، وليس فقط بتنفيذ قائمة مهام مجردة.',
      descEn: 'We focus on business outcomes, user adoption, and revenue growth—not just checking off a task list.',
      icon: Target
    },
    {
      titleAr: 'نبدأ من المشكلة التشغيلية',
      titleEn: 'Problem-First Mindset',
      descAr: 'نحلل كواليس عمليتك التجارية ونقاط الاحتكاك اليومية أولاً لاختيار المعمارية الأنسب والمجدية اقتصادياً.',
      descEn: 'We dissect your operational friction before choosing technology, ensuring maximum ROI.',
      icon: Compass
    },
    {
      titleAr: 'نبني للتوسع والاستدامة',
      titleEn: 'Built for Sustainable Scale',
      descAr: 'أنظمتنا مصممة لتستوعب زيادة الفروع والزوار والمستأجرين بمرونة عالية ودون الحاجة لإعادة البناء.',
      descEn: 'Architectures engineered to handle multi-branch and high-concurrency expansion without costly rewrites.',
      icon: Layers
    },
    {
      titleAr: 'إتقان التفاصيل والجودة',
      titleEn: 'Obsessive Craft & Performance',
      descAr: 'دقة متناهية في تجربة المستخدم العربية (RTL)، معايير الأمان، وسرعة استجابة فائقة بالملي ثانية.',
      descEn: 'Relentless polish across RTL UX, fast response times, and enterprise-grade security practices.',
      icon: ShieldCheck
    },
    {
      titleAr: 'ملكية تامة للأكواد والمعمارية',
      titleEn: 'Full Code Ownership & IP',
      descAr: 'نسلمك مستودعات الكود بالكامل مع توثيق تقني معماري شامل، دون أي قيود أو احتكار للمنصة.',
      descEn: 'Complete repository access, comprehensive architectural documentation, and zero vendor lock-in.',
      icon: Code2
    },
    {
      titleAr: 'شراكة والتزام مستمر',
      titleEn: 'Lifetime Tech Partnership',
      descAr: 'لا نتخلى عنك بعد التسليم؛ نرافق نمو أعمالك بالصيانة، اتفاقيات مستوى الخدمة (SLA)، والتحديثات المستمرة.',
      descEn: 'We don\'t disappear after launch. We back your operations with active SLAs and continuous upgrades.',
      icon: HeartHandshake
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-900/40 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-mono font-medium">
            <span>{t('الفارق الجوهري', 'The Engineering Discipline')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('لماذا تختار نوڤيكسا لشراكتك التقنية؟', 'Why enterprises partner with Novixa.')}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t(
              'لسنا مجرد شركة برمجة تبيع ساعات عمل. نحن فريق هندسي متكامل يتبنى أهداف أعمالك ويحولها إلى أصول تقنية مستدامة.',
              'We are not a body-shopping agency. We are product engineers invested in turning your operational vision into a robust technical asset.'
            )}
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((diff, idx) => {
            const IconComp = diff.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 border border-slate-800 text-right rtl:text-right ltr:text-left space-y-4 relative group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 font-bold">
                  <IconComp className="w-5 h-5" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  {t(diff.titleAr, diff.titleEn)}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-arabic">
                  {t(diff.descAr, diff.descEn)}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs text-blue-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('معيار هندسي ثابت', 'Novixa Engineering Standard')}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
