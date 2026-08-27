'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PROCESS_STEPS } from '../../content/data';
import { 
  GitCommit, CheckCircle, ArrowLeft, ArrowRight, ShieldCheck, 
  Terminal, Sparkles, Clock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProcessSection: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section className="py-20 lg:py-28 bg-slate-900/60 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-semibold">
            <GitCommit className="w-3.5 h-3.5" />
            <span>{t('منهجية العمل الهندسية', 'Engineering Process')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('من الفكرة والمشكلة إلى المنتج الحي.', 'From business problem to live product.')}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t(
              'دورة تنفيذ منظمة ومحكمة تضمن تسليم نظامك في الوقت المحدد وبأعلى مستويات الجودة البرمجية.',
              'A structured 7-stage engineering lifecycle designed for absolute transparency and zero project drift.'
            )}
          </p>
        </div>

        {/* Process Steps Bar/Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-lg shadow-blue-600/30'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[10px] font-mono tracking-wider opacity-80 mb-0.5">{step.number}</div>
                <div className="font-display text-xs truncate">{t(step.title.ar, step.title.en)}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.number}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-950 rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-5 text-right rtl:text-right ltr:text-left">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold font-mono text-blue-500">{activeStep.number}</span>
                <div>
                  <h3 className="text-2xl font-extrabold font-display text-white">
                    {t(activeStep.title.ar, activeStep.title.en)}
                  </h3>
                  <span className="text-xs text-blue-400 font-arabic">
                    {t(activeStep.subtitle.ar, activeStep.subtitle.en)}
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-arabic">
                {t(activeStep.description.ar, activeStep.description.en)}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase block">{t('المخرج المسلّم (Deliverable):', 'Key Deliverable:')}</span>
                  <span className="text-xs sm:text-sm font-semibold text-white block">{t(activeStep.deliverable.ar, activeStep.deliverable.en)}</span>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-teal-400 uppercase block">{t('الفائدة المباشرة للعميل:', 'Customer Benefit:')}</span>
                  <span className="text-xs sm:text-sm font-semibold text-teal-300 block">{t(activeStep.customerBenefit.ar, activeStep.customerBenefit.en)}</span>
                </div>
              </div>
            </div>

            {/* Navigation & Progress Controls */}
            <div className="lg:col-span-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between gap-6 text-center">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-2">
                  {t('تقدم مرحلة التنفيذ', 'Lifecycle Progress')}
                </span>
                <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800 mb-2">
                  <div 
                    className="bg-blue-500 h-full rounded-full transition-all duration-300" 
                    style={{ width: `${((activeStepIndex + 1) / PROCESS_STEPS.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-300 font-mono">
                  {activeStepIndex + 1} / {PROCESS_STEPS.length} {t('المراحل الهندسية', 'Stages')}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                  className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-40 border border-slate-800 text-xs text-white transition-all font-semibold"
                >
                  {t('المرحلة السابقة', 'Previous Stage')}
                </button>

                <button
                  disabled={activeStepIndex === PROCESS_STEPS.length - 1}
                  onClick={() => setActiveStepIndex(Math.min(PROCESS_STEPS.length - 1, activeStepIndex + 1))}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs text-white transition-all font-semibold"
                >
                  {t('المرحلة التالية', 'Next Stage')}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
