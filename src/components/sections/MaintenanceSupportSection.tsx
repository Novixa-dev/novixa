import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import {
  ShieldAlert,
  Wrench,
  RefreshCw,
  Zap,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Activity,
  LifeBuoy,
  Clock,
} from 'lucide-react';

export const MaintenanceSupportSection = ({ lang }: { lang: Language }) => {
  const { language, isRtl, t } = createTranslator(lang);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const maintenanceItems = [
    {
      icon: Wrench,
      titleAr: 'إصلاح الأخطاء البرمجية الفوري والاستثنائي',
      titleEn: 'Priority Bug Resolution & Incident Triage',
      descAr: 'معالجة أي استثناء أو خلل فني غير متوقع في الكود بسرعة فائقة للحفاظ على استمرارية العمليات دون انقطاع.',
      descEn: 'Rapid triage and fixing of unexpected runtime exceptions to keep workflows flowing without interruption.',
    },
    {
      icon: ShieldAlert,
      titleAr: 'الترقيعات والتحديثات الأمنية الاستباقية',
      titleEn: 'Proactive Security Patching & Audits',
      descAr: 'سد الثغرات الأمنية وتحديث حزم الحماية أولاً بأول لضمان حماية بيانات شركتك وسجلات عملائك من التهديدات.',
      descEn: 'Proactive vulnerability patching to safeguard business records and tenant data from modern exploits.',
    },
    {
      icon: RefreshCw,
      titleAr: 'تحديث الحزم والمكتبات وقواعد البيانات',
      titleEn: 'Runtime & Dependency Upgrades',
      descAr: 'تحديث بيئات التشغيل ومكتبات الكود لمنع تراكم الديون التقنية وتقادم النظام والحفاظ على التوافق المستمر.',
      descEn: 'Regular updates of frameworks, packages, and Node/database runtimes preventing technical debt.',
    },
    {
      icon: Zap,
      titleAr: 'تحسين الأداء وسرعة الاستعلامات والواجهات',
      titleEn: 'Performance & Database Latency Tuning',
      descAr: 'فحص دوري لسرعة استعلامات قواعد البيانات وتسريع تحميل الواجهات على الهواتف لتظل بالملي ثانية.',
      descEn: 'Ongoing database query indexing and frontend bundle tuning for persistent sub-second response times.',
    },
    {
      icon: LifeBuoy,
      titleAr: 'قناة تواصل هندسية مباشرة (دون وسطاء)',
      titleEn: 'Direct Senior Engineering Support',
      descAr: 'تواصل مباشر عبر الواتساب وسلاك مع مهندسي النظام الذين كتبوا الكود فعلياً، دون المرور بموظفي دعم غير تقنيين.',
      descEn: 'Direct access to senior software engineers who know your codebase intimately, with zero bot runarounds.',
    },
    {
      icon: Activity,
      titleAr: 'إضافات وتحسينات تشغيلية مستمرة',
      titleEn: 'Continuous Operational Enhancements',
      descAr: 'إضافة تعديلات وحقول جديدة وتقارير مخصصة لمواكبة نمو وتوسع متطلبات شركتك المتجددة شهرًا بعد شهر.',
      descEn: 'Iterative feature tweaks, custom export formats, and workflow improvements aligned with your growth.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold shadow-sm">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-600" />
              <span>{t('الصيانة والدعم الفني المستمر (SLA)', 'Maintenance & Ongoing SLA Support')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
              {t('شراكة هندسية مستمرة لحماية استثمارك البرمجي.', 'Continuous engineering care to protect your tech investment.')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
              {t(
                'البرمجيات كائن حي يحتاج لرعاية مستمرة لتبقى سريعة وآمنة. نقدم عقود صيانة ودعم فني واضحة تضمن استقرار نظامك دون توقف أو مفاجآت غير متوقعة.',
                'Software is a living operational asset. Our structured maintenance plans ensure your platform remains fast, secure, and compatible with evolving business needs.'
              )}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={`/${language}/contact`}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-[#38BDF8]/40 hover:border-[#38BDF8] text-[#38BDF8] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span className="text-[#38BDF8]">{t('طلب اتفاقية صيانة ودعم (SLA)', 'Request Maintenance SLA')}</span>
              <ArrowIcon className="w-4 h-4 text-[#38BDF8]" />
            </Link>
          </div>
        </div>

        {/* SLA Guarantee Callout Pill Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-right rtl:text-right ltr:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 font-display">
                {t('ضمان الاستجابة السريعة للحالات الطارئة', 'Rapid Incident SLA Response Guarantee')}
              </div>
              <div className="text-xs text-slate-500 font-arabic font-medium">
                {t('استجابة هندسية مباشرة خلال أقل من ساعتين للحالات الحرجة مع مراقبة حية على مدار الساعة.', 'Engineering triage within < 2 hours for critical incidents with 24/7 automated telemetry.')}
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Target Response: &lt; 2h SLA</span>
          </div>
        </div>

        {/* Engineering Maintenance & SLA Operations Cockpit Visual Image */}
        <div className="rounded-3xl p-3 sm:p-5 bg-slate-950 border border-slate-800 shadow-2xl relative group overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 px-2 flex-wrap gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-bold">{t('لوحة تحكم الصيانة الهندسية وتتبع البلاغات • Novixa SLA Command', 'Engineering Maintenance & SLA Command Cockpit')}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400">14m MTTA</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">0 Critical Regressions</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">Direct WhatsApp Dev Bridge</span>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#060D1A] group">
            <Image
              src="/images/maintenance-cockpit.png"
              alt={t('واجهة عمليات الصيانة والدعم الفني المباشر لنوڤيكسا', 'Novixa Engineering Maintenance & SLA Operations Cockpit')}
              width={960}
              height={520}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
        </div>

        {/* 6 Maintenance Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maintenanceItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl p-6 sm:p-7 border border-slate-200/90 bg-white shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300 flex flex-col justify-between space-y-4 text-right rtl:text-right ltr:text-left"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-900">
                    {item[isRtl ? 'titleAr' : 'titleEn']}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
                    {item[isRtl ? 'descAr' : 'descEn']}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-mono text-cyan-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{t('استجابة سريعة وموثقة هندسياً', 'Documented Fast Response')}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

