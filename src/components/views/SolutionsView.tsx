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
    <div className="pt-32 pb-24 bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-800 text-teal-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            <span>{t('الحلول البرمجية الجاهزة للتخصيص', 'Productized Business Software')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('قواعد برمجية مجربة تطلق أعمالك في أيام معدودة.', 'Turnkey software foundations engineered for fast launch.')}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed max-w-2xl mx-auto">
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
                className={`p-3 rounded-xl border text-center transition-all duration-150 flex flex-col items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-teal-700 border-teal-800 text-white font-bold shadow-lg shadow-teal-700/20'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <IconComp className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-teal-400'}`} />
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
            className="glass-card rounded-3xl p-6 sm:p-10 border border-white/[0.08] bg-slate-900/90 shadow-2xl space-y-10 text-right rtl:text-right ltr:text-left"
          >
            {/* Top Bar: Name, Category, Delivery Badge & CTA */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-8">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="w-12 h-12 rounded-xl bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center">
                    <SelectedIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-teal-400 font-semibold uppercase block">
                      {t(selectedSolution.category.ar, selectedSolution.category.en)}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                      {/* This page switches solutions in client state, so the
                          selected solution has no URL of its own. Link to its
                          detail route so it can be shared, linked and indexed. */}
                      <Link
                        href={`/${language}/solutions/${selectedSolution.slug}`}
                        className="hover:text-teal-200 transition-colors focus:outline-none focus-visible:underline"
                      >
                        {t(selectedSolution.name.ar, selectedSolution.name.en)}
                      </Link>
                    </h2>
                  </div>
                </div>
                <p className="text-slate-300 text-sm sm:text-base font-arabic leading-relaxed">
                  {t(selectedSolution.tagline.ar, selectedSolution.tagline.en)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs font-mono">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <div>
                    <div className="text-[10px] text-slate-400">{t('فترة الإطلاق والتجهيز:', 'Delivery Time:')}</div>
                    <div className="text-white font-bold">{t(selectedSolution.deliveryDays.ar, selectedSolution.deliveryDays.en)}</div>
                  </div>
                </div>

                <Link
                  href={`/${language}/solutions/${selectedSolution.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-teal-700/20 transition-all cursor-pointer"
                >
                  <span>{t('الصفحة الكاملة والباقات', 'Full page & tiers')}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Problem vs Solution Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-arabic">
              <div className="p-5 sm:p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                <span className="text-xs font-mono text-rose-400 uppercase font-bold block">
                  {t('المشكلة التشغيلية الشائعة:', 'The Operational Friction:')}
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(selectedSolution.problem.ar, selectedSolution.problem.en)}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-teal-950/20 border border-teal-900/40 space-y-2">
                <span className="text-xs font-mono text-teal-400 uppercase font-bold block">
                  {t('حل نوڤيكسا الجاهز:', 'The Novixa Turnkey Solution:')}
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(selectedSolution.solutionSummary.ar, selectedSolution.solutionSummary.en)}
                </p>
              </div>
            </div>

            {/* Target Audience & Key Features */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold font-display text-white">
                  {t('الميزات والمكونات المضمنة في هذا الحل:', 'Included Features & Architecture:')}
                </h3>
                <span className="text-xs text-slate-400 font-arabic">
                  {t('الفئة المستهدفة: ', 'Target: ')} {t(selectedSolution.targetAudience.ar, selectedSolution.targetAudience.en)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedSolution.features[isRtl ? 'ar' : 'en'].map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.05] flex items-start gap-2.5 text-xs text-slate-200 font-arabic"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Package Tiers for this Solution */}
            {selectedSolution.packages && selectedSolution.packages.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-base font-bold font-display text-white">
                  {t('خيارات الباقات المتاحة:', 'Available Deployment Packages:')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedSolution.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
                        pkg.isPopular
                          ? 'bg-slate-900 border-teal-500/60 shadow-xl relative'
                          : 'bg-slate-950/60 border-slate-800'
                      }`}
                    >
                      {pkg.isPopular && (
                        <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-teal-700 text-white text-[10px] font-bold font-mono">
                          {t('الأكثر طلباً', 'Most Popular')}
                        </div>
                      )}
                      <div className="space-y-2">
                        <div className="font-bold text-lg text-white font-display">
                          {t(pkg.name.ar, pkg.name.en)}
                        </div>
                        <p className="text-xs text-slate-400 font-arabic">
                          {t(pkg.tagline.ar, pkg.tagline.en)}
                        </p>
                        <div className="pt-2 font-mono text-xs text-teal-300 font-semibold">
                          {t(pkg.priceBadge.ar, pkg.priceBadge.en)}
                        </div>
                        <ul className="space-y-1.5 pt-3 text-xs text-slate-300 font-arabic">
                          {pkg.features[isRtl ? 'ar' : 'en'].map((f, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80">
                        <Link
                          href={`/${language}/contact?solution=${selectedSolution.slug}&package=${pkg.id}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-teal-700 hover:text-white border border-slate-700 text-slate-200 text-xs font-semibold py-2.5 rounded-xl transition-all"
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
            <h2 className="text-2xl font-bold font-display text-white">
              {t('كتالوج الحلول الجاهزة الكامل (8 قطاعات)', 'Full Turnkey Catalog (8 Verticals)')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-arabic">
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
                  className="glass-card rounded-2xl p-6 border border-white/[0.08] bg-slate-900/60 hover:border-teal-500/50 text-right rtl:text-right ltr:text-left space-y-4 transition-all duration-150 flex flex-col justify-between cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-teal-300 border border-slate-800">
                        {t(sol.deliveryDays.ar, sol.deliveryDays.en)}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-display text-white group-hover:text-teal-200 transition-colors">
                      {t(sol.name.ar, sol.name.en)}
                    </h3>

                    <p className="text-xs text-slate-400 font-arabic leading-relaxed line-clamp-2">
                      {t(sol.tagline.ar, sol.tagline.en)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-teal-400">
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
