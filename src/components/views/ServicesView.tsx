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
};

type ServiceFilter = 'all' | 'engineering' | 'infrastructure' | 'operations';

/**
 * `engineering` intentionally spans two content categories (`engineering` and
 * `modernization`): visitors do not distinguish "build new" from "modernize
 * existing" when browsing, so both sit behind one pill.
 */
const SERVICE_FILTER_TABS: ReadonlyArray<{ id: ServiceFilter; labelAr: string; labelEn: string }> = [
  { id: 'all', labelAr: 'كافة الخدمات (8)', labelEn: 'All Services (8)' },
  { id: 'engineering', labelAr: 'التطوير والهندسة البرمجية', labelEn: 'Engineering & Dev' },
  { id: 'infrastructure', labelAr: 'النشر والاستضافة السحابية', labelEn: 'Cloud & Hosting' },
  { id: 'operations', labelAr: 'الصيانة والأتمتة', labelEn: 'Maintenance & APIs' },
];

export const ServicesView: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [filterCategory, setFilterCategory] = useState<ServiceFilter>('all');

  const filteredServices = SERVICES.filter((s) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'engineering') return s.category === 'engineering' || s.category === 'modernization';
    if (filterCategory === 'infrastructure') return s.category === 'infrastructure';
    if (filterCategory === 'operations') return s.category === 'operations';
    return true;
  });

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Lighting & Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {t('خدمات برمجية وهندسية متكاملة تبني وتدير أصولك الرقمية.', 'Full-spectrum software engineering, cloud operations, & maintenance.')}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic max-w-2xl mx-auto">
            {t(
              'من هندسة المنصات المخصصة وترقية الأنظمة القديمة إلى إعداد الخوادم السحابية والاستضافة المدارة والصيانة المستمرة.',
              'From custom full-stack platform engineering and legacy modernization to cloud deployment, managed hosting, and SLA support.'
            )}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {SERVICE_FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-slate-900 text-white font-bold shadow-md shadow-slate-900/10'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-cyan-300 hover:text-cyan-700 shadow-sm'
                }`}
              >
                {t(tab.labelAr, tab.labelEn)}
              </button>
            ))}
          </div>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredServices.map((service) => {
            const Icon = iconMap[service.iconName] || Code2;
            return (
              <div
                key={service.id}
                id={service.slug}
                className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300 flex flex-col justify-between text-right rtl:text-right ltr:text-left group overflow-hidden"
              >
                {/* Photo Header — 100% Full Width on the Card */}
                {service.image && (
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={service.image}
                      alt={t(service.title.ar, service.title.en)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3.5 start-3.5 z-10 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-cyan-700 flex items-center justify-center shadow-md">
                      <Icon className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div className="absolute top-3.5 end-3.5 z-10 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-white/90 backdrop-blur-md border border-slate-200 text-cyan-800 shadow-sm">
                      {t(service.categoryBadge.ar, service.categoryBadge.en)}
                    </div>
                  </div>
                )}

                {/* Card Content Body */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                  <div className="space-y-4">
                    {!service.image && (
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-cyan-50 border border-cyan-200 text-cyan-800">
                          {t(service.categoryBadge.ar, service.categoryBadge.en)}
                        </span>
                      </div>
                    )}

                    {/* Title & Subtitle */}
                    <div className="space-y-1.5">
                      <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900 group-hover:text-cyan-700 transition-colors">
                        <Link
                          href={`/${language}/services/${service.slug}`}
                          className="transition-colors focus:outline-none focus-visible:underline"
                        >
                          {t(service.title.ar, service.title.en)}
                        </Link>
                      </h2>
                      <p className="text-xs text-cyan-700 font-semibold font-arabic leading-relaxed">
                        {t(service.subtitle.ar, service.subtitle.en)}
                      </p>
                    </div>

                    {/* Detailed Description */}
                    <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
                      {t(service.description.ar, service.description.en)}
                    </p>

                    {/* Capabilities */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                        {t(service.scopeTitle.ar, service.scopeTitle.en)}
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700 font-arabic">
                        {service.capabilities[isRtl ? 'ar' : 'en'].slice(0, 4).map((cap, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 font-arabic text-xs">
                      <span className="text-[11px] font-mono text-cyan-700 block font-bold">
                        {t('التسليمات المضمونة:', 'Deliverables:')}
                      </span>
                      <div className="text-slate-600 text-[11px]">
                        {service.deliverables[isRtl ? 'ar' : 'en'].join(' • ')}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-4 border-t border-slate-200/80 space-y-2">
                    <Link
                      href={`/${language}/services/${service.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl shadow-md shadow-[#38BDF8]/20 transition-all cursor-pointer"
                    >
                      <span>{t('تفاصيل الخدمة والمخرجات', 'Scope & deliverables')}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/${language}/start-project?service=${service.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium text-xs py-2 px-4 rounded-xl border border-slate-200 transition-colors"
                    >
                      <span>{t('طلب استشارة لهذه الخدمة', 'Request consultation')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Engineering Process Box */}
        <div className="rounded-2xl sm:rounded-3xl p-8 border border-slate-200/90 bg-white shadow-lg shadow-slate-900/5 text-center space-y-4 max-w-4xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center mx-auto shadow-sm">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            {t('غير متأكد أي خدمة هي الأنسب لاحتياج شركتك؟', 'Not sure which service fits your exact need?')}
          </h2>
          <p className="text-slate-600 text-sm font-arabic max-w-xl mx-auto leading-relaxed">
            {t(
              'مهندسونا مستعدون لعقد جلسة استكشاف فنية مدتها 30 دقيقة لدراسة مشكلتك التشغيلية وتقديم توصية معمارية واضحة ومجدية.',
              'Our senior engineers can jump on a 30-minute scoping consultation to audit your operational challenges and suggest the optimal architecture.'
            )}
          </p>
          <div className="pt-2">
            <Link
              href={`/${language}/contact`}
              className="inline-flex items-center gap-2 bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-[#38BDF8]/20 transition-all cursor-pointer"
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
