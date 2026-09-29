'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import {
  Code2,
  Zap,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Layers,
} from 'lucide-react';

export const DualEngineSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-16 lg:py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('نموذج العمل والحلول في نوڤيكسا', 'Novixa Dual Delivery Model')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('مساران متكاملان لتحويل متطلباتك إلى برمجيات تعمل.', 'Two complementary engines to power your business software.')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-arabic max-w-2xl mx-auto">
            {t(
              'سواء كنت بحاجة إلى بناء نظام برمجي معقد مخصص لنموذج عملك الفريد، أو تبحث عن نظام تشغيل جاهز ومجرب يمكن تهيئته وإطلاقه خلال أيام، نوڤيكسا توفر لك المسار الأنسب.',
              'Whether you need custom full-stack engineering tailored to proprietary workflows, or proven productized software foundations launched in days, Novixa delivers.'
            )}
          </p>
        </div>

        {/* Dual Cards Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Custom Engineering */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-slate-900/70 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between space-y-6 relative group">
            <div className="space-y-5 text-right rtl:text-right ltr:text-left">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                  {t('المسار الأول: هندسة مخصصة', 'Path 01: Custom Engineering')}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
                  {t('أحتاج بناء نظام مخصص بالكامل', 'I Need Custom Engineering')}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-arabic">
                  {t(
                    'هندسة برمجية من الصفر للشركات التي تمتلك نماذج عمل مبتكرة أو متطلبات تشغيلية معقدة تتجاوز قيود البرامج الجاهزة.',
                    'Ground-up architecture for ambitious enterprises with proprietary workflows, complex multi-branch logic, or unique digital product concepts.'
                  )}
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  {t('ما الذي تحصل عليه في هذا المسار؟', 'What You Get:')}
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-arabic">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{t('معمارية مخصصة 100% لنموذج عملك وسير عملياتك', '100% bespoke architecture mapped strictly to your workflows')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{t('ملكية كاملة للكود المصدري وحرية التوسع المستقبلي', 'Full source code ownership with zero third-party vendor lock-in')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{t('تكامل عميق مع قواعد بياناتك وأنظمتك القديمة وبوابات الدفع', 'Deep legacy database sync, payment gateway, and hardware integration')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{t('فريق هندسي مخصص يرافقك من التخطيط وحتى النشر والصيانة', 'Dedicated engineering pod covering discovery, build, deployment & SLA')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{t('نموذج التسعير والتسليم:', 'Engagement Model:')}</span>
                <span className="text-blue-400 font-bold">{t('نطاق مخصص / تسليم مرحلي', 'Custom Scope / Phased Sprints')}</span>
              </div>
              <Link
                href={`/${language}/contact`}
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
              >
                <span>{t('طلب استشارة وتقييم نطاق مخصص', 'Start Custom Engineering Assessment')}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Ready-Made Productized Solutions */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-slate-900/70 hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between space-y-6 relative group">
            <div className="space-y-5 text-right rtl:text-right ltr:text-left">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-950 text-teal-300 border border-teal-800">
                  {t('المسار الثاني: حلول جاهزة سريعة', 'Path 02: Turnkey Ready Software')}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
                  {t('أحتاج حلاً برمجياً جاهزاً ومجرباً', 'I Need a Ready-Made System')}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-arabic">
                  {t(
                    'قواعد برمجية مجربة ومكتملة الميزات للأنشطة التجارية الشائعة (المطاعم، الحجوزات، المتاجر، العيادات، العقارات) نوفرها بهويتك وننشرها في أيام.',
                    'Production-tested turnkey software foundations for standard business verticals, configured with your branding and deployed in 5–14 days.'
                  )}
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  {t('ما الذي تحصل عليه في هذا المسار؟', 'What You Get:')}
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-arabic">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{t('إطلاق فائق السرعة خلال 5 إلى 14 يوماً فقط', 'Fast time-to-market deployed within 5 to 14 business days')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{t('توفير أكثر من 60% من تكاليف التطوير البرمجي من الصفر', 'Save over 60% compared to ground-up bespoke development')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{t('تهيئة كاملة للعلامة التجارية، النطاق، والربط بالواتساب والدفع', 'Full branding setup, custom domain, WhatsApp & payment gateway')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{t('استضافة سحابية مدارة مع صيانة وتحديثات دورية متضمنة', 'Fully managed cloud hosting, daily backups, and continuous support')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{t('فترة التسليم النموذجية:', 'Delivery Timeline:')}</span>
                <span className="text-teal-400 font-bold">{t('5 - 14 يوماً عمل', '5–14 Business Days')}</span>
              </div>
              <Link
                href={`/${language}/solutions`}
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-teal-500/50 hover:border-teal-400 text-white font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <span>{t('استكشف كتالوج الحلول الجاهزة والأسعار', 'Browse Turnkey Solutions & Packages')}</span>
                <ArrowIcon className="w-4 h-4 text-teal-400" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
