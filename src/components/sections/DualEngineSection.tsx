import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import { Reveal, RevealCard } from '@/components/ui/Reveal';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Database,
  Cpu,
  Server,
  GitBranch,
  Clock,
} from 'lucide-react';

export const DualEngineSection = ({ lang }: { lang: Language }) => {
  const { language, isRtl, t } = createTranslator(lang);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {t('مساران متكاملان لتحويل متطلباتك إلى برمجيات تعمل.', 'Two complementary engines to power your business software.')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic max-w-2xl mx-auto">
            {t(
              'سواء كنت بحاجة إلى بناء نظام برمجي معقد مخصص لنموذج عملك الفريد، أو تبحث عن نظام تشغيل جاهز ومجرب يمكن تهيئته وإطلاقه خلال أيام، نوڤيكسا توفر لك المسار الأنسب بأعلى معايير الاستقرار.',
              'Whether you need custom full-stack engineering tailored to proprietary workflows, or proven productized software foundations launched in days, Novixa delivers with architectural rigor.'
            )}
          </p>
        </Reveal>

        {/* Dual Cards Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Custom Engineering (المسار الأول: هندسة مخصصة) */}
          <RevealCard delay={0.05} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between space-y-6 relative group">
            <div className="space-y-6 text-right rtl:text-right ltr:text-left">
              
              {/* Image at Top */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm border border-slate-100 group-hover:scale-[1.01] transition-transform duration-300">
                <Image
                  src="/images/services/custom-software-hero.jpg"
                  alt={t('هندسة برمجية مخصصة', 'Custom Bespoke Software Engineering')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-3 right-3 rtl:right-3 ltr:left-3 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-900/90 text-white backdrop-blur-md border border-white/20">
                  {t('المسار 01 • هندسة مخصصة من الصفر', 'Path 01 • Custom Bespoke Engineering')}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mb-2.5">
                  {t('أحتاج بناء نظام مخصص بالكامل لعملي', 'I Need Custom Engineering for My Business')}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-arabic">
                  {t(
                    'هندسة برمجية من الصفر للشركات التي تمتلك نماذج عمل فريدة أو متطلبات تشغيلية معقدة تتجاوز قيود البرامج الجاهزة، مع كتابة كود نظيف وتوثيق معماري كامل.',
                    'Ground-up architecture for ambitious enterprises with proprietary workflows, complex multi-branch logic, or unique digital product concepts with clean code and full architectural documentation.'
                  )}
                </p>
              </div>

              {/* Architecture Blueprint Mini Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-1.5 text-blue-700 font-bold">
                    <Cpu className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Custom Architecture Blueprint</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">100% Bespoke</span>
                </div>
                
                {/* Visual Pipeline Nodes */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="p-2 rounded bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    <Server className="w-3.5 h-3.5 text-blue-600 mx-auto mb-1" />
                    <span>API Gateway</span>
                  </div>
                  <div className="p-2 rounded bg-blue-50/80 border border-blue-200 text-blue-800">
                    <GitBranch className="w-3.5 h-3.5 text-blue-600 mx-auto mb-1" />
                    <span>Custom Logic</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    <Database className="w-3.5 h-3.5 text-blue-600 mx-auto mb-1" />
                    <span>Isolated DB</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 font-arabic flex items-center justify-between pt-1">
                  <span>{t('تقنيات حديثة بدون ديون برمجية:', 'Modern Stack:')}</span>
                  <span className="text-blue-700 font-mono text-[10px] font-semibold">Next.js • TypeScript • PostgreSQL</span>
                </div>
              </div>

              {/* Key What-You-Get List */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-mono text-slate-900 uppercase tracking-wider block font-bold">
                  {t('ما الذي تحصل عليه في هذا المسار؟', 'What You Get in This Path:')}
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-arabic">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{t('معمارية مخصصة 100% لنموذج عملك وسير عملياتك اليومية', '100% bespoke architecture mapped strictly to your operational workflows')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{t('ملكية كاملة للكود المصدري (Git Repository) وحرية التوسع التام', 'Full source code ownership with zero third-party vendor lock-in')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{t('تكامل عميق مع قواعد بياناتك الحالية وبوابات الدفع والأجهزة الميدانية', 'Deep legacy database sync, payment gateway, and hardware integration')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{t('فريق هندسي متخصص يرافقك من دراسة النطاق وحتى الإطلاق واستقرار الخوادم', 'Dedicated engineering pod covering discovery, build, deployment & SLA')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Card Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>{t('نموذج التسعير والتسليم:', 'Engagement Model:')}</span>
                <span className="text-blue-700 font-bold">{t('نطاق مخصص / تسليم مرحلي', 'Custom Scope / Phased Sprints')}</span>
              </div>
              <Link
                href={`/${language}/contact`}
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-[#38BDF8]/40 hover:border-[#38BDF8] text-[#38BDF8] font-bold text-xs sm:text-sm py-3.5 px-5 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
              >
                <span className="text-[#38BDF8]">{t('طلب استشارة وتقييم نطاق مخصص', 'Start Custom Engineering Assessment')}</span>
                <ArrowIcon className="w-4 h-4 text-[#38BDF8]" />
              </Link>
            </div>
          </RevealCard>

          {/* Card 2: Ready-Made Productized Solutions (المسار الثاني: حلول جاهزة سريعة) */}
          <RevealCard delay={0.15} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-400/50 transition-all duration-300 flex flex-col justify-between space-y-6 relative group">
            <div className="space-y-6 text-right rtl:text-right ltr:text-left">
              
              {/* Image at Top */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm border border-slate-100 group-hover:scale-[1.01] transition-transform duration-300">
                <Image
                  src="/images/turnkey-solutions.jpg"
                  alt={t('حلول برمجية جاهزة', 'Productized Turnkey Business Software')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-3 right-3 rtl:right-3 ltr:left-3 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-950/90 text-teal-200 backdrop-blur-md border border-teal-500/30">
                  {t('المسار 02 • إطلاق سريع ومجرب (5–14 يوماً)', 'Path 02 • Turnkey Ready Software (5–14 Days)')}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mb-2.5">
                  {t('أحتاج حلاً برمجياً جاهزاً ومجرباً لإطلاقه فوراً', 'I Need a Ready-Made System to Launch Fast')}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-arabic">
                  {t(
                    'قواعد برمجية مجربة ومكتملة الميزات للأنشطة التجارية الشائعة (المطاعم، الحجوزات، المتاجر، العيادات، العقارات) نخصصها بهويتك وننشرها على نطاقك خلال أيام معدودة.',
                    'Production-tested turnkey software foundations for standard business verticals, configured with your branding and deployed on your domain in 5–14 days.'
                  )}
                </p>
              </div>

              {/* Turnkey Fast Launch Pipeline */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-1.5 text-teal-700 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Fast Deployment Pipeline</span>
                  </div>
                  <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">5-14 Days</span>
                </div>
                
                {/* Visual Pipeline Nodes */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="p-2 rounded bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    <span className="text-teal-600 block font-bold mb-0.5">01</span>
                    <span>{t('اختيار الحل', 'Select Solution')}</span>
                  </div>
                  <div className="p-2 rounded bg-teal-50/80 border border-teal-200 text-teal-800">
                    <span className="text-teal-600 block font-bold mb-0.5">02</span>
                    <span>{t('تخصيص الهوية', 'Customize Brand')}</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    <span className="text-teal-600 block font-bold mb-0.5">03</span>
                    <span>{t('الإطلاق المباشر', 'Go Live')}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 font-arabic flex items-center justify-between pt-1">
                  <span>{t('جاهز للتكامل فوراً:', 'Pre-integrated with:')}</span>
                  <span className="text-teal-700 font-mono text-[10px] font-semibold">WhatsApp Bot • POS • Payment • Cloud</span>
                </div>
              </div>

              {/* Key What-You-Get List */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-mono text-slate-900 uppercase tracking-wider block font-bold">
                  {t('ما الذي تحصل عليه في هذا المسار؟', 'What You Get in This Path:')}
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-arabic">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{t('إطلاق فائق السرعة خلال 5 إلى 14 يوماً عمل دون مخاطرة أو تأخير', 'Fast time-to-market deployed within 5 to 14 business days')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{t('توفير أكثر من 60% من تكاليف التطوير البرمجي من الصفر مع الحفاظ على الجودة', 'Save over 60% compared to ground-up bespoke development')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{t('تهيئة كاملة للعلامة التجارية، النطاق الرسمي، والربط بالواتساب وبوابات الدفع', 'Full branding setup, custom domain, WhatsApp & payment gateway')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{t('استضافة سحابية مدارة مع نسخ احتياطي يومي وصيانة دورية مستمرة', 'Fully managed cloud hosting, daily backups, and continuous support')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Card Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>{t('فترة التسليم النموذجية:', 'Delivery Timeline:')}</span>
                <span className="text-teal-700 font-bold">{t('5 - 14 يوماً عمل', '5–14 Business Days')}</span>
              </div>
              <Link
                href={`/${language}/solutions`}
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-[#38BDF8]/40 hover:border-[#38BDF8] text-[#38BDF8] font-bold text-xs sm:text-sm py-3.5 px-5 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
              >
                <span className="text-[#38BDF8]">{t('استكشف كتالوج الحلول الجاهزة والأسعار', 'Browse Turnkey Solutions & Packages')}</span>
                <ArrowIcon className="w-4 h-4 text-[#38BDF8]" />
              </Link>
            </div>
          </RevealCard>

        </div>

      </div>
    </section>
  );
};


