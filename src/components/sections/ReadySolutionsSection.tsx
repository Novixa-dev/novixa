import React from 'react';
import Link from 'next/link';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
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
  Sparkles,
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

export const ReadySolutionsSection = ({ lang }: { lang: Language }) => {
  const { language, isRtl, t } = createTranslator(lang);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold shadow-sm">
              <Zap className="w-3.5 h-3.5 text-teal-600" />
              <span>{t('حلول برمجية جاهزة ومجربة للتخصيص', 'Productized Business Software')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
              {t('أنظمة تشغيل مجربة ومكتملة الميزات.', 'Proven software foundations, ready to deploy.')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
              {t(
                'بدلاً من البدء من الصفر وتحمل تكاليف ومخاطر التطوير الطويل، نوفر قواعد برمجية صلبة ومجربة يمكن تخصيصها بهويتك وربطها بنطاقك ونشرها خلال 5 إلى 14 يوماً فقط.',
                'Instead of starting every business project from zero, Novixa provides proven software foundations configured, branded, localized and deployed quickly.'
              )}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={`/${language}/solutions`}
              className="inline-flex items-center gap-2 text-[#38BDF8] hover:text-cyan-400 font-semibold text-sm transition-colors group"
            >
              <span className="text-[#38BDF8]">{t('استكشف كتالوج الحلول بالكامل والباقات', 'View All Ready Solutions & Tiers')}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 text-[#38BDF8]" />
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
                className="rounded-2xl p-6 border border-slate-200/90 bg-white shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] flex flex-col justify-between space-y-5 text-right rtl:text-right ltr:text-left relative group hover:border-teal-400 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300"
              >
                <div className="space-y-4">
                  
                  {/* Top Window Bar: Mini window dots + Delivery Badge */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-1.5 opacity-70">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-teal-50 border border-teal-200 text-teal-800">
                      <Clock className="w-3 h-3 text-teal-600" />
                      <span>{t(sol.deliveryDays.ar, sol.deliveryDays.en)}</span>
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-teal-700 transition-colors">
                        {t(sol.name.ar, sol.name.en)}
                      </h3>
                      <p className="text-xs text-slate-500 font-arabic leading-relaxed line-clamp-1">
                        {t(sol.tagline.ar, sol.tagline.en)}
                      </p>
                    </div>
                  </div>

                  {/* Problem & Solution Mini Insight */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs font-arabic">
                    <div className="text-[11px] font-mono text-teal-700 font-bold">
                      {t('المشكلة التي يحلها:', 'Problem Solved:')}
                    </div>
                    <div className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-medium">
                      {t(sol.problem.ar, sol.problem.en)}
                    </div>
                  </div>

                  {/* Features List Sample */}
                  <div className="space-y-2 text-xs text-slate-700 font-arabic pt-1">
                    {sol.features[isRtl ? 'ar' : 'en'].slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-teal-700 flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3 text-teal-600" />
                    <span>{t('جاهز للإطلاق', 'Turnkey Ready')}</span>
                  </span>
                  <Link
                    href={`/${language}/solutions`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-[#38BDF8]/40 hover:border-[#38BDF8] text-xs font-bold text-[#38BDF8] transition-all cursor-pointer shadow-sm"
                  >
                    <span className="text-[#38BDF8]">{t('طلب عرض تجريبي', 'Request Demo')}</span>
                    <ArrowIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
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

