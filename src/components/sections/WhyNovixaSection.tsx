import React from 'react';
import Image from 'next/image';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { Target, Compass, Layers, ShieldCheck, HeartHandshake, Code2, CheckCircle2, GitBranch } from 'lucide-react';
import { Reveal, RevealCard, RevealGroup } from '@/components/ui/Reveal';

export const WhyNovixaSection = ({ lang }: { lang: Language }) => {
  const { t } = createTranslator(lang);

  const differentiators = [
    {
      num: '01',
      titleAr: 'نفكر كصنّاع منتجات وليس مجرد منفذين',
      titleEn: 'Product Thinkers, Not Code Monkeys',
      descAr: 'نهتم بالنتيجة النهائية وتجربة العميل الحقيقية ونمو الإيرادات التشغيلية، وليس فقط بتنفيذ قائمة مهام مجردة دون فهم الجدوى.',
      descEn: 'We focus on business outcomes, user adoption, and revenue growth—not just checking off a task list.',
      icon: Target
    },
    {
      num: '02',
      titleAr: 'نبدأ دائماً من تفكيك المشكلة التشغيلية',
      titleEn: 'Problem-First Operational Mindset',
      descAr: 'نحلل كواليس عمليتك التجارية ونقاط الاحتكاك اليومية أولاً لاختيار المعمارية الأنسب والمجدية اقتصادياً وتقنياً.',
      descEn: 'We dissect your operational friction before choosing technology, ensuring maximum ROI.',
      icon: Compass
    },
    {
      num: '03',
      titleAr: 'نبني أنظمة قابلة للتوسع والاستدامة',
      titleEn: 'Built for Sustainable Scale',
      descAr: 'أنظمتنا مصممة لتستوعب زيادة الفروع والزوار والمستأجرين بمرونة عالية ودون الحاجة لإعادة البناء عند النمو.',
      descEn: 'Architectures engineered to handle multi-branch and high-concurrency expansion without costly rewrites.',
      icon: Layers
    },
    {
      num: '04',
      titleAr: 'إتقان التفاصيل ودقة التجربة العربية (RTL)',
      titleEn: 'Obsessive Arabic RTL Craft & Speed',
      descAr: 'دقة متناهية في تجربة المستخدم العربية الأصيلة، معايير الأمان الصارمة، وسرعة استجابة فائقة تُقاس بالملي ثانية.',
      descEn: 'Relentless polish across RTL UX, fast response times, and enterprise-grade security practices.',
      icon: ShieldCheck
    },
    {
      num: '05',
      titleAr: 'ملكية تامة للكود المصدري بدون احتكار',
      titleEn: '100% Full Code Ownership & IP',
      descAr: 'نسلمك مستودعات الكود بالكامل مع توثيق تقني معماري شامل، دون أي قيود أو اشتراطات احتكارية تمنعك من التطوير.',
      descEn: 'Complete repository access, comprehensive architectural documentation, and zero vendor lock-in.',
      icon: Code2
    },
    {
      num: '06',
      titleAr: 'شراكة والتزام مستمر بعد الإطلاق (SLA)',
      titleEn: 'Lifetime Tech Partnership & SLA',
      descAr: 'لا نتخلى عنك بعد التسليم؛ نرافق نمو أعمالك بالصيانة، اتفاقيات مستوى الخدمة (SLA)، والتحديثات المستمرة لخوادمك.',
      descEn: 'We don\'t disappear after launch. We back your operations with active SLAs and continuous upgrades.',
      icon: HeartHandshake
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] border-y border-slate-200/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        
        {/* Header */}
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
              {t('لماذا تختار نوڤيكسا لشراكتك التقنية؟', 'Why enterprises partner with Novixa.')}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic max-w-2xl mx-auto">
              {t(
                'لسنا مجرد شركة برمجة تبيع ساعات عمل غير محددة. نحن شريك هندسي متكامل يتبنى أهداف أعمالك ويحولها إلى أصول برمجية وتشغيلية تخدم نموك المستدام.',
                'We are not a body-shopping agency. We are product engineers invested in turning your operational vision into a robust technical asset.'
              )}
            </p>
          </div>
        </Reveal>

        {/* Enterprise Technical Partnership Visual Showcase */}
        <RevealCard delay={0.06} className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-[0_12px_40px_-10px_rgba(15,23,42,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-right rtl:text-right ltr:text-left">
          
          {/* Images Grid (Handshake & Corporate Architecture) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group h-64 sm:h-72">
              <Image
                src="/images/partnerships/partnership-handshake.jpg"
                alt={t('شراكة أعمال تقنية موثوقة ومستدامة', 'Enterprise Technology Partnership & Handshake')}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-4">
                <span className="text-xs font-display font-bold text-white bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80">
                  {t('عقود شراكة استراتيجية ملزمة', 'Strategic Partnership Agreements')}
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group h-64 sm:h-72">
              <Image
                src="/images/partnerships/corporate-architecture.jpg"
                alt={t('بنية معمارية مؤسسية قابلة للتوسع', 'Corporate Enterprise Architecture')}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-4">
                <span className="text-xs font-display font-bold text-white bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80">
                  {t('بنية برمجية معمارية للمؤسسات والشركات', 'Enterprise Architecture Scale')}
                </span>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Partnership Values */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-semibold">
              <HeartHandshake className="w-3.5 h-3.5 text-cyan-600" />
              <span>{t('نموذج الشراكة الهندسية المستدامة', 'Sustainable Engineering Alliance')}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-snug">
              {t(
                'علاقة عمل قائمة على الوضوح والالتزام الصارم بنجاح منظومتك.',
                'A technical relationship built on absolute clarity, trust, and shared outcomes.'
              )}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-arabic">
              {t(
                'ندرك أن اختيار شريك برمجيات ليس مجرد صفقة شراء، بل استثمار استراتيجي يمس عصب عملياتك اليومية. نلتزم بحماية مصالح شركتك من خلال تسليم الملكية الكاملة للكود ومرافقة فريقك ميدانياً.',
                'Selecting a software partner is a strategic foundation for your business growth. We protect your company\'s operational sovereignty with 100% IP code ownership and continuous SLA support.'
              )}
            </p>

            <div className="pt-2 space-y-2.5 font-arabic text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{t('اتفاقيات مستوى خدمة (SLA) ملزمة لحماية الجاهزية', 'Enforceable SLA contracts with guaranteed response times')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{t('فريق هندسي متخصص يرافق نمو وتوسع أعمالك', 'Dedicated senior engineers accompanying your business expansion')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{t('شفافية تامة في المستودعات وتوثيق معماري كامل', 'Direct Git repository access and transparent architecture specs')}</span>
              </div>
            </div>
          </div>

        </RevealCard>

        {/* Differentiators Grid */}
        <RevealGroup stagger={0.04} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((diff, idx) => {
            const IconComp = diff.icon;
            return (
              <RevealCard
                key={idx}
                delay={idx * 0.04}
                className="rounded-2xl p-6 sm:p-7 border border-slate-200/90 bg-white shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] text-right rtl:text-right ltr:text-left space-y-4 relative group hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-mono font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 rounded-lg">
                    {diff.num}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                  {t(diff.titleAr, diff.titleEn)}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-arabic">
                  {t(diff.descAr, diff.descEn)}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs text-cyan-700 font-mono font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{t('معيار هندسي ثابت في نوڤيكسا', 'Novixa Engineering Standard')}</span>
                </div>
              </RevealCard>
            );
          })}
        </RevealGroup>

        {/* Code Ownership & Engineering Guarantee Banner */}
        <RevealCard delay={0.08} className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-6 text-right rtl:text-right ltr:text-left shadow-[0_4px_25px_-5px_rgba(15,23,42,0.05)]">
          <div className="space-y-1.5">
            <div className="text-sm sm:text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-cyan-600" />
              <span>{t('التزام نوڤيكسا: ملكية الكود الكاملة دون احتكار', 'The Novixa Code Ownership Guarantee')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
              {t(
                'نسلم جميع مستودعات الكود المصدري على حساباتكم الخاصة، مع رخص تشغيل كاملة وتوثيق معماري واضح يضمن استقلالك التام.',
                'We deliver complete Git repositories to your private organization with full deployment runbooks and zero vendor lock-in.'
              )}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Client IP Rights</span>
          </div>
        </RevealCard>

      </div>
    </section>
  );
};

