'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICES } from '@/content/data';
import {
  Code2,
  LayoutGrid,
  Layers,
  RefreshCw,
  Server,
  Cloud,
  ShieldAlert,
  Workflow,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  LayoutGrid,
  Layers,
  RefreshCw,
  Server,
  CloudCheck: Cloud,
  Cloud,
  ShieldAlert,
  ShieldCheck,
  Workflow,
  Sparkles,
};

export const ServicesSummarySection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];
  const ActiveIcon = iconMap[activeService.iconName] || Code2;

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden border-t border-slate-900/80">
      {/* Background architectural hairline grid */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('منظومة الخدمات الهندسية والتشغيلية', 'Engineering & Operations Services')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
              {t('خدمات برمجية شاملة من الكود إلى الاستقرار السحابي.', 'Comprehensive software services from code to cloud stability.')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-arabic">
              {t(
                'نغطي دورة حياة البرمجيات بالكامل: التطوير المخصص، الحلول الجاهزة، التحديث، النشر، الاستضافة المدارة، والصيانة المستمرة.',
                'Covering the complete software lifecycle: custom engineering, productized solutions, modernization, cloud deployment, managed hosting, and ongoing maintenance.'
              )}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={`/${language}/services`}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors group"
            >
              <span>{t('عرض تفاصيل كافة الخدمات الـ 9', 'View All 9 Services & Details')}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* 9 Services Interactive Navigation Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {SERVICES.map((srv) => {
            const SrvIcon = iconMap[srv.iconName] || Code2;
            const isActive = srv.id === activeServiceId;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveServiceId(srv.id)}
                className={`p-3 rounded-xl border text-right rtl:text-right ltr:text-left transition-all duration-150 flex flex-col gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <SrvIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-200 animate-pulse" />}
                </div>
                <span className="font-display font-semibold text-xs leading-snug line-clamp-2">
                  {t(srv.title.ar, srv.title.en)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Service Showcase Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-slate-900/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-right rtl:text-right ltr:text-left"
          >
            {/* Left Column: Scope, Description & Capabilities */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono">
                  <ActiveIcon className="w-4 h-4 text-blue-400" />
                  <span>{t(activeService.categoryBadge.ar, activeService.categoryBadge.en)}</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">
                  {t('ضمان جودة وتنفيذ متقن', 'Engineered to Production Standard')}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {t(activeService.title.ar, activeService.title.en)}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-arabic">
                  {t(activeService.description.ar, activeService.description.en)}
                </p>
              </div>

              {/* Capabilities Grid */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  {t(activeService.scopeTitle.ar, activeService.scopeTitle.en)}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200 font-arabic">
                  {activeService.capabilities[isRtl ? 'ar' : 'en'].map((cap, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-white/[0.04]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Value */}
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/40 flex items-center gap-3 text-xs text-blue-300 font-arabic">
                <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{t(activeService.businessValue.ar, activeService.businessValue.en)}</span>
              </div>
            </div>

            {/* Right Column: Deliverables & Quick Consultation Action */}
            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-white/[0.06] space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-white font-display uppercase tracking-wider block">
                  {t('المخرجات والتسليمات المضمونة:', 'Guaranteed Deliverables:')}
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 font-arabic">
                {activeService.deliverables[isRtl ? 'ar' : 'en'].map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <Link
                  href={`/${language}/contact`}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
                >
                  <span>{t('طلب استشارة لهذه الخدمة', 'Consult on This Service')}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/${language}/services`}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{t('استكشاف جميع الخدمات', 'Explore All Services')}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
