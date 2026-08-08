import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SOLUTIONS } from '../../content/data';
import { ViewType } from '../../types';
import { 
  Building2, Cloud, ShoppingCart, CalendarCheck, Sparkles, Cpu, 
  CheckCircle2, ArrowLeft, ArrowRight, Zap, Layers 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatWeBuildProps {
  onNavigate?: (view: ViewType) => void;
}

export const WhatWeBuild: React.FC<WhatWeBuildProps> = ({ onNavigate }) => {
  const { isRtl, t } = useLanguage();
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
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {t('نبني أكثر من مجرد مواقع وتطبيقات.', 'We build far more than simple apps.')} <br />
              <span className="text-blue-400">{t('نبني أنظمة تشغيل رقمية حقيقية.', 'We engineer complete digital operating systems.')}</span>
            </h2>
          </div>

          <button
            onClick={() => onNavigate && onNavigate('solutions')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start md:self-auto"
          >
            <span>{t('عرض كافة الحلول والمواصفات', 'View All Solutions & Specs')}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Category Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {SOLUTIONS.map((sol) => {
            const IconComp = getIcon(sol.iconName);
            const isActive = sol.id === activeId;
            return (
              <button
                key={sol.id}
                onClick={() => setActiveId(sol.id)}
                className={`p-3.5 rounded-xl border text-right rtl:text-right ltr:text-left transition-all duration-200 flex flex-col gap-2 ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <IconComp className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-ping"></span>}
                </div>
                <span className="font-display font-bold text-xs sm:text-sm">{t(sol.title.ar, sol.title.en)}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Solution Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSolution.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 bg-slate-900/90 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column: Descriptions & Features */}
            <div className="lg:col-span-7 space-y-6 text-right rtl:text-right ltr:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 border border-teal-800/80 text-teal-300 text-xs font-mono font-medium">
                <span>{t(activeSolution.badge.ar, activeSolution.badge.en)}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                {t(activeSolution.title.ar, activeSolution.title.en)}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-arabic">
                {t(activeSolution.description.ar, activeSolution.description.en)}
              </p>

              {/* Key Features Bullet List */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  {t('الميزات الأساسية للبنية الهندسية:', 'Core Architectural Features:')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSolution.features[isRtl ? 'ar' : 'en'].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Impact Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-3 text-xs sm:text-sm text-teal-300">
                <Zap className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block mb-0.5">{t('الأثر التشغيلي المباشر:', 'Direct Business Impact:')}</span>
                  <span>{t(activeSolution.businessImpact.ar, activeSolution.businessImpact.en)}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Diagram Card */}
            <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 font-mono">
                <span>System Visual Architecture</span>
                <span className="text-blue-400">Novixa Engine</span>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-white font-bold font-display">
                  <span>{t('معمارية النظام', 'Architecture Schema')}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                    Production Ready
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 font-mono">
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex items-center justify-between">
                    <span>Frontend Client Edge</span>
                    <span className="text-blue-400">Next.js / SSR</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex items-center justify-between">
                    <span>API Router & Microservices</span>
                    <span className="text-teal-400">TypeScript / REST</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex items-center justify-between">
                    <span>Database & Caching</span>
                    <span className="text-indigo-400">Isolated Tenant Store</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('start')}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>{t('طلب استشارة لبناء هذا النظام', 'Request Architecture Consultation')}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
