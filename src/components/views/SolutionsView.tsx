'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { ProcessSection } from '../sections/ProcessSection';
import { SOLUTIONS } from '../../content/data';
import { 
  Building2, Cloud, ShoppingCart, CalendarCheck, Sparkles, Cpu, 
  CheckCircle2, ArrowLeft, ArrowRight, Zap, Shield, ArrowUpRight,
  Sliders, Database, Server, HardDrive, Check, Radio
} from 'lucide-react';

export const SolutionsView: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Capacity & Sizing Calculator State
  const [rpsScale, setRpsScale] = useState<'100' | '500' | '2500' | '10000'>('500');
  const [dbIsolation, setDbIsolation] = useState<'shared' | 'isolated'>('shared');
  const [edgeSync, setEdgeSync] = useState<boolean>(true);
  const [aiEngine, setAiEngine] = useState<boolean>(false);

  const filteredSolutions = selectedCategory === 'all'
    ? SOLUTIONS
    : SOLUTIONS.filter((s) => s.id === selectedCategory);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2': return Building2;
      case 'Cloud': return Cloud;
      case 'ShoppingCart': return ShoppingCart;
      case 'CalendarCheck': return CalendarCheck;
      case 'Sparkles': return Sparkles;
      case 'Cpu': return Cpu;
      default: return Cpu;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <div className="space-y-4 text-right rtl:text-right ltr:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
            <span>{t('منظومة الحلول الهندسية', 'Engineering Solutions Catalogue')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('حلول برمجية مخصصة للتحول الرقمي والنمو.', 'Custom Software Solutions Engineered for Scale.')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {t(
              'نحن لا نكتفي بإنشاء الواجهات؛ بل نبني المحرك التشغيلي الذي يدير مبيعاتك، مخزونك، وعلاقاتك مع العملاء بكفاءة مطلقة.',
              'Beyond simple websites: we engineer operational backbones unifying orders, multi-branch inventory, and automated workflows.'
            )}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t('جميع الحلول', 'All Solutions')}
          </button>
          {SOLUTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedCategory(s.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === s.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {t(s.title.ar, s.title.en)}
            </button>
          ))}
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map((sol) => {
            const IconComp = getIcon(sol.iconName);
            return (
              <div
                key={sol.id}
                className="glass-card glass-card-hover rounded-2xl p-7 border border-slate-800 flex flex-col justify-between gap-6 text-right rtl:text-right ltr:text-left"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800/80 flex items-center justify-center text-blue-400 font-bold">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-teal-400">
                      {t(sol.badge.ar, sol.badge.en)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white">
                    {t(sol.title.ar, sol.title.en)}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed">
                    {t(sol.description.ar, sol.description.en)}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase block">{t('المواصفات التقنية:', 'Technical Specs:')}</span>
                    <ul className="space-y-1.5 text-xs text-slate-200 font-arabic">
                      {sol.features[isRtl ? 'ar' : 'en'].map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-teal-300 font-arabic">{t(sol.businessImpact.ar, sol.businessImpact.en)}</span>
                  <Link
                    href={`/${language}/start-project`}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white transition-all"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture Capacity & Sizing Calculator */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 bg-slate-900/90 shadow-2xl space-y-8 text-right rtl:text-right ltr:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-400 text-xs font-mono">
                <Sliders className="w-3.5 h-3.5" />
                <span>{t('أداة تخطيط المعمارية والسعة (Capacity Planner)', 'Architecture Capacity & Sizing Planner')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                {t('حاسبة تقدير السعة للأنظمة الموزعة', 'Distributed System Sizing Calculator')}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-arabic leading-relaxed">
                {t(
                  'حدد المتطلبات التشغيلية المتوقعة لنظامك البرمجي، وسيقوم المحرك بتقدير المعمارية المثلى، عدد وحدات K8s، وتوزيع قواعد البيانات المتوافقة مع سرعة استجابة فائقة.',
                  'Input your operational target and our estimator projects the optimal Kubernetes container sizing, cache topology, and GCC compliance.'
                )}
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center shrink-0">
              <span className="text-[11px] font-mono text-slate-400 block">{t('زمن الاستجابة P99 المتوقع', 'Estimated P99 Latency')}</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {rpsScale === '100' ? '< 14ms' : rpsScale === '500' ? '< 18ms' : rpsScale === '2500' ? '< 24ms' : '< 32ms'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Concurrency Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  {t('1. معدل العمليات المتوقعة في وقت الذروة (Peak RPS / Concurrency):', '1. Peak Requests Per Second (RPS):')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: '100', label: '100 RPS', desc: { ar: 'متوسط', en: 'Normal' } },
                    { id: '500', label: '500 RPS', desc: { ar: 'متسارع', en: 'High' } },
                    { id: '2500', label: '2.5K RPS', desc: { ar: 'مؤسسي', en: 'Enterprise' } },
                    { id: '10000', label: '10K+ RPS', desc: { ar: 'فائق', en: 'Hyperscale' } },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRpsScale(item.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        rpsScale === item.id
                          ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30 font-bold'
                          : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-mono">{item.label}</span>
                      <span className="text-[10px] opacity-80">{t(item.desc.ar, item.desc.en)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Database Isolation Model */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  {t('2. نمط عزل قواعد البيانات (Data Isolation Model):', '2. Database Isolation Strategy:')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDbIsolation('shared')}
                    className={`p-3.5 rounded-xl border text-right rtl:text-right ltr:text-left transition-all cursor-pointer flex items-start gap-3 ${
                      dbIsolation === 'shared'
                        ? 'bg-blue-950/50 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <Database className={`w-4 h-4 shrink-0 mt-0.5 ${dbIsolation === 'shared' ? 'text-blue-400' : 'text-slate-500'}`} />
                    <div>
                      <span className="text-xs font-bold block text-white">
                        {t('مشترك مع حماية السجلات (RLS)', 'Shared with Row-Level Security')}
                      </span>
                      <span className="text-[11px] text-slate-400 leading-normal">
                        {t('كفاءة استغلال الموارد وتكلفة سحابية مثالية', 'High resource efficiency, ideal cloud cost')}
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDbIsolation('isolated')}
                    className={`p-3.5 rounded-xl border text-right rtl:text-right ltr:text-left transition-all cursor-pointer flex items-start gap-3 ${
                      dbIsolation === 'isolated'
                        ? 'bg-blue-950/50 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <HardDrive className={`w-4 h-4 shrink-0 mt-0.5 ${dbIsolation === 'isolated' ? 'text-blue-400' : 'text-slate-500'}`} />
                    <div>
                      <span className="text-xs font-bold block text-white">
                        {t('قواعد بيانات معزولة ومستقلة', 'Dedicated Tenant DB Clusters')}
                      </span>
                      <span className="text-[11px] text-slate-400 leading-normal">
                        {t('عزل سيبراني تام للمؤسسات المصرفية والطبية', 'Total isolation for enterprise compliance')}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Edge Sync & AI Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setEdgeSync(!edgeSync)}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    edgeSync
                      ? 'bg-teal-950/40 border-teal-600/60 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-arabic">{t('مزامنة فورية دون اتصال (Offline Edge)', 'Offline-First Edge Sync')}</span>
                  </div>
                  <div className={`w-4 h-4 rounded flex items-center justify-center ${edgeSync ? 'bg-teal-500 text-slate-950' : 'border border-slate-700'}`}>
                    {edgeSync && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAiEngine(!aiEngine)}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    aiEngine
                      ? 'bg-blue-950/40 border-blue-600/60 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-arabic">{t('محرك الذكاء والبحث المتجهي (Vector/AI)', 'Vector Search & AI Pipeline')}</span>
                  </div>
                  <div className={`w-4 h-4 rounded flex items-center justify-center ${aiEngine ? 'bg-blue-500 text-white' : 'border border-slate-700'}`}>
                    {aiEngine && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              </div>
            </div>

            {/* Architecture Output Specs (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-xs font-mono uppercase text-slate-400">
                    {t('المعمارية المقترحة:', 'Projected Architecture:')}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                    {t('متوافقة مع الخليج', 'GCC Ready')}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-mono block text-[11px]">{t('وحدات المعالجة السحابية (K8s Clusters):', 'Compute Cluster:')}</span>
                    <p className="font-mono text-white bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                      {rpsScale === '100' && '2x Pods (2 vCPU / 4GB RAM) • Auto-Scale 1-4'}
                      {rpsScale === '500' && '4x - 8x Pods (4 vCPU / 8GB RAM) • HPA Enabled'}
                      {rpsScale === '2500' && '12x - 24x Pods • Regional Edge Balancing'}
                      {rpsScale === '10000' && 'Multi-Region Distributed Core • Sharded Pods'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-mono block text-[11px]">{t('طبقة التخزين والتخزين المؤقت (Storage & Cache):', 'Storage & Cache Engine:')}</span>
                    <p className="font-mono text-slate-200 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-[11px] leading-relaxed">
                      {dbIsolation === 'shared' ? 'PostgreSQL RLS + Redis Cluster (In-Memory)' : 'Dedicated Isolated Multi-DB + Encrypted Volumes'}
                      {edgeSync && ' + Conflict-Free Sync (CRDT)'}
                      {aiEngine && ' + pgvector Embeddings (HNSW)'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-slate-300 text-[11px] pt-1">
                    <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{t('استضافة محلية بالخليج (الرياض / دبي) متوافقة 100%', '100% Sovereign GCC Local Hosting')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <Link
                  href={`/${language}/start-project?scale=${rpsScale}&iso=${dbIsolation}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all"
                >
                  <span>{t('طلب مراجعة المعمارية وبدء المشروع', 'Request Architecture Review & Start')}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              {t('هل تحتاج معمارية خاصة بنموذج عملك؟', 'Need a tailored architecture for your domain?')}
            </h3>
            <p className="text-xs text-slate-300 font-arabic mt-1">
              {t('مهندسو نوڤيكسا جاهزون لمراجعة المتطلبات وتقديم مخطط الملاءمة الهندسية.', 'Our architects are ready to review your requirements.')}
            </p>
          </div>
          <Link
            href={`/${language}/start-project`}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all shrink-0"
          >
            {t('طلب مخطط المعمارية', 'Request Specs Consultation')}
          </Link>
        </div>

      </div>

      <ProcessSection />
    </div>
  );
};
