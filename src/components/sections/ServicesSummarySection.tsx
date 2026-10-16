'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Terminal,
  Activity,
  Users,
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
};

const customSoftwareVisualPillars = [
  {
    image: '/images/services/web-applications-portal.jpg',
    tag: 'Web & Portals',
    icon: LayoutGrid,
    titleAr: 'تطبيقات الويب والبوابات المؤسسية',
    titleEn: 'Web Apps & Enterprise Portals',
    descAr: 'هندسة منصات ويب تفاعلية وتطبيقات B2B متطورة تخدم العملاء والموردين بدقة وسرعة.',
    descEn: 'Interactive web platforms and B2B portals for clients and suppliers.',
  },
  {
    image: '/images/services/operational-dashboards.jpg',
    tag: 'Realtime KPIs',
    icon: Activity,
    titleAr: 'لوحات القيادة والتحليلات المباشرة',
    titleEn: 'Operational Dashboards & Analytics',
    descAr: 'لوحات تحكم تشغيلية ترصد مؤشرات الأداء الحساسة والمبيعات والمخزون لحظياً.',
    descEn: 'Executive cockpits tracking revenue, inventory, and operations in real-time.',
  },
  {
    image: '/images/services/backend-api-architecture.jpg',
    tag: 'APIs & Backends',
    icon: Server,
    titleAr: 'الواجهات البرمجية والأنظمة الخلفية',
    titleEn: 'APIs & High-Performance Backends',
    descAr: 'معمارية خوادم مرنة وقواعد بيانات مشفرة تعالج آلاف الطلبات المتزامنة بأمان.',
    descEn: 'Scalable REST/GraphQL APIs and secure databases handling high concurrency.',
  },
  {
    image: '/images/services/software-engineering-pod.jpg',
    tag: 'Clean Architecture',
    icon: Users,
    titleAr: 'الكود النظيف والتوثيق المعماري',
    titleEn: 'Clean Architecture & Documentation',
    descAr: 'كود Type-Safe مع اختبارات أمان آلية وتوثيق معماري شامل وتسليم ملكية 100%.',
    descEn: 'Type-safe codebase with automated testing, API specs, and full IP handover.',
  },
];

