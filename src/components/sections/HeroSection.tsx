'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Layers,
  Cpu,
  Database,
  Server,
  GitBranch,
  LayoutGrid,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [selectedNode, setSelectedNode] = useState<string>('gateway');

  const topologyNodes = [
    {
      id: 'gateway',
      nameAr: '01. بوابة التوزيع السحابي (Edge Gateway)',
      nameEn: '01. Ingestion Edge Gateway',
      icon: Server,
      specAr: 'عزل جغرافي • تشفير TLS 1.3',
      specEn: 'Geo-routing • TLS 1.3 Termination',
      latency: '1.2ms',
      detailAr: 'معالجة وتوزيع كافة الطلبات عبر شبكة الحافة الإقليمية مع حماية مدمجة ضد هجمات الحرمان من الخدمة (DDoS).',
      detailEn: 'Terminates and filters requests at the regional edge with built-in zero-trust rate limiting.',
    },
    {
      id: 'multitenant',
      nameAr: '02. محرك البرمجيات المدار (Application Core)',
      nameEn: '02. Application & Logic Engine',
      icon: Layers,
      specAr: 'عزل منطقي تام • سياق ديناميكي',
      specEn: 'Logical Partitioning • Dynamic Context',
      latency: '3.4ms',
      detailAr: 'فصل تام لبيانات وبيئات كل مؤسسة مع تطبيق سياسات الصلاحيات المتقدمة (RBAC) وسجلات التدقيق المالي.',
      detailEn: 'Strict workspace isolation ensuring zero cross-tenant contamination with auditable RBAC.',
    },
    {
      id: 'queue',
      nameAr: '03. ناقل الأحداث والأتمتة (Event Mesh & Queue)',
      nameEn: '03. Event Mesh & Redis Queue',
      icon: GitBranch,
      specAr: 'معالجة غير متزامنة • Webhooks',
      specEn: 'Async Pipelines • Webhook Dispatch',
      latency: '0.8ms',
      detailAr: 'معالجة ملايين الأحداث التشغيلية المتزامنة، رسائل الواتساب، وطوابير المهام الخلفية دون أي بطء.',
      detailEn: 'Processes asynchronous webhooks, WhatsApp alerts, and real-time socket events concurrently.',
    },
    {
      id: 'database',
      nameAr: '04. قاعدة البيانات المشفرة (PostgreSQL Core)',
      nameEn: '04. Sharded PostgreSQL Core',
      icon: Database,
      specAr: 'تخزين آمن • نسخ احتياطي يومي',
      specEn: 'Row-Level Security • Daily Snapshots',
      latency: '2.1ms',
      detailAr: 'تخزين مشفر وموزع مع أمان على مستوى الصفوف (Row-Level Security) ونسخ احتياطي يومي خارج الموقع.',
      detailEn: 'Zero-lock sharded storage with Row-Level Security and automated daily encrypted off-site snapshots.',
    },
  ];

  const activeNodeInfo = topologyNodes.find((n) => n.id === selectedNode) || topologyNodes[0];

  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-slate-950">
      {/* Crisp Architectural Grid Backdrop */}
      <div className="absolute inset-0 architectural-grid opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 pointer-events-none" />

      {/* Structural Framing Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 border-x border-white/[0.05]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center py-6">
          
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-7 space-y-7 text-right rtl:text-right ltr:text-left">
            
            {/* Regional & Discipline Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-white/[0.08] text-blue-400 text-xs font-mono font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span translate="no">NOVIXA ENGINEERING</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-arabic">
                {t('حلول تقنية عملية للأعمال في اليمن والمنطقة', 'Practical business software for Yemen & GCC')}
              </span>
            </div>

            {/* Main Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold font-display text-white leading-tight lg:leading-snug tracking-normal">
              {t('نبني الأنظمة والمنتجات الرقمية', 'We build the software systems & products')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-teal-300">
                {t('التي تجعل أعمالك تعمل بشكل أفضل.', 'that help businesses operate better.')}
              </span>
            </h1>

            {/* Subheadline: Clear Business Value */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-arabic font-normal">
              {t(
                'من تطوير الأنظمة المخصصة إلى الحلول الجاهزة والنشر والاستضافة والصيانة، نحول احتياجات الأعمال إلى برمجيات عملية قابلة للنمو.',
                'From custom software and reusable business solutions to deployment, hosting, integrations and ongoing maintenance, Novixa turns real business needs into practical software.'
              )}
            </p>

            {/* Action Anchors: Dual CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/${language}/contact`}
                className="group inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-150 cursor-pointer"
              >
                <span>{t('ابدأ مشروعك', 'Start Your Project')}</span>
                <ArrowIcon className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>

              <Link
                href={`/${language}/solutions`}
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] hover:border-white/[0.15] text-slate-200 font-medium text-sm sm:text-base px-5 py-3.5 rounded-xl transition-all duration-150 cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4 text-blue-400" />
                <span>{t('استكشف الحلول الجاهزة', 'Explore Ready Solutions')}</span>
              </Link>
            </div>

            {/* Two Entry Options for Visitors: Custom vs Ready */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-arabic">
              <Link
                href={`/${language}/contact`}
                className="p-3.5 rounded-xl bg-slate-900/50 border border-white/[0.06] hover:border-blue-500/40 transition-colors flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white mb-0.5 flex items-center gap-1.5">
                    <span>{t('أحتاج بناء نظام مخصص', 'I need something built')}</span>
                    <ArrowIcon className="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-slate-400 leading-normal">
                    {t('هندسة معمارية خاصة لنموذج عملك الفريد من الصفر.', 'Custom architecture for proprietary business workflows.')}
                  </div>
                </div>
              </Link>

              <Link
                href={`/${language}/solutions`}
                className="p-3.5 rounded-xl bg-slate-900/50 border border-white/[0.06] hover:border-teal-500/40 transition-colors flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-950/80 text-teal-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white mb-0.5 flex items-center gap-1.5">
                    <span>{t('أحتاج حلاً برمجياً جاهزاً', 'I need a ready system')}</span>
                    <ArrowIcon className="w-3 h-3 text-teal-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-slate-400 leading-normal">
                    {t('أنظمة مجربة للمطاعم، الحجوزات، المخازن، والعقارات جاهزة في 5-14 يوماً.', 'Proven turnkey systems deployed in 5–14 days.')}
                  </div>
                </div>
              </Link>
            </div>

            {/* Verified Architectural Specifications Bar */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-6 text-right rtl:text-right ltr:text-left font-mono">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-extrabold font-display text-white">99.99%</div>
                <div className="text-xs text-slate-300 font-arabic">{t('جاهزية التشغيل السحابي', 'Cloud SLA Uptime')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-extrabold font-display text-blue-400">5-14 {t('أيام', 'Days')}</div>
                <div className="text-xs text-slate-300 font-arabic">{t('إطلاق الحلول الجاهزة', 'Ready Solutions Launch')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-extrabold font-display text-teal-400">100%</div>
                <div className="text-xs text-slate-300 font-arabic">{t('ملكية الكود والبيانات', 'Full IP & Code Ownership')}</div>
              </div>
            </div>
          </div>

          {/* Interactive Topology & Live Engine Inspector Column */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-white/[0.08] bg-slate-900/80 shadow-2xl relative space-y-5">
              
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-[11px] text-slate-400 ms-2">novixa-engine.sys</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>OPERATIONAL</span>
                </div>
              </div>

              {/* Topology Nodes List */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider text-right rtl:text-right ltr:text-left">
                  {t('معمارية البنية التحتية والتشغيل:', 'Infrastructure & System Topology:')}
                </div>
                {topologyNodes.map((node) => {
                  const isSelected = selectedNode === node.id;
                  const NodeIcon = node.icon;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node.id)}
                      className={`w-full p-3 rounded-xl border text-right rtl:text-right ltr:text-left transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                        isSelected
                          ? 'bg-blue-600/15 border-blue-500/80 text-white shadow-sm'
                          : 'bg-slate-950/60 border-white/[0.05] text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-900 text-blue-400 border border-white/[0.05]'
                          }`}
                        >
                          <NodeIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold font-display">
                            {node[isRtl ? 'nameAr' : 'nameEn']}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {node[isRtl ? 'specAr' : 'specEn']}
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] font-mono font-bold text-teal-400 shrink-0">
                        {node.latency}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Node Details Box */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/[0.06] text-right rtl:text-right ltr:text-left space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{t('المواصفات الهندسية للمكون', 'Component Specifications')}</span>
                  <span className="text-blue-400">SLA 99.99%</span>
                </div>
                <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                  {activeNodeInfo[isRtl ? 'detailAr' : 'detailEn']}
                </p>
              </div>

              {/* Quick Action in Panel */}
              <div className="pt-1 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-slate-400">
                  {t('نشر واستضافة مدارة', 'Managed Deployment')}
                </span>
                <Link
                  href={`/${language}/services`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>{t('تفاصيل الخدمات الهندسية', 'Explore Services')}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
