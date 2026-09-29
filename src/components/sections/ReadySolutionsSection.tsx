'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { READY_SOLUTIONS } from '../../content/data';
import {
  UtensilsCrossed,
  CalendarCheck,
  Users,
  PackageCheck,
  HeartPulse,
  GraduationCap,
  Building2,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  Zap,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UtensilsCrossed,
  CalendarCheck,
  Users,
  PackageCheck,
  HeartPulse,
  GraduationCap,
  Building2,
  ShieldCheck,
};

export const ReadySolutionsSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800 text-teal-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              <span>{t('حلول برمجية جاهزة للتخصيص', 'Productized Business Software')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
              {t('أنظمة تشغيل مجربة ومكتملة الميزات.', 'Proven software foundations, ready to deploy.')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-arabic">
              {t(
                'بدلاً من البدء من الصفر، نوفر قواعد برمجية صلبة ومجربة يمكن تخصيصها بهويتك وربطها بنطاقك ونشرها خلال 5 إلى 14 يوماً فقط.',
                'Instead of starting every business project from zero, Novixa provides proven software foundations configured, branded, localized and deployed quickly.'
              )}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={`/${language}/solutions`}
              className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold text-sm transition-colors group"
            >
              <span>{t('استكشف كتالوج الحلول بالكامل والباقات', 'View All Ready Solutions & Tiers')}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Ready Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {READY_SOLUTIONS.map((sol) => {
            const IconComp = iconMap[sol.iconName] || Zap;
            return (
              <div
                key={sol.id}
                className="glass-card glass-card-hover rounded-2xl p-6 border border-white/[0.08] bg-slate-900/60 flex flex-col justify-between space-y-5 text-right rtl:text-right ltr:text-left relative group hover:border-teal-500/40 transition-all duration-200"
              >
                <div className="space-y-4">
                  {/* Top: Icon & Delivery Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-950 border border-slate-800 text-teal-300">
                      <Clock className="w-3 h-3" />
                      <span>{t(sol.deliveryDays.ar, sol.deliveryDays.en)}</span>
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold font-display text-white group-hover:text-teal-200 transition-colors">
                      {t(sol.name.ar, sol.name.en)}
                    </h3>
                    <p className="text-xs text-slate-400 font-arabic leading-relaxed line-clamp-2">
                      {t(sol.tagline.ar, sol.tagline.en)}
                    </p>
                  </div>

                  {/* Problem & Solution Mini Insight */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.04] space-y-1.5 text-xs font-arabic">
                    <div className="text-[11px] font-mono text-slate-400">
                      {t('المشكلة التي يحلها:', 'Problem Solved:')}
                    </div>
                    <div className="text-slate-300 text-xs line-clamp-2">
                      {t(sol.problem.ar, sol.problem.en)}
                    </div>
                  </div>

                  {/* Features List Sample */}
                  <div className="space-y-1.5 text-xs text-slate-300 font-arabic">
                    {sol.features[isRtl ? 'ar' : 'en'].slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-teal-400">
                    {t('نظام مخصص بهويتك', 'Turnkey Setup')}
                  </span>
                  <Link
                    href={`/${language}/solutions`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-teal-300 transition-colors"
                  >
                    <span>{t('طلب عرض تجريبي', 'Request Demo')}</span>
                    <ArrowIcon className="w-3 h-3" />
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
