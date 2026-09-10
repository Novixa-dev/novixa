'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Cloud,
  Smartphone,
  Sparkles,
  Code2,
  CalendarCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Database,
  Cpu,
  ShieldCheck,
  Layers,
  Terminal,
  Server,
  Zap,
} from 'lucide-react';

export const ServicesSummarySection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const isAr = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeTenant, setActiveTenant] = useState<'tenantA' | 'tenantB'>('tenantA');

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden border-t border-slate-900/80">
      {/* Background architectural hairline grid */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-right rtl:text-right ltr:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('معمارية الخدمات الهندسية', 'Core Engineering Disciplines')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
              {t('منظومات برمجية مصممة للنمو والاستقرار التشغيلي.', 'Software systems engineered for scale and operational resilience.')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-arabic">
              {t(
                'نساعد الشركات والمنشآت المتنامية على بناء أنظمتها الرقمية وفق معايير هندسية متينة تتجاوز القوالب الجاهزة وتتحمل الضغط العالي.',
                'We help ambitious enterprises engineer custom software architectures built for high concurrency, zero data leakage, and high availability.'
              )}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={`/${language}/solutions`}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors group"
            >
              <span>{t('عرض جميع الحلول والخدمات', 'View All Services & Solutions')}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Asymmetric Bento Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Major Featured Architecture Anchor (Spans 8 cols on lg) */}
          <div className="lg:col-span-8 glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-slate-900/60 hover:border-blue-500/40 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-6">
              {/* Badge & Category */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-950/90 border border-blue-800 text-blue-300 text-xs font-mono">
                  <Cloud className="w-4 h-4 text-blue-400" />
                  <span>{t('الركن المعماري الأول', 'Core Architecture Pillar')}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SLA 99.99% • Multi-Tenant Engine</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-blue-200 transition-colors">
                  {t('هندسة المنصات السحابية ومنتجات SaaS متعددة المستأجرين', 'Enterprise Web Platforms & Multi-Tenant SaaS Engines')}
                </h3>
                <p className="text-slate-300 text-sm font-arabic leading-relaxed max-w-2xl">
                  {t(
                    'نبني المنصات التشغيلية المركزية ومنتجات SaaS السحابية من الصفر، مع عزل أمني تام لبيانات المشتركين (Tenant Isolation)، ومزامنة لحظية للعمليات والفروع، ومرونة التوسع الأفقي على مستوى العالم.',
                    'Production-ready cloud platforms and multi-tenant architectures engineered with tenant-level data isolation, edge routing, automated subscription cycles, and predictable sub-50ms latency.'
                  )}
                </p>
              </div>

              {/* Embedded Architectural Topology Preview */}
              <div className="rounded-xl border border-white/[0.06] bg-slate-950/80 p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                  <div className="flex items-center gap-2 font-mono text-slate-300">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>{t('نموذج العزل المعماري الآمن', 'Tenant Isolation Topology')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveTenant('tenantA')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                        activeTenant === 'tenantA'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-900 text-slate-300 hover:text-white'
                      }`}
                    >
                      Tenant 01 (Retail)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTenant('tenantB')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                        activeTenant === 'tenantB'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-900 text-slate-300 hover:text-white'
                      }`}
                    >
                      Tenant 02 (Fintech)
                    </button>
                  </div>
                </div>

                {/* Topology Flowchart */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-300 uppercase tracking-wider">{t('طبقة التوجيه', 'Edge Router')}</div>
                    <div className="text-white font-semibold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{activeTenant === 'tenantA' ? 'store.retail.sa' : 'api.fintech.ae'}</span>
                    </div>
                    <div className="text-[11px] text-teal-400 font-sans">{t('توجيه فوري <12ms', 'Routed in 12ms')}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-300 uppercase tracking-wider">{t('محرك المعالجة', 'Compute Cluster')}</div>
                    <div className="text-white font-semibold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{activeTenant === 'tenantA' ? 'K8s Pods (x16)' : 'K8s Pods (x32)'}</span>
                    </div>
                    <div className="text-[11px] text-blue-400 font-sans">{t('توسع تلقائي فوري', 'Auto-scaled pod')}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-300 uppercase tracking-wider">{t('عزل البيانات', 'Data Partition')}</div>
                    <div className="text-white font-semibold flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{activeTenant === 'tenantA' ? 'Schema: db_retail' : 'Schema: db_fintech'}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-sans">{t('تشفير AES-256 كامل', 'Encrypted at rest')}</div>
                  </div>
                </div>
              </div>

              {/* Feature Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { ar: 'عزل أمني تام لبيانات المستأجرين', en: 'Tenant-level data isolation' },
                  { ar: 'تكاملات API وأنظمة الفوترة والـ ERP', en: 'ERP & automated billing sync' },
                  { ar: 'معمارية موزعة عالية التوافر 99.99%', en: 'High-availability distributed core' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-arabic">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{item[isAr ? 'ar' : 'en']}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-mono">
                {t('التقنيات: Next.js 15 • Go • Node • PostgreSQL • Redis', 'Stack: Next.js 15 • Go • Node • PostgreSQL • Redis')}
              </span>
              <Link
                href={`/${language}/solutions#business-platforms`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white transition-colors"
              >
                <span>{t('مواصفات المعمارية السحابية', 'Cloud Architecture Specs')}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Applied AI & Enterprise RAG (Spans 4 cols on lg) */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 sm:p-7 border border-white/[0.08] bg-slate-900/60 hover:border-teal-500/40 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-800 text-teal-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2 py-0.5 rounded">
                  Enterprise RAG
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold font-display text-white group-hover:text-teal-300 transition-colors">
                  {t('حلول الذكاء الاصطناعي التطبيقي و RAG', 'Applied AI & Enterprise RAG Systems')}
                </h3>
                <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                  {t(
                    'أتمتة العمليات واستخراج البيانات من المستندات المعقدة بدقة، مع بناء مساعدات ذكية مدربة على معرفة شركتك الداخلية دون تسريب بيانات.',
                    'Domain-specific LLM workflows, automated document OCR extraction, and enterprise knowledge retrieval with private vector stores.'
                  )}
                </p>
              </div>

              {/* Visual Pipeline Pill */}
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2 text-[11px] font-mono text-slate-300">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Pipeline: Ingestion → Embedding</span>
                  <span className="text-teal-400">99.4% Acc</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full w-[94%]" />
                </div>
                <div className="text-[10px] text-slate-300">{t('متوافق مع حوكمة البيانات والخصوصية', 'Private Vector Indexing')}</div>
              </div>

              <ul className="space-y-2">
                {[
                  { ar: 'استخراج تلقائي لبيانات الفواتير والعقود', en: 'Contract & invoice OCR parsing' },
                  { ar: 'مساعد ذكي يعتمد على قواعد بيانات الشركة', en: 'Private enterprise RAG assistants' },
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{feat[isAr ? 'ar' : 'en']}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80">
              <Link
                href={`/${language}/solutions#ai-solutions`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-white transition-colors"
              >
                <span>{t('معمارية الذكاء الاصطناعي', 'AI Integration Specs')}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Mobile Apps & High-Throughput POS (Spans 4 cols on lg) */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 sm:p-7 border border-white/[0.08] bg-slate-900/60 hover:border-blue-500/40 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800 text-blue-400 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded">
                  Offline-First
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold font-display text-white group-hover:text-blue-300 transition-colors">
                  {t('تطبيقات الجوال والأنظمة التشغيلية ونقاط البيع', 'Mobile Apps & High-Throughput POS')}
                </h3>
                <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                  {t(
                    'تطبيقات جوال سريعة وأنظمة نقاط بيع متطورة تعمل بسلاسة حتى في أوقات الذروة وانقطاع الاتصال بالإنترنت مع مزامنة فورية.',
                    'High-performance mobile clients and resilient POS systems designed to operate offline and sync without conflicts.'
                  )}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between text-[11px] font-mono">
                <div className="text-slate-300">{t('حالة الاتصال:', 'Connectivity:')}</div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-sans">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{t('تخزين محلي مؤمن (Offline-Ready)', 'Local Sync Active')}</span>
                </div>
              </div>

              <ul className="space-y-2">
                {[
                  { ar: 'دعم كامل للعمل أوفلاين دون توقف', en: 'Zero-drop offline resilience' },
                  { ar: 'مزامنة فورية متعددة الفروع والعمليات', en: 'Instant cross-branch ledger sync' },
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{feat[isAr ? 'ar' : 'en']}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80">
              <Link
                href={`/${language}/solutions#digital-commerce`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white transition-colors"
              >
                <span>{t('معمارية نقاط البيع والجوال', 'Mobile & POS Architecture')}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Architecture & Systems Advisory (Spans 4 cols on lg) */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 sm:p-7 border border-white/[0.08] bg-slate-900/60 hover:border-blue-500/40 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800 text-blue-400 flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded">
                  Code & Perf Audit
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold font-display text-white group-hover:text-blue-300 transition-colors">
                  {t('الاستشارات التقنية وتدقيق الأكواد المعمارية', 'Architectural Audits & Technical Advisory')}
                </h3>
                <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                  {t(
                    'تدقيق شامل للبنى التحتية، فحص أمان الأنظمة، تحسين استعلامات قواعد البيانات، وخفض تكاليف الاستضافة السحابية بنسب ملموسة.',
                    'Independent architectural reviews, zero-trust security audits, query performance tuning, and cloud infrastructure cost optimization.'
                  )}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between text-[11px] font-mono">
                <div className="text-slate-300">{t('فحص الأداء (P99):', 'Latency Audit:')}</div>
                <div className="text-blue-400 font-semibold">{t('تحسين من 420ms إلى 28ms', '420ms → 28ms')}</div>
              </div>

              <ul className="space-y-2">
                {[
                  { ar: 'فحص جودة الأكواد والثغرات الأمنية', en: 'Static analysis & security reviews' },
                  { ar: 'خطط التوسع الموزعة ومعالجة الاختناقات', en: 'Bottleneck resolution roadmaps' },
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{feat[isAr ? 'ar' : 'en']}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80">
              <Link
                href={`/${language}/solutions#custom-software`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white transition-colors"
              >
                <span>{t('معايير التدقيق الهندسي', 'Audit & Advisory Specs')}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 5: Smart Booking & Scheduling Engines (Spans 4 cols on lg) */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 sm:p-7 border border-white/[0.08] bg-slate-900/60 hover:border-teal-500/40 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-800 text-teal-400 flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2 py-0.5 rounded">
                  Concurrency-Safe
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold font-display text-white group-hover:text-teal-300 transition-colors">
                  {t('محركات الجدولة والحجوزات الذكية', 'Smart Booking & Resource Engines')}
                </h3>
                <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                  {t(
                    'منظومات حجز الموارد المتطورة التي تمنع التعارض الزمني لحظياً عبر Distributed Locks مع إشعارات آلية وإدارة العربون.',
                    'High-concurrency reservation engines eliminating double-bookings with distributed resource locks and automated customer alerts.'
                  )}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between text-[11px] font-mono">
                <div className="text-slate-300">{t('القفل الموزع:', 'Slot Allocation:')}</div>
                <div className="text-emerald-400 font-semibold">{t('منع التعارض 100% (Zero Conflict)', 'Zero Conflict Lock')}</div>
              </div>

              <ul className="space-y-2">
                {[
                  { ar: 'منع التعارض اللحظي عبر Redis Locks', en: 'Zero-conflict distributed locking' },
                  { ar: 'إشعارات واتساب ورسائل تلقائية للعملاء', en: 'Instant WhatsApp & SMS dispatch' },
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{feat[isAr ? 'ar' : 'en']}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80">
              <Link
                href={`/${language}/solutions#booking-systems`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-white transition-colors"
              >
                <span>{t('معمارية محرك الجدولة', 'Scheduling Engine Specs')}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
