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
  Cpu,
  ShieldCheck,
  Zap,
  Clock,
  HelpCircle,
} from 'lucide-react';

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

export const ServicesView: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [filterCategory, setFilterCategory] = useState<'all' | 'engineering' | 'infrastructure' | 'operations' | 'ai'>('all');

  const filteredServices = SERVICES.filter((s) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'engineering') return s.category === 'engineering' || s.category === 'modernization';
    if (filterCategory === 'infrastructure') return s.category === 'infrastructure';
    if (filterCategory === 'operations') return s.category === 'operations';
    if (filterCategory === 'ai') return s.category === 'ai';
    return true;
  });

  return (
    <div className="pt-32 pb-24 bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('الخدمات الهندسية والتشغيلية', 'Engineering & Operations Services')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('خدمات برمجية وهندسية متكاملة تبني وتدير أصولك الرقمية.', 'Full-spectrum software engineering, cloud operations, & maintenance.')}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed max-w-2xl mx-auto">
            {t(
              'من هندسة المنصات المخصصة وترقية الأنظمة القديمة إلى إعداد الخوادم السحابية والاستضافة المدارة والصيانة المستمرة.',
              'From custom full-stack platform engineering and legacy modernization to cloud deployment, managed hosting, and SLA support.'
            )}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', labelAr: 'كافة الخدمات (9)', labelEn: 'All Services (9)' },
              { id: 'engineering', labelAr: 'التطوير والهندسة البرمجية', labelEn: 'Engineering & Dev' },
              { id: 'infrastructure', labelAr: 'النشر والاستضافة السحابية', labelEn: 'Cloud & Hosting' },
              { id: 'operations', labelAr: 'الصيانة والأتمتة', labelEn: 'Maintenance & APIs' },
              { id: 'ai', labelAr: 'الذكاء الاصطناعي التطبيقي', labelEn: 'Practical AI' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-blue-600 text-white font-semibold shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {t(tab.labelAr, tab.labelEn)}
              </button>
            ))}
          </div>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredServices.map((service, idx) => {
            const Icon = iconMap[service.iconName] || Code2;
            return (
              <div
                key={service.id}
                id={service.slug}
                className="glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-slate-900/70 hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between space-y-6 text-right rtl:text-right ltr:text-left group"
              >
                <div className="space-y-4">
                  {/* Top: Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-950 border border-slate-800 text-blue-300">
                      {t(service.categoryBadge.ar, service.categoryBadge.en)}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1.5">
                    <h2 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-blue-200 transition-colors">
                      {t(service.title.ar, service.title.en)}
                    </h2>
                    <p className="text-xs text-slate-400 font-arabic leading-relaxed">
                      {t(service.subtitle.ar, service.subtitle.en)}
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed">
                    {t(service.description.ar, service.description.en)}
                  </p>

                  {/* Capabilities */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      {t(service.scopeTitle.ar, service.scopeTitle.en)}
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-arabic">
                      {service.capabilities[isRtl ? 'ar' : 'en'].slice(0, 4).map((cap, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.04] space-y-1.5 font-arabic text-xs">
                    <span className="text-[11px] font-mono text-teal-400 block font-semibold">
                      {t('التسليمات المضمونة:', 'Deliverables:')}
                    </span>
                    <div className="text-slate-300 text-[11px]">
                      {service.deliverables[isRtl ? 'ar' : 'en'].join(' • ')}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <Link
                    href={`/${language}/contact?service=${service.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    <span>{t('طلب استشارة لهذه الخدمة', 'Request Consultation')}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Engineering Process Box */}
        <div className="glass-card rounded-2xl p-8 border border-white/[0.08] bg-slate-900/80 text-center space-y-4 max-w-4xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            {t('غير متأكد أي خدمة هي الأنسب لاحتياج شركتك؟', 'Not sure which service fits your exact need?')}
          </h2>
          <p className="text-slate-300 text-sm font-arabic max-w-xl mx-auto leading-relaxed">
            {t(
              'مهندسونا مستعدون لعقد جلسة استكشاف فنية مدتها 30 دقيقة لدراسة مشكلتك التشغيلية وتقديم توصية معمارية واضحة ومجدية.',
              'Our senior engineers can jump on a 30-minute scoping consultation to audit your operational challenges and suggest the optimal architecture.'
            )}
          </p>
          <div className="pt-2">
            <Link
              href={`/${language}/contact`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
            >
              <span>{t('تحدث مع مستشار تقني الآن', 'Schedule an Engineering Consultation')}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
