'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PROCESS_STEPS } from '../../content/data';
import {
  GitCommit,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProcessSection: React.FC = () => {
  const { t } = useLanguage();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = PROCESS_STEPS[activeStepIndex] || PROCESS_STEPS[0];

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-slate-200/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold shadow-sm">
            <GitCommit className="w-3.5 h-3.5 text-cyan-600" />
            <span>{t('منهجية العمل والوضوح', 'Engineering & Delivery Lifecycle')}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {t('من فهم التحدي إلى الإطلاق المستقر والمساندة.', 'From operational problem to live, stable release.')}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic max-w-2xl mx-auto">
            {t(
              'دورة تنفيذ منظمة وشفافة تضمن وضوح النطاق، دقة المواعيد، وخلو النظام من المفاجآت أو الديون التقنية.',
              'A structured 6-stage engineering lifecycle designed for absolute transparency, punctual milestones, and zero project drift.'
            )}
          </p>
        </div>

        {/* Process Steps Connected Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-xl border text-center transition-all duration-200 cursor-pointer shadow-sm ${
                  isActive
                    ? 'bg-slate-900 border-[#38BDF8] text-[#38BDF8] font-bold shadow-md shadow-cyan-950/20'
                    : 'bg-white border-slate-200/90 text-slate-700 hover:text-[#38BDF8] hover:bg-slate-50 hover:border-cyan-300'
                }`}
              >
                <div className={`text-[11px] font-mono tracking-wider mb-1 font-bold ${isActive ? 'text-[#38BDF8]' : 'text-cyan-700'}`}>
                  STAGE {step.number}
                </div>
                <div className={`font-display text-xs truncate font-medium ${isActive ? 'text-[#38BDF8]' : ''}`}>
                  {t(step.title.ar, step.title.en)}
                </div>
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
            className="rounded-2xl p-6 sm:p-10 border border-slate-200/90 bg-slate-50/70 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.05)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left 8 Cols: Title, Description, Deliverable cards */}
            <div className="lg:col-span-8 space-y-6 text-right rtl:text-right ltr:text-left">
              <div className="flex items-center gap-4">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono text-cyan-700">
                  {activeStep.number}
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
                    {t(activeStep.title.ar, activeStep.title.en)}
                  </h3>
                  <span className="text-xs sm:text-sm text-cyan-800 font-arabic font-medium block mt-0.5">
                    {t(activeStep.subtitle.ar, activeStep.subtitle.en)}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
                {t(activeStep.description.ar, activeStep.description.en)}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-arabic">
                <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-sm space-y-1.5">
                  <span className="text-[11px] font-mono text-cyan-700 uppercase font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-600" />
                    {t('المخرج المسلّم (Deliverable):', 'Key Deliverable:')}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 block leading-relaxed">
                    {t(activeStep.deliverable.ar, activeStep.deliverable.en)}
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-sm space-y-1.5">
                  <span className="text-[11px] font-mono text-emerald-700 uppercase font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {t('الفائدة المباشرة للعميل:', 'Customer Benefit:')}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-800 block leading-relaxed">
                    {t(activeStep.customerBenefit.ar, activeStep.customerBenefit.en)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Discipline and Signoff Guarantee */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 font-arabic">
                <h4 className="text-sm font-bold text-slate-900 font-display">
                  {t('ضمان الشفافية والانضباط', 'Transparent Milestone Delivery')}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {t('تقارير إنجاز منتظمة وعروض حية للمرحلة قبل الانتقال للمرحلة التالية دون أي مفاجآت.', 'Regular demo reviews and written approvals before moving to subsequent stages.')}
                </p>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-800 bg-cyan-50 px-3 py-1 rounded-md border border-cyan-200 font-medium">
                  <Clock className="w-3 h-3 text-cyan-600" />
                  <span>Verified Sprint Delivery</span>
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

