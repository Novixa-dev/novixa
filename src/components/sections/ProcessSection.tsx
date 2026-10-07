'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PROCESS_STEPS } from '../../content/data';
import {
  GitCommit,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProcessSection: React.FC = () => {
  const { t } = useLanguage();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep = PROCESS_STEPS[activeStepIndex] || PROCESS_STEPS[0];

  return (
    <section className="py-20 lg:py-28 bg-slate-900/40 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold">
            <GitCommit className="w-3.5 h-3.5" />
            <span>{t('منهجية العمل والوضوح', 'Engineering & Delivery Lifecycle')}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('من فهم التحدي إلى الإطلاق المستقر والمساندة.', 'From operational problem to live, stable release.')}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-arabic">
            {t(
              'دورة تنفيذ منظمة وشفافة تضمن وضوح النطاق، دقة المواعيد، وخلو النظام من المفاجآت أو الديون التقنية.',
              'A structured 6-stage engineering lifecycle designed for absolute transparency, punctual milestones, and zero project drift.'
            )}
          </p>
        </div>

        {/* Process Steps Bar/Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-lg shadow-blue-600/30'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {/* No `opacity-80` here: on the inactive chip it dropped
                    slate-400 on slate-950 to 4.0:1, under the 4.5:1 floor for
                    text this small. The mono face and smaller size already
                    make the step number read as secondary. */}
                <div className="text-[10px] font-mono tracking-wider mb-0.5">{step.number}</div>
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
            transition={{ duration: 0.15 }}
            className="bg-slate-950 rounded-2xl p-6 sm:p-10 border border-white/[0.08] shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-5 text-right rtl:text-right ltr:text-left">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold font-mono text-blue-400">{activeStep.number}</span>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-arabic">
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

            <div className="lg:col-span-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 space-y-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1 font-arabic">
                <h4 className="text-sm font-bold text-white font-display">
                  {t('ضمان الشفافية والانضباط', 'Transparent Milestone Delivery')}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('تقارير إنجاز منتظمة وعروض حية للمرحلة قبل الانتقال للمرحلة التالية.', 'Regular demo reviews and written approvals before moving to subsequent stages.')}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
