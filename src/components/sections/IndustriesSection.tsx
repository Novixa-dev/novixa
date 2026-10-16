'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { INDUSTRIES } from '../../content/data';
import {
  Utensils,
  HeartPulse,
  Store,
  Gamepad,
  Building,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IndustriesSectionProps {
  /** The /industries page renders its own page-level H1 and intro, so
   * it passes false to skip this section's homepage-teaser header. */
  showHeader?: boolean;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ showHeader = true }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // With the section header hidden, the page supplies the h1 and these cards sit
  // directly under it, so they are h2. Under the header's own h2 they are h3.
  // A fixed h3 skipped a level on /work, /industries and /insights.
  const CardTitle = showHeader ? 'h3' : 'h2';

  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);

  const activeIndustry = INDUSTRIES.find((i) => i.id === activeId) || INDUSTRIES[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Utensils': return Utensils;
      case 'HeartPulse': return HeartPulse;
      case 'Store': return Store;
      case 'Gamepad': return Gamepad;
      case 'Building': return Building;
      case 'ShieldCheck': return ShieldCheck;
      default: return Building;
    }
  };

  return (
    <section className="py-12 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold shadow-sm">
              <Building className="w-3.5 h-3.5 text-cyan-600" />
              <span>{t('تخصصات القطاعات', 'Industry Vertical Expertise')}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
              {t('نبني حلولًا تفهم طبيعة عملك.', 'We engineer solutions that understand your domain.')}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
              {t(
                'اختر قطاعك واكتشف كيف نعالج التحديات التشغيلية الخاصة بمجالك ونحتمها إلى كفاءة رقمية وميزانية مربحة.',
                'Select your industry to see how we solve domain-specific operational hurdles with tailored platform modules.'
              )}
            </p>
          </div>
        )}

        {/* Industry Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {INDUSTRIES.map((ind) => {
            const IconComp = getIcon(ind.iconName);
            const isActive = ind.id === activeId;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveId(ind.id)}
                className={`p-4 rounded-xl border text-right rtl:text-right ltr:text-left transition-all duration-200 flex flex-col items-start gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-white border-cyan-500 text-slate-900 shadow-md ring-1 ring-cyan-500/20'
                    : 'bg-white/80 border-slate-200/90 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-50 text-cyan-700' : 'bg-slate-100 text-slate-500'}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="font-display font-bold text-xs sm:text-sm">{t(ind.name.ar, ind.name.en)}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndustry.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left: Challenges vs Solutions */}
            <div className="lg:col-span-8 space-y-6 text-right rtl:text-right ltr:text-left">
              <div>
                <CardTitle className="text-2xl font-extrabold font-display text-slate-900 mb-2">
                  {t(activeIndustry.name.ar, activeIndustry.name.en)}
                </CardTitle>
                <p className="text-slate-600 text-sm leading-relaxed font-arabic">
                  {t(activeIndustry.description.ar, activeIndustry.description.en)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Domain Challenges */}
                <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider font-mono">
                    <AlertCircle className="w-4 h-4" />
                    <span>{t('التحديات التشغيلية في القطاع:', 'Industry Pain Points:')}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-rose-950 font-arabic">
                    {activeIndustry.challenges[isRtl ? 'ar' : 'en'].map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Novixa Solutions */}
                <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-cyan-50/70 border border-cyan-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-800 font-bold text-xs uppercase tracking-wider font-mono">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                    <span>{t('الحل والحلول البرمجية المقدمة:', 'Novixa Tailored Solution:')}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 font-arabic">
                    {activeIndustry.solutions[isRtl ? 'ar' : 'en'].map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Module Badges */}
              <div className="pt-2">
                <span className="text-xs font-mono text-slate-500 block mb-2 font-semibold">
                  {t('الموديولات والأنظمة المدمجة للقطاع:', 'Engineered Product Modules:')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeIndustry.productModules[isRtl ? 'ar' : 'en'].map((mod, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-cyan-800 font-semibold">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Industry Metrics Card & CTA */}
            <div className="lg:col-span-4 bg-slate-50/80 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
                  {t('مؤشرات الأداء المحققة للقطاع', 'Achieved Domain Metrics')}
                </div>

                <div className="space-y-3">
                  {activeIndustry.sampleStats.map((st, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                      <div className="text-2xl font-bold font-display text-cyan-600">{st.value}</div>
                      <div className="text-xs text-slate-600 font-arabic">{t(st.label.ar, st.label.en)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/${language}/start-project`}
                className="w-full py-3 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-[#38BDF8]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('تخصيص حل لقطاعك', 'Build for Your Industry')}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
