'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Zap,
  Layers,
  Cpu,
  CheckCircle2,
  Database,
  Users,
  ShoppingCart,
  Lock,
  Server,
  GitBranch,
  Terminal,
  Activity,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<'topology' | 'metrics'>('topology');
  const [selectedNode, setSelectedNode] = useState<string>('gateway');

  const topologyNodes = [
    {
      id: 'gateway',
      nameAr: '01. بوابة التوزيع (Edge Gateway)',
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
      nameAr: '02. محرك العزل السحابي (Multi-Tenant)',
      nameEn: '02. Multi-Tenant Engine',
      icon: Layers,
      specAr: 'عزل منطقي تام • سياق ديناميكي',
      specEn: 'Logical Partitioning • Dynamic Context',
      latency: '3.4ms',
      detailAr: 'فصل تام لبيانات وبيئات كل مؤسسة مع تطبيق سياسات الصلاحيات المتقدمة (RBAC) وسجلات التدقيق المالي.',
      detailEn: 'Strict workspace isolation ensuring zero cross-tenant contamination with auditable RBAC.',
    },
    {
      id: 'queue',
      nameAr: '03. ناقل الأحداث (Event Mesh & Redis)',
      nameEn: '03. Event Mesh & Queue',
      icon: GitBranch,
      specAr: 'معالجة غير متزامنة • Pub/Sub',
      specEn: 'Async Pipelines • Redis Cluster',
      latency: '0.8ms',
      detailAr: 'معالجة ملايين الأحداث التشغيلية المتزامنة، إشعارات الويب، وطوابير المهام الخلفية دون أي بطء.',
      detailEn: 'Processes asynchronous webhooks, background jobs, and real-time socket events concurrently.',
    },
    {
      id: 'database',
      nameAr: '04. قاعدة البيانات المجزأة (PostgreSQL)',
      nameEn: '04. Sharded PostgreSQL Core',
      icon: Database,
      specAr: 'تجزئة أفقية • نسخ متماثلة للقراءة',
      specEn: 'Row-Level Security • Read Replicas',
      latency: '2.1ms',
      detailAr: 'تخزين مشفر وموزع مع أمان على مستوى الصفوف (Row-Level Security) ونسخ احتياطي فوري غير متزامن.',
      detailEn: 'Zero-lock sharded storage with Row-Level Security and instant immutable snapshot recovery.',
    },
  ];

  const activeNodeInfo = topologyNodes.find((n) => n.id === selectedNode) || topologyNodes[0];

  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-slate-950">
      {/* Crisp Architectural Grid Backdrop - No Random Blur Blobs */}
      <div className="absolute inset-0 architectural-grid opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 pointer-events-none" />

      {/* Structural Framing Container with Hairline Desktop Boundaries */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 border-x border-white/[0.05]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center py-6">
          
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-7 space-y-7 text-right rtl:text-right ltr:text-left">
            {/* Architectural Discipline Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-white/[0.08] text-blue-400 text-xs font-mono font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span translate="no">NOVIXA ARCHITECTURAL SYSTEMS</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-arabic">{t('هندسة برمجيات المؤسسات', 'Enterprise Engineering')}</span>
            </div>

            {/* Main Display Headline with Precise Arabic Leading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold font-display text-white leading-tight lg:leading-snug tracking-normal">
              {t('نبني الأنظمة البرمجية الموزعة', 'Architecting Resilient Platforms.')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-teal-300">
                {t('التي تدير عمليات الأعمال وتتوسع معها.', 'Engineered for Performance & Scale.')}
              </span>
            </h1>

            {/* Subheadline - Restrained, Technical, Authoritative */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-arabic font-normal">
              {t(
                'شركة هندسة برمجيات متخصصة في بناء المنصات السحابية متعددة المستأجرين (Multi-Tenant SaaS)، محركات العمليات المتزامنة، وحلول الذكاء الاصطناعي التطبيقي لأسواق الشرق الأوسط والخليج العربي.',
                'A software engineering firm dedicated to building multi-tenant enterprise SaaS platforms, high-throughput transactional engines, and practical AI systems for the Middle East and GCC.'
              )}
            </p>

            {/* Action Anchors */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/${language}/start-project`}
                className="group inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-150"
              >
                <span>{t('ابدأ التقييم المعماري لمشروعك', 'Start Architecture Assessment')}</span>
                <ArrowIcon className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>

              <Link
                href={`/${language}/solutions`}
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] hover:border-white/[0.15] text-slate-200 font-medium text-sm sm:text-base px-5 py-3.5 rounded-xl transition-all duration-150"
              >
                <Layers className="w-4 h-4 text-blue-400" />
                <span>{t('منظومة الحلول والخدمات', 'Explore Solutions')}</span>
              </Link>
            </div>

            {/* Verified Architectural Specifications Bar */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-6 text-right rtl:text-right ltr:text-left font-mono">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-extrabold font-display text-white">99.99%</div>
                <div className="text-xs text-slate-300 font-arabic">{t('جاهزية التشغيل السحابي', 'Cloud SLA Uptime')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-extrabold font-display text-blue-400">&lt; 25ms</div>
                <div className="text-xs text-slate-300 font-arabic">{t('زمن استجابة الحافة الإقليمية', 'Regional Edge Latency')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-extrabold font-display text-teal-400">Zero-Lock</div>
                <div className="text-xs text-slate-300 font-arabic">{t('عزل بيانات المؤسسات', 'Multi-Tenant Isolation')}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Command Console & Topology Visual */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl border border-white/[0.09] bg-slate-900/95 shadow-2xl overflow-hidden">
              {/* Console Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-white/[0.07]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-300 ml-1" translate="no">
                    novixa://cluster-core-mesh
                  </span>
                </div>

                {/* Mode Selector */}
                <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-white/[0.07] text-[11px]">
                  <button
                    onClick={() => setActiveTab('topology')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === 'topology'
                        ? 'bg-blue-600 text-white font-medium shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t('المعمارية', 'Topology')}
                  </button>
                  <button
                    onClick={() => setActiveTab('metrics')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === 'metrics'
                        ? 'bg-blue-600 text-white font-medium shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t('الأداء والضغط', 'Live Metrics')}
                  </button>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-4 sm:p-5 space-y-4">
                {activeTab === 'topology' ? (
                  <div className="space-y-3">
                    <div className="text-[11px] font-mono text-slate-300 uppercase tracking-wider flex items-center justify-between">
                      <span>{t('طبقات المعمارية الموزعة (انقر للفحص)', 'Distributed Architecture Nodes (Click to Inspect)')}</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Live
                      </span>
                    </div>

                    {/* Interactive Topology Nodes List */}
                    <div className="space-y-2">
                      {topologyNodes.map((node) => {
                        const Icon = node.icon;
                        const isSelected = selectedNode === node.id;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNode(node.id)}
                            className={`w-full p-3 rounded-xl border text-right rtl:text-right ltr:text-left transition-all duration-150 flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-blue-950/40 border-blue-500/50 text-white shadow-xs'
                                : 'bg-slate-950/60 border-white/[0.06] text-slate-300 hover:border-white/[0.14] hover:bg-slate-950/90'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                                  isSelected
                                    ? 'bg-blue-600 text-white border-blue-400'
                                    : 'bg-slate-900 text-blue-400 border-white/[0.06]'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold font-display text-white">
                                  {t(node.nameAr, node.nameEn)}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  {t(node.specAr, node.specEn)}
                                </div>
                              </div>
                            </div>
                            <div className="text-[11px] font-mono font-medium text-teal-400 shrink-0">
                              {node.latency}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Live Node Inspection Console */}
                    <div className="p-3.5 rounded-xl bg-slate-950/90 border border-white/[0.08] text-xs font-arabic space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-blue-400 pb-1 border-b border-white/[0.06]">
                        <span>[System Inspector]</span>
                        <span>Latency: {activeNodeInfo.latency}</span>
                      </div>
                      <p className="text-slate-300 pt-1 leading-relaxed text-[11px] sm:text-xs">
                        {t(activeNodeInfo.detailAr, activeNodeInfo.detailEn)}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Metrics Tab */
                  <div className="space-y-3 py-1 font-mono text-xs">
                    <div className="text-[11px] text-slate-300 uppercase tracking-wider">
                      {t('مؤشرات الأداء تحت الحمل العالي', 'System Metrics Under High Concurrency')}
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-white/[0.06] space-y-1">
                        <div className="text-[10px] text-slate-400">Throughput (RPS)</div>
                        <div className="text-lg font-bold text-white font-display">12,850</div>
                        <div className="text-[10px] text-emerald-400">+14% Headroom</div>
                      </div>

                      <div className="p-3 bg-slate-950/80 rounded-xl border border-white/[0.06] space-y-1">
                        <div className="text-[10px] text-slate-400">P99 Latency</div>
                        <div className="text-lg font-bold text-teal-400 font-display">18.4 ms</div>
                        <div className="text-[10px] text-slate-400">Sub-50ms Target</div>
                      </div>

                      <div className="p-3 bg-slate-950/80 rounded-xl border border-white/[0.06] space-y-1">
                        <div className="text-[10px] text-slate-400">Database Connection Pool</div>
                        <div className="text-lg font-bold text-white font-display">42 / 200</div>
                        <div className="text-[10px] text-emerald-400">Healthy (21%)</div>
                      </div>

                      <div className="p-3 bg-slate-950/80 rounded-xl border border-white/[0.06] space-y-1">
                        <div className="text-[10px] text-slate-400">Error Rate (5xx)</div>
                        <div className="text-lg font-bold text-emerald-400 font-display">0.000 %</div>
                        <div className="text-[10px] text-slate-400">Zero Unhandled Faults</div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950/80 rounded-xl border border-white/[0.06] flex items-center justify-between text-[11px]">
                      <span className="text-slate-300">Cluster Replication Status:</span>
                      <span className="text-emerald-400 font-bold">In-Sync • 3 Read Replicas</span>
                    </div>
                  </div>
                )}

                {/* Console Footer */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-400" />
                    <span>Zero-Trust Security Topology</span>
                  </span>
                  <span className="text-emerald-400">All Clusters Active</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
