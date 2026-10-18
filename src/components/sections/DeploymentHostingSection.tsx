import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createTranslator } from '@/lib/i18n';
import type { Language } from '@/types';
import {
  Server,
  CloudCheck,
  ShieldCheck,
  Lock,
  Database,
  ArrowLeft,
  ArrowRight,
  HardDrive,
  Activity,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { Reveal, RevealCard, RevealGroup, HoverLift } from '@/components/ui/Reveal';

export const DeploymentHostingSection = ({ lang }: { lang: Language }) => {
  const { language, isRtl, t } = createTranslator(lang);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const infrastructurePillars = [
    {
      icon: Server,
      tagAr: 'عزل الموارد 100%',
      tagEn: 'VPC Isolation',
      image: '/images/infrastructure/network-rack-mesh.jpg',
      titleAr: 'إعداد وتهيئة الخوادم السحابية المعزولة',
      titleEn: 'Isolated Cloud Server Provisioning',
      descAr: 'تهيئة خوادم سحابية مخصصة للإنتاج والتطوير مع عزل الموارد لضمان سرعة الاستجابة القصوى دون تأثر بحركة مرور خارجية.',
      descEn: 'Dedicated production & staging cloud servers with resource isolation for sub-second speeds.',
    },
    {
      icon: Lock,
      tagAr: 'تشفير TLS 1.3 صارم',
      tagEn: 'Strict TLS 1.3',
      image: '/images/infrastructure/security-telemetry-screen.jpg',
      titleAr: 'تهيئة النطاقات وشهادات التشفير SSL',
      titleEn: 'Domain, DNS & Strict TLS Setup',
      descAr: 'ربط النطاقات الرسمية وتفعيل شهادات الأمان والتشفير (TLS 1.3) مع حماية الـ DNS من التهديدات وهجمات حجب الخدمة.',
      descEn: 'Custom domain routing, enterprise DNS configuration, and automated TLS 1.3 encryption.',
    },
    {
      icon: Database,
      tagAr: 'توافرية عالية HA',
      tagEn: 'High-Availability DB',
      image: '/images/infrastructure/server-blade-hotswap.jpg',
      titleAr: 'تهيئة وتأمين قواعد البيانات الموزعة',
      titleEn: 'High-Availability Database Clusters',
      descAr: 'إعداد قواعد بيانات سحابية متقدمة (PostgreSQL / Redis) مع عزل أمني على مستوى الصفوف وتجميع الاتصالات السريع.',
      descEn: 'High-availability database setups with Row-Level Security, connection pooling, and low latency.',
    },
    {
      icon: HardDrive,
      tagAr: 'حماية من فقدان البيانات',
      tagEn: 'Zero-Data-Loss',
      image: '/images/infrastructure/datacenter-glowing-rack.jpg',
      titleAr: 'النسخ الاحتياطي التلقائي اليومي المشفر',
      titleEn: 'Daily Automated Off-Site Snapshots',
      descAr: 'جدولة نسخ احتياطي مشفر يومياً خارج الموقع مع إمكانية استعادة البيانات بضغطة زر عند الطوارئ لمنع فقدان السجلات.',
      descEn: 'Automated encrypted daily snapshots stored off-site with instant one-click disaster recovery.',
    },
    {
      icon: Activity,
      tagAr: 'مراقبة حية 24/7',
      tagEn: '24/7 Telemetry',
      image: '/images/infrastructure/datacenter-blue-room.jpg',
      titleAr: 'المراقبة الاستباقية للجاهزية (Telemetry 24/7)',
      titleEn: 'Proactive Telemetry & Health Tracking',
      descAr: 'مراقبة حية مستمرة لضغط الخوادم وسرعة الاستجابة مع إشعارات فورية عبر القنوات الهندسية قبل أن يتأثر أي مستخدم.',
      descEn: '24/7 uptime & latency tracking with real-time alerting before issues impact users.',
    },
    {
      icon: ShieldCheck,
      tagAr: 'تحصين وجدار حماية',
      tagEn: 'DDoS Shield & WAF',
      image: '/images/infrastructure/server-chassis-blue.jpg',
      titleAr: 'التحصين الأمني وجدران الحماية المتقدمة',
      titleEn: 'Security Hardening & Web Firewalls',
      descAr: 'إغلاق المنافذ غير المستخدمة، حماية الخوادم من هجمات DDoS، والتوافق الصارم مع معايير سيادة وخصوصية البيانات.',
      descEn: 'Strict firewall rules, DDoS mitigation, and regional GCC data sovereignty compliance.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80">
      {/* Background Subtle Lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <Reveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-right rtl:text-right ltr:text-left">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
                {t('برمجياتك، منشورة ومدارة باحترافية واستقرار.', 'Your software, deployed and maintained professionally.')}
              </h2>
            </div>

            <div className="shrink-0">
              <Link
                href={`/${language}/services`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group"
              >
                <span>{t('استكشف خدمات النشر والبنية التحتية', 'Explore Infrastructure Services')}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 text-blue-600" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Cloud Operations Architectural Topology Showcase Image */}
        <RevealCard delay={0.06} className="rounded-3xl p-3 sm:p-5 bg-slate-950 border border-slate-800 shadow-2xl relative group overflow-hidden">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#060D1A] group aspect-[16/9] sm:aspect-[21/9]">
            <Image
              src="/images/infrastructure/cloud-datacenter-corridor.jpg"
              alt={t('مخطط البنية السحابية المعزولة لنوڤيكسا', 'Novixa Isolated Cloud Infrastructure Topology')}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
          </div>
        </RevealCard>

        {/* Live Cloud Infrastructure Telemetry Bar (High-Contrast Tech Slate) */}
        <Reveal direction="up" delay={0.06}>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-1">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cloud Edge</span>
              </div>
              <div className="text-sm font-bold text-white">Yemen & GCC Region</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-1">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Target Uptime</span>
              </div>
              <div className="text-sm font-bold text-emerald-400">99.9% Monitored</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-1">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Encryption</span>
              </div>
              <div className="text-sm font-bold text-white">TLS 1.3 Strict</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-1">
                <HardDrive className="w-3.5 h-3.5 text-teal-400" />
                <span>Backups</span>
              </div>
              <div className="text-sm font-bold text-teal-300">Daily Encrypted</div>
            </div>
          </div>
        </Reveal>

        {/* 6 Infrastructure Pillars Grid with Real Internet Photos */}
        <RevealGroup stagger={0.04} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {infrastructurePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <RevealCard
                key={idx}
                delay={idx * 0.04}
                className="rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-900/10 transition-all duration-300 flex flex-col overflow-hidden group text-right rtl:text-right ltr:text-left"
              >
                {/* Photo Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={pillar.image}
                    alt={pillar[isRtl ? 'titleAr' : 'titleEn']}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                  {/* Floating Icon Pill */}
                  <div className="absolute top-3.5 start-3.5 z-10 w-9 h-9 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 flex items-center justify-center shadow-lg">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>

                  {/* Technical Badge */}
                  <div className="absolute top-3.5 end-3.5 z-10 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono font-medium text-slate-300">
                    {pillar[isRtl ? 'tagAr' : 'tagEn']}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                      {pillar[isRtl ? 'titleAr' : 'titleEn']}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
                      {pillar[isRtl ? 'descAr' : 'descEn']}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('معيار ثابت في كل بيئة نشر', 'Standard in Every Deployment')}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">Novixa Ops</span>
                  </div>
                </div>
              </RevealCard>
            );
          })}
        </RevealGroup>

        {/* Dedicated Isolated Hosting Architecture Statement Bar */}
        <RevealCard delay={0.08} className="rounded-2xl p-6 sm:p-8 border border-slate-200/90 bg-white flex flex-col sm:flex-row items-center justify-between gap-6 text-right rtl:text-right ltr:text-left shadow-md">
          <div className="space-y-1.5">
            <div className="text-sm sm:text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <CloudCheck className="w-5 h-5 text-cyan-600" />
              <span>{t('استضافة برمجيات الأعمال المؤسسية (حاويات معزولة وليست استضافة مشتركة)', 'Enterprise Managed Business Hosting (Isolated Containers)')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
              {t(
                'بيئات سحابية مخصصة تضمن عدم تأثرك بأي موقع آخر، مع عزل أمني كامل للموارد ودعم هندسي مباشر.',
                'Dedicated isolated cloud containers ensuring zero performance degradation from noisy neighbors with full resource isolation.'
              )}
            </p>
          </div>

          <HoverLift scale={1.03}>
            <Link
              href={`/${language}/contact`}
              className="shrink-0 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-[#38BDF8]/40 hover:border-[#38BDF8] text-[#38BDF8] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span className="text-[#38BDF8]">{t('طلب تهيئة خادم واستضافة', 'Request Server & Hosting Setup')}</span>
              <ArrowIcon className="w-4 h-4 text-[#38BDF8]" />
            </Link>
          </HoverLift>
        </RevealCard>

      </div>
    </section>
  );
};

