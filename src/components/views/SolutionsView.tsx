'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { READY_SOLUTIONS } from '@/content/data';
import {
  UtensilsCrossed,
  CalendarCheck,
  Users,
  PackageCheck,
  HeartPulse,
  GraduationCap,
  Building2,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  Zap,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UtensilsCrossed,
  CalendarCheck,
  Users,
  PackageCheck,
  HeartPulse,
  GraduationCap,
  Building2,
  ShieldCheck,
};

export const SolutionsView: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(READY_SOLUTIONS[0].id);
  const selectedSolution = READY_SOLUTIONS.find((s) => s.id === selectedSolutionId) || READY_SOLUTIONS[0];
  const SelectedIcon = iconMap[selectedSolution.iconName] || Zap;

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Lighting & Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {t('قواعد برمجية مجربة تطلق أعمالك في أيام معدودة.', 'Turnkey software foundations engineered for fast launch.')}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic max-w-2xl mx-auto">
            {t(
              'بدلاً من البدء من الصفر وتحمل تكاليف باهظة وأشهر من الانتظار، نوفر أنظمة تشغيل متكاملة للقطاعات الأكثر طلباً، قابلة للتهيئة والتخصيص بهويتك ونشرها خلال 5 إلى 14 يوماً.',
              'Instead of starting every business project from scratch, Novixa provides proven software foundations configured, branded, localized, and deployed in 5–14 days.'
            )}
          </p>
        </div>

        {/* 8 Ready Solutions Horizontal / Grid Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {READY_SOLUTIONS.map((sol) => {
            const IconComp = iconMap[sol.iconName] || Zap;
            const isSelected = sol.id === selectedSolutionId;
            return (
              <button
                key={sol.id}
                onClick={() => setSelectedSolutionId(sol.id)}
                className={`p-3 rounded-xl border text-center transition-all duration-150 flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-md shadow-slate-900/10'
                    : 'bg-white border-slate-200/90 text-slate-700 hover:border-cyan-300 hover:text-cyan-700 shadow-sm'
                }`}
              >
                <IconComp className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <span className="text-[11px] font-display font-medium leading-tight truncate w-full">
                  {t(sol.name.ar, sol.name.en).split(' ')[0]} {t(sol.name.ar, sol.name.en).split(' ')[1] || ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Solution Full Offer Breakdown */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSolution.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] space-y-10 text-right rtl:text-right ltr:text-left"
          >
            {/* Top Bar: Name, Category, Delivery Badge & CTA */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200/80 pb-8">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center shadow-sm">
                    <SelectedIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-700 font-semibold uppercase block">
                      {t(selectedSolution.category.ar, selectedSolution.category.en)}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
                      <Link
                        href={`/${language}/solutions/${selectedSolution.slug}`}
                        className="hover:text-cyan-700 transition-colors focus:outline-none focus-visible:underline"
                      >
                        {t(selectedSolution.name.ar, selectedSolution.name.en)}
                      </Link>
                    </h2>
                  </div>
                </div>
                <p className="text-slate-600 text-sm sm:text-base font-arabic leading-relaxed">
                  {t(selectedSolution.tagline.ar, selectedSolution.tagline.en)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs font-mono">
                  <Clock className="w-4 h-4 text-cyan-600" />
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold">{t('فترة الإطلاق والتجهيز:', 'Delivery Time:')}</div>
                    <div className="text-slate-900 font-bold">{t(selectedSolution.deliveryDays.ar, selectedSolution.deliveryDays.en)}</div>
                  </div>
                </div>

                <Link
                  href={`/${language}/solutions/${selectedSolution.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md shadow-[#38BDF8]/20 transition-all cursor-pointer"
                >
                  <span>{t('الصفحة الكاملة والباقات', 'Full page & tiers')}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Problem vs Solution Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-arabic">
              <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
                <span className="text-xs font-mono text-rose-700 uppercase font-bold block">
                  {t('المشكلة التشغيلية الشائعة:', 'The Operational Friction:')}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {t(selectedSolution.problem.ar, selectedSolution.problem.en)}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-2">
                <span className="text-xs font-mono text-teal-700 uppercase font-bold block">
                  {t('حل نوڤيكسا الجاهز:', 'The Novixa Turnkey Solution:')}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {t(selectedSolution.solutionSummary.ar, selectedSolution.solutionSummary.en)}
                </p>
              </div>
            </div>

            {/* Target Audience & Key Features */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <h3 className="text-base font-bold font-display text-slate-900">
                  {t('الميزات والمكونات المضمنة في هذا الحل:', 'Included Features & Architecture:')}
                </h3>
                <span className="text-xs text-slate-500 font-arabic font-medium">
                  {t('الفئة المستهدفة: ', 'Target: ')} {t(selectedSolution.targetAudience.ar, selectedSolution.targetAudience.en)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedSolution.features[isRtl ? 'ar' : 'en'].map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-700 font-arabic"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Package Tiers for this Solution */}
            {selectedSolution.packages && selectedSolution.packages.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200/80">
                <h3 className="text-base font-bold font-display text-slate-900">
                  {t('خيارات الباقات المتاحة:', 'Available Deployment Packages:')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedSolution.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
                        pkg.isPopular
                          ? 'bg-slate-900 border-cyan-500 text-white shadow-xl relative'
                          : 'bg-white border-slate-200/90 text-slate-800 shadow-sm'
                      }`}
                    >
                      {pkg.isPopular && (
                        <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-cyan-600 text-white text-[10px] font-bold font-mono shadow-sm">
                          {t('الأكثر طلباً', 'Most Popular')}
                        </div>
                      )}
                      <div className="space-y-2">
                        <div className={`font-bold text-lg font-display ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>
                          {t(pkg.name.ar, pkg.name.en)}
                        </div>
                        <p className={`text-xs font-arabic ${pkg.isPopular ? 'text-slate-300' : 'text-slate-600'}`}>
                          {t(pkg.tagline.ar, pkg.tagline.en)}
                        </p>
                        <div className={`pt-2 font-mono text-xs font-semibold ${pkg.isPopular ? 'text-cyan-300' : 'text-cyan-700'}`}>
                          {t(pkg.priceBadge.ar, pkg.priceBadge.en)}
                        </div>
                        <ul className={`space-y-1.5 pt-3 text-xs font-arabic ${pkg.isPopular ? 'text-slate-300' : 'text-slate-600'}`}>
                          {pkg.features[isRtl ? 'ar' : 'en'].map((f, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${pkg.isPopular ? 'text-cyan-400' : 'text-cyan-600'}`} />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`pt-4 border-t ${pkg.isPopular ? 'border-slate-800' : 'border-slate-200/80'}`}>
                        <Link
                          href={`/${language}/contact?solution=${selectedSolution.slug}&package=${pkg.id}`}
                          className={`w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer ${
                            pkg.isPopular
                              ? 'bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold shadow-md shadow-[#38BDF8]/20'
                              : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800'
                          }`}
                        >
                          <span>{t('اختيار هذه الباقة', 'Select Package')}</span>
                          <ArrowIcon className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* All 8 Solutions Grid Overview */}
        <div className="space-y-6 pt-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
              {t('كتالوج الحلول الجاهزة الكامل (8 قطاعات)', 'Full Turnkey Catalog (8 Verticals)')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-arabic">
              {t('اختر أي نظام للاطلاع على مواصفاته أو طلب تجربة فورية.', 'Click any system to review specifications or request demo access.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {READY_SOLUTIONS.map((sol) => {
              const IconComp = iconMap[sol.iconName] || Zap;
              return (
                <button
                  key={sol.id}
                  onClick={() => {
                    setSelectedSolutionId(sol.id);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="rounded-2xl p-6 border border-slate-200/90 bg-white hover:border-cyan-400 hover:shadow-lg text-right rtl:text-right ltr:text-left space-y-4 transition-all duration-200 flex flex-col justify-between cursor-pointer group shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {t(sol.name.ar, sol.name.en)}
                    </h3>

                    <p className="text-xs text-slate-600 font-arabic leading-relaxed line-clamp-2">
                      {t(sol.tagline.ar, sol.tagline.en)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-cyan-700">
                    <span>{t('عرض التفاصيل والباقات', 'View Offer Details')}</span>
                    <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
