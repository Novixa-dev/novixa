'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { INDUSTRIES } from '../../content/data';
import { 
  Utensils, HeartPulse, Store, Gamepad, Building, ShieldCheck, 
  AlertCircle, CheckCircle2, ArrowLeft, ArrowRight, Layers 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const IndustriesSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

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
    <section className="py-20 lg:py-28 bg-slate-900/40 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-xs font-semibold">
            <Building className="w-3.5 h-3.5" />
            <span>{t('تخصصات القطاعات', 'Industry Vertical Expertise')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('نبني حلولًا تفهم طبيعة عملك.', 'We engineer solutions that understand your domain.')}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t(
              'اختر قطاعك واكتشف كيف نعالج التحديات التشغيلية الخاصة بمجالك ونحتمها إلى كفاءة رقمية وميزانية مربحة.',
              'Select your industry to see how we solve domain-specific operational hurdles with tailored platform modules.'
            )}
          </p>
        </div>

        {/* Industry Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {INDUSTRIES.map((ind) => {
            const IconComp = getIcon(ind.iconName);
            const isActive = ind.id === activeId;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveId(ind.id)}
                className={`p-4 rounded-xl border text-right rtl:text-right ltr:text-left transition-all duration-200 flex flex-col items-start gap-2 ${
                  isActive
                    ? 'bg-slate-900 border-teal-500 text-white shadow-xl shadow-teal-500/10 ring-1 ring-teal-500/50'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-teal-500/20 text-teal-300' : 'bg-slate-900 text-slate-400'}`}>
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
            className="bg-slate-950/90 rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left: Challenges vs Solutions */}
            <div className="lg:col-span-8 space-y-6 text-right rtl:text-right ltr:text-left">
              <div>
                <h3 className="text-2xl font-extrabold font-display text-white mb-2">
                  {t(activeIndustry.name.ar, activeIndustry.name.en)}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t(activeIndustry.description.ar, activeIndustry.description.en)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Domain Challenges */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-rose-950 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <AlertCircle className="w-4 h-4" />
                    <span>{t('التحديات التشغيلية في القطاع:', 'Industry Pain Points:')}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {activeIndustry.challenges[isRtl ? 'ar' : 'en'].map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Novixa Solutions */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-950 space-y-3">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t('الحل والحلول البرمجية المقدمة:', 'Novixa Tailored Solution:')}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {activeIndustry.solutions[isRtl ? 'ar' : 'en'].map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Module Badges */}
              <div className="pt-2">
                <span className="text-xs font-mono text-slate-400 block mb-2">
                  {t('الموديولات والأنظمة المدمجة للقطاع:', 'Engineered Product Modules:')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeIndustry.productModules[isRtl ? 'ar' : 'en'].map((mod, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-blue-300">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Industry Metrics Card & CTA */}
            <div className="lg:col-span-4 bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {t('مؤشرات الأداء المحققة للقطاع', 'Achieved Domain Metrics')}
                </div>

                <div className="space-y-3">
                  {activeIndustry.sampleStats.map((st, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-2xl font-bold font-display text-teal-400">{st.value}</div>
                      <div className="text-xs text-slate-300">{t(st.label.ar, st.label.en)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/${language}/start-project`}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2"
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
