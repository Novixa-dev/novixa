'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICES_LIST } from '@/data/services';
import {
  Layout,
  Cloud,
  Smartphone,
  Sparkles,
  Code2,
  CalendarCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Layout,
  Cloud,
  Smartphone,
  Sparkles,
  Code2,
  CalendarCheck,
};

export const ServicesSummarySection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const isAr = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-right rtl:text-right ltr:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
              <span>{t('مجالات التخصص الهندسي', 'Core Engineering Services')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
              {t('خدمات برمجية مصممة للنمو والاستقرار التشغيلي.', 'Software services engineered for scale and operational resilience.')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t(
                'نساعد الشركات والمنشآت المتنامية على بناء أنظمتها الرقمية وفق أفضل ممارسات هندسة البرمجيات المعاصرة.',
                'We help ambitious enterprises build and scale modern software systems with proven architectural precision.'
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((service) => {
            const IconComponent = iconMap[service.icon] || Code2;
            const title = isAr ? service.titleAr : service.titleEn;
            const desc = isAr ? service.shortDescAr : service.shortDescEn;
            const features = isAr ? service.featuresAr : service.featuresEn;

            return (
              <div
                key={service.id}
                className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800 bg-slate-900/60 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800 text-blue-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold font-display text-white group-hover:text-blue-300 transition-colors">
                    {title}
                  </h3>

                  <p className="text-sm text-slate-300 font-arabic leading-relaxed">
                    {desc}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                    {features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800/60">
                  <Link
                    href={`/${language}/solutions#${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>{t('تفاصيل المعمارية والربط', 'Architectural Specs')}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
