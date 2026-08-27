'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { SOLUTIONS } from '../../content/data';
import { 
  Building2, Cloud, ShoppingCart, CalendarCheck, Sparkles, Cpu, 
  CheckCircle2, ArrowLeft, ArrowRight, Zap, Layers 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WhatWeBuild: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeId, setActiveId] = useState<string>(SOLUTIONS[0].id);

  const activeSolution = SOLUTIONS.find((s) => s.id === activeId) || SOLUTIONS[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2': return Building2;
      case 'Cloud': return Cloud;
      case 'ShoppingCart': return ShoppingCart;
      case 'CalendarCheck': return CalendarCheck;
      case 'Sparkles': return Sparkles;
      case 'Cpu': return Cpu;
      default: return Layers;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>{t('حلول الهندسة البرمجية', 'Core Engineering Solutions')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
              {t('نبني أكثر من مجرد مواقع وتطبيقات.', 'We build far more than simple apps.')} <br />
              <span className="text-blue-400">{t('نبني أنظمة تشغيل رقمية حقيقية.', 'We engineer complete digital operating systems.')}</span>
            </h2>
          </div>

          <Link
            href={`/${language}/solutions`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start md:self-auto"
          >
            <span>{t('عرض كافة الحلول والمواصفات', 'View All Solutions & Specs')}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Category Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {SOLUTIONS.map((sol) => {
            const IconComp = getIcon(sol.iconName);
            const isActive = sol.id === activeId;
            return (
              <button
                key={sol.id}
                onClick={() => setActiveId(sol.id)}
                className={`p-3 rounded-xl border text-right rtl:text-right ltr:text-left transition-all duration-200 flex flex-col gap-2 ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-200"></span>}
                </div>
                <span className="font-display font-semibold text-xs leading-snug">{t(sol.title.ar, sol.title.en)}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Solution Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSolution.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-900/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column: Descriptions & Features */}
            <div className="lg:col-span-7 space-y-5 text-right rtl:text-right ltr:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-blue-400 text-xs font-mono font-medium">
                <span>{t(activeSolution.badge.ar, activeSolution.badge.en)}</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-white mb-2">
                  {t(activeSolution.title.ar, activeSolution.title.en)}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t(activeSolution.description.ar, activeSolution.description.en)}
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  {t('الميزات والمكونات الهندسية الأساسية:', 'Core Architectural Components:')}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                  {activeSolution.features[isRtl ? 'ar' : 'en'].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-teal-400 font-mono">
                <Zap className="w-3.5 h-3.5 text-teal-400" />
                <span>{t(activeSolution.businessImpact.ar, activeSolution.businessImpact.en)}</span>
              </div>
            </div>

            {/* Right Column: Architectural Visual Schema Card */}
            <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Architecture Verified</span>
                </span>
                <span>Novixa Engine</span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-right rtl:text-right ltr:text-left">
                  <div className="text-xs font-bold text-white mb-0.5">{t('الواجهة وتجربة الاستخدام', 'Frontend & Experience')}</div>
                  <div className="text-[11px] text-slate-400">{t('Next.js / TypeScript / RTL-First Design', 'Next.js / TypeScript / Sub-second Edge UI')}</div>
                </div>

                <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/60 text-right rtl:text-right ltr:text-left">
                  <div className="text-xs font-bold text-blue-300 mb-0.5">{t('المحرك والأمان', 'Core Engine & Logic')}</div>
                  <div className="text-[11px] text-blue-200/80">{t('Node.js / Modular APIs / Strict Role Isolation', 'Node.js / Modular APIs / Role RBAC')}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-right rtl:text-right ltr:text-left">
                  <div className="text-xs font-bold text-white mb-0.5">{t('قواعد البيانات والتحليلات', 'Data Layer & Scalability')}</div>
                  <div className="text-[11px] text-slate-400">{t('PostgreSQL / Redis / Encrypted Storage', 'PostgreSQL / Redis / Encrypted Storage')}</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/${language}/start-project`}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>{t('طلب استشارة هندسية لهذا الحل', 'Consult on This Solution')}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
