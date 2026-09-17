'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import {
  Server,
  CloudCheck,
  ShieldCheck,
  Lock,
  Database,
  ArrowLeft,
  ArrowRight,
  HardDrive,
  Mail,
  Activity,
  CheckCircle2,
  Cpu,
  RefreshCw,
} from 'lucide-react';

export const DeploymentHostingSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const infrastructurePillars = [
    {
      icon: Server,
      titleAr: 'إعداد وتهيئة الخوادم السحابية',
      titleEn: 'Cloud Server Provisioning',
      descAr: 'تهيئة خوادم سحابية مخصصة للإنتاج والتطوير مع عزل الموارد لضمان سرعة الاستجابة القصوى.',
      descEn: 'Dedicated production & staging cloud servers with resource isolation for sub-second speeds.',
    },
    {
      icon: Lock,
      titleAr: 'تهيئة النطاقات وشهادات SSL',
      titleEn: 'Domain, DNS & SSL Setup',
      descAr: 'ربط النطاقات الرسمية وتفعيل شهادات الأمان والتشفير (TLS 1.3) وحماية الـ DNS من التهديدات.',
      descEn: 'Custom domain routing, enterprise DNS configuration, and automated TLS 1.3 encryption.',
    },
    {
      icon: Database,
      titleAr: 'تهيئة وتأمين قواعد البيانات',
      titleEn: 'Secure Database Provisioning',
      descAr: 'إعداد قواعد بيانات سحابية متقدمة (PostgreSQL / Redis) مع عزل أمني على مستوى الصفوف.',
      descEn: 'High-availability database setups with Row-Level Security, connection pooling, and low latency.',
    },
    {
      icon: HardDrive,
      titleAr: 'النسخ الاحتياطي التلقائي اليومي',
      titleEn: 'Daily Automated Off-Site Backups',
      descAr: 'جدولة نسخ احتياطي مشفر يومياً خارج الموقع مع إمكانية استعادة البيانات بضغطة زر عند الطوارئ.',
      descEn: 'Automated encrypted daily snapshots stored off-site with instant one-click disaster recovery.',
    },
    {
      icon: Activity,
      titleAr: 'المراقبة الاستباقية للجاهزية (Telemetry)',
      titleEn: 'Proactive Health Monitoring',
      descAr: 'مراقبة حية مستمرة لضغط الخوادم وسرعة الاستجابة مع إشعارات فورية عند أي خلل فني.',
      descEn: '24/7 uptime & latency tracking with real-time alerting before issues impact users.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'التحصين الأمني وجدران الحماية',
      titleEn: 'Security Hardening & Firewalls',
      descAr: 'إغلاق المنافذ غير المستخدمة، حماية الخوادم من هجمات DDoS، والتوافق مع معايير سيادة البيانات.',
      descEn: 'Strict firewall rules, DDoS mitigation, and regional GCC data sovereignty compliance.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Subtle Lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
              <Server className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('النشر والاستضافة وإدارة الأنظمة', 'Deployment, Hosting & Operations')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
              {t('برمجياتك، منشورة ومدارة باحترافية.', 'Your software, deployed and maintained professionally.')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-arabic">
              {t(
                'لا تنتهي مسؤوليتنا عند كتابة الكود. نوفر خدمات نشر سحابي وإعداد بيئات متكاملة تضمن تشغيل برمجياتك بأعلى درجات الاستقرار والأمان.',
                'We take software from repository to rock-solid operational deployment—provisioning servers, databases, SSL, backups, and proactive monitoring.'
              )}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={`/${language}/services`}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors group"
            >
              <span>{t('استكشف خدمات النشر والبنية التحتية', 'Explore Infrastructure Services')}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* 6 Infrastructure Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infrastructurePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-white/[0.08] bg-slate-900/60 hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between space-y-4 text-right rtl:text-right ltr:text-left"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-display text-white">
                    {pillar[isRtl ? 'titleAr' : 'titleEn']}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed">
                    {pillar[isRtl ? 'descAr' : 'descEn']}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('جاهز للتطبيق في كل مشروع', 'Standard in Every Deployment')}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hosting Architecture Statement Bar */}
        <div className="glass-card rounded-2xl p-6 border border-white/[0.08] bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-right rtl:text-right ltr:text-left">
          <div className="space-y-1">
            <div className="text-sm font-bold text-white font-display flex items-center gap-2">
              <CloudCheck className="w-4 h-4 text-teal-400" />
              <span>{t('استضافة برمجيات الأعمال المؤسسية (ليست استضافة مشتركة)', 'Enterprise Managed Business Hosting (Not Shared Hosting)')}</span>
            </div>
            <p className="text-xs text-slate-300 font-arabic">
              {t(
                'بيئات سحابية مخصصة تضمن عدم تأثرك بأي موقع آخر، مع دعم هندسي مباشر وتحديثات دورية.',
                'Dedicated isolated cloud containers ensuring zero performance degradation from noisy neighbors.'
              )}
            </p>
          </div>

          <Link
            href={`/${language}/contact`}
            className="shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors"
          >
            <span>{t('طلب تهيئة خادم واستضافة', 'Request Server & Hosting Setup')}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
