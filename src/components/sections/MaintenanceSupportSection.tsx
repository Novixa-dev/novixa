'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
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
} from 'lucide-react';

export const MaintenanceSupportSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const maintenanceItems = [
    {
      icon: Wrench,
      titleAr: 'إصلاح الأخطاء البرمجية الفوري',
      titleEn: 'Priority Bug Resolution',
      descAr: 'معالجة أي استثناء أو خلل فني في الكود بسرعة فائقة للحفاظ على استمرارية العمليات.',
      descEn: 'Rapid triage and fixing of unexpected runtime exceptions to keep workflows flowing.',
    },
    {
      icon: ShieldAlert,
      titleAr: 'التحديثات والترقيعات الأمنية',
      titleEn: 'Security Patching & Audits',
      descAr: 'سد الثغرات الأمنية وتحديث حزم الحماية أولاً بأول لحماية بياناتك من الاختراق.',
      descEn: 'Proactive vulnerability patching to safeguard business records and tenant data.',
    },
    {
      icon: RefreshCw,
      titleAr: 'تحديث الحزم والمكتبات الدورية',
      titleEn: 'Dependency & Runtime Upgrades',
      descAr: 'تحديث بيئات التشغيل ومكتبات الكود لمنع تراكم الديون التقنية وتقادم النظام.',
      descEn: 'Regular updates of frameworks, packages, and Node/database runtimes.',
    },
    {
      icon: Zap,
      titleAr: 'تحسين الأداء وسرعة الاستجابة',
      titleEn: 'Performance & Latency Tuning',
      descAr: 'فحص دوري لسرعة استعلامات قواعد البيانات وتسريع تحميل الواجهات على الهواتف.',
      descEn: 'Ongoing database query indexing and frontend bundle tuning for sub-second speeds.',
    },
    {
      icon: LifeBuoy,
      titleAr: 'قناة تواصل هندسية مباشرة',
      titleEn: 'Direct Engineering Support',
      descAr: 'تواصل مباشر مع مهندسي النظام دون المرور بموظفي دعم غير تقنيين لحل المشاكل.',
      descEn: 'Direct access to software engineers who know your codebase intimately.',
    },
    {
      icon: Activity,
      titleAr: 'إضافات وتحسينات تشغيلية مستمرة',
      titleEn: 'Continuous Minor Enhancements',
      descAr: 'إضافة تعديلات وحقول جديدة وتقارير مخصصة لمواكبة نمو متطلبات شركتك المتجددة.',
      descEn: 'Iterative feature tweaks, custom export formats, and workflow improvements.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800 text-teal-300 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-teal-400" />
              <span>{t('الصيانة والدعم الفني المستمر (SLA)', 'Maintenance & Ongoing Support')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
              {t('شراكة هندسية مستمرة لحماية استثمارك البرمجي.', 'Continuous engineering care to protect your tech investment.')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-arabic">
              {t(
                'البرمجيات تحتاج لرعاية مستمرة لتبقى سريعة وآمنة. نقدم عقود صيانة ودعم فني واضحة تضمن استقرار نظامك دون توقف أو مفاجآت غير متوقعة.',
                'Software is a living operational asset. Our structured maintenance plans ensure your platform remains fast, secure, and compatible with evolving business needs.'
              )}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={`/${language}/contact`}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors"
            >
              <span>{t('طلب خطة صيانة لنظامك الحالي', 'Request Maintenance SLA')}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 6 Maintenance Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maintenanceItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-white/[0.08] bg-slate-900/60 hover:border-teal-500/40 transition-all duration-200 flex flex-col justify-between space-y-4 text-right rtl:text-right ltr:text-left"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-display text-white">
                    {item[isRtl ? 'titleAr' : 'titleEn']}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed">
                    {item[isRtl ? 'descAr' : 'descEn']}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-mono text-teal-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('استجابة سريعة وموثقة', 'Documented Fast Response')}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