export const ServicesSummarySection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];
  const ActiveIcon = iconMap[activeService.iconName] || Code2;

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80">
      {/* Background architectural hairline grid & subtle ambient glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
              {t('خدمات برمجية شاملة', 'Comprehensive Software Services')}
            </h2>
          </div>

          <div className="shrink-0">
            <Link
              href={`/${language}/services`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group"
            >
              <span>{t('عرض تفاصيل كافة الخدمات الـ 8', 'View All 8 Services & Details')}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 text-blue-600" />
            </Link>
          </div>
        </div>

        {/* 8 Services Interactive Navigation Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {SERVICES.map((srv) => {
            const SrvIcon = iconMap[srv.iconName] || Code2;
            const isActive = srv.id === activeServiceId;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveServiceId(srv.id)}
                className={`p-3.5 rounded-xl border text-right rtl:text-right ltr:text-left transition-all duration-200 flex flex-col gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 border-[#38BDF8] text-[#38BDF8] font-bold shadow-lg shadow-cyan-900/20'
                    : 'bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:text-[#38BDF8] hover:border-cyan-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <SrvIcon className={`w-4 h-4 ${isActive ? 'text-[#38BDF8]' : 'text-cyan-600'}`} />
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />}
                </div>
                <span className="font-display text-xs leading-snug line-clamp-2">
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
            className="rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 bg-white shadow-[0_10px_30px_-5px_rgba(15,23,42,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-right rtl:text-right ltr:text-left"
          >
            {/* Active Service Visual Hero Banner from Real Internet Photography */}
            <div className="lg:col-span-12 relative w-full aspect-[16/8] sm:aspect-[21/8] lg:aspect-[24/7] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
              <Image
                src={activeService.image || '/images/services/srv-custom-software.jpg'}
                alt={t(activeService.title.ar, activeService.title.en)}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Category Pill on Image Top */}
              <div className="absolute top-3.5 start-3.5 z-10 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 px-3.5 py-1.5 rounded-xl shadow-lg text-xs font-mono text-cyan-300">
                <ActiveIcon className="w-4 h-4 text-cyan-400" />
                <span>{t(activeService.categoryBadge.ar, activeService.categoryBadge.en)}</span>
              </div>

              {/* Floating Engineering Badges on Bottom */}
              <div className="absolute bottom-3.5 start-3.5 end-3.5 z-10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl text-slate-200 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t('معمارية سحابية مخصصة • كود نظيف Type-Safe', 'Custom Cloud Architecture • Type-Safe')}</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl text-cyan-300 shadow-md">
                  <span>{t('ملكية كاملة للكود والمصدر 100%', '100% Full IP & Source Ownership')}</span>
                </div>
              </div>
            </div>

            {/* Left Column: Scope, Description & Capabilities */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-medium">
                  <ActiveIcon className="w-4 h-4 text-cyan-600" />
                  <span>{t(activeService.categoryBadge.ar, activeService.categoryBadge.en)}</span>
                </div>
                <span className="text-xs font-mono text-emerald-700 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {t('ضمان جودة وتنفيذ متقن', 'Engineered to Production Standard')}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-3xl font-bold font-display text-slate-900">
                  {t(activeService.title.ar, activeService.title.en)}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
                  {t(activeService.description.ar, activeService.description.en)}
                </p>
              </div>

              {/* 4 Architectural Pillars of Custom Software with Real Photos */}
              {activeService.id === 'custom-software' && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-700 uppercase tracking-wider block font-bold">
                      {t('الركائز المعمارية للتطوير المخصص:', 'Core Architectural Pillars:')}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {t('من الكود حتى بيئة الإنتاج', 'From Code to Live Production')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {customSoftwareVisualPillars.map((pillar, pIdx) => {
                      const PillarIcon = pillar.icon;
                      return (
                        <div
                          key={pIdx}
                          className="rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-cyan-400/60 transition-all duration-200 group/p flex flex-col justify-between"
                        >
                          <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-slate-950">
                            <Image
                              src={pillar.image}
                              alt={pillar[isRtl ? 'titleAr' : 'titleEn']}
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              className="object-cover object-center group-hover/p:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                            <div className="absolute top-2.5 start-2.5 z-10 w-7 h-7 rounded-lg bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 flex items-center justify-center shadow-sm">
                              <PillarIcon className="w-3.5 h-3.5 text-cyan-400" />
                            </div>
                            <div className="absolute top-2.5 end-2.5 z-10 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono text-slate-300">
                              {pillar.tag}
                            </div>
                          </div>
                          <div className="p-3.5 space-y-1.5 text-right rtl:text-right ltr:text-left flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold font-display text-slate-900 group-hover/p:text-cyan-700 transition-colors">
                                {pillar[isRtl ? 'titleAr' : 'titleEn']}
                              </h4>
                              <p className="text-[11px] text-slate-600 font-arabic leading-relaxed line-clamp-2">
                                {pillar[isRtl ? 'descAr' : 'descEn']}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Capabilities Grid */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono text-cyan-700 uppercase tracking-wider block font-bold">
                  {t(activeService.scopeTitle.ar, activeService.scopeTitle.en)}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-arabic">
                  {activeService.capabilities[isRtl ? 'ar' : 'en'].map((cap, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Value Highlight Box */}
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-center gap-3.5 text-xs sm:text-sm text-blue-900 font-arabic">
                <Zap className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="leading-relaxed font-medium">{t(activeService.businessValue.ar, activeService.businessValue.en)}</span>
              </div>
            </div>

            {/* Right Column: Deliverables & Specifications (High contrast slate panel) */}
            <div className="lg:col-span-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white font-display uppercase tracking-wider block">
                  {t('المخرجات والتسليمات المضمونة:', 'Guaranteed Deliverables:')}
                </span>
                <Terminal className="w-4 h-4 text-cyan-400" />
              </div>

              <ul className="space-y-3 text-xs text-slate-300 font-arabic">
                {activeService.deliverables[isRtl ? 'ar' : 'en'].map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{del}</span>
                  </li>
                ))}
              </ul>

              {/* Technical Guarantee Specs */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-[11px] font-mono text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Architecture:</span>
                  <span className="text-cyan-300">Clean & Documented</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Ownership:</span>
                  <span className="text-emerald-400">100% Full Source IP</span>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <Link
                  href={`/${language}/contact`}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-[#38BDF8]/40 hover:border-[#38BDF8] text-[#38BDF8] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span className="text-[#38BDF8]">{t('طلب استشارة لهذه الخدمة', 'Consult on This Service')}</span>
                  <ArrowIcon className="w-4 h-4 text-[#38BDF8]" />
                </Link>
                <Link
                  href={`/${language}/services`}
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-[#38BDF8]/30 hover:border-[#38BDF8]/60 text-[#38BDF8] hover:text-cyan-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#38BDF8]">{t('استكشاف جميع الخدمات بالتفصيل', 'Explore All Services')}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

