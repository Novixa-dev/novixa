'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { ViewType } from '../../types';
import { 
  Sparkles, ArrowLeft, ArrowRight, Shield, Zap, Layers, Cpu, 
  CheckCircle2, RefreshCw, BarChart3, Database, MessageSquare, 
  Building2, Users, ShoppingCart, Lock, Terminal, Play, Server,
  Radio, Check, Code2, Globe2, Gauge
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  onNavigate?: (view: ViewType) => void;
}

type WorkbenchTab = 'pipeline' | 'schema' | 'telemetry';

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<WorkbenchTab>('pipeline');
  const [isSimulating, setIsSimulating] = useState(false);
  const [eventLogs, setEventLogs] = useState<Array<{ id: string; time: string; event: string; latency: string; status: 'ok' | 'sync' }>>([
    { id: 'evt-904', time: '12:04:18.291', event: 'QR_ORDER_DISPATCHED #1084', latency: '4.2ms', status: 'ok' },
    { id: 'evt-903', time: '12:04:18.110', event: 'POS_STATE_RECONCILED [Branch-02]', latency: '7.8ms', status: 'ok' },
    { id: 'evt-902', time: '12:04:17.940', event: 'INVENTORY_DEDUCTED_STOCK [SKU-882]', latency: '3.1ms', status: 'ok' },
    { id: 'evt-901', time: '12:04:17.650', event: 'PULSE_SENTIMENT_EVALUATED', latency: '12.4ms', status: 'ok' }
  ]);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    const newId = `evt-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
    const newLog = {
      id: newId,
      time: timeStr,
      event: `EDGE_EVENT_BROADCAST [Tenant_${Math.floor(1 + Math.random() * 5)}]`,
      latency: `${(2.8 + Math.random() * 5).toFixed(1)}ms`,
      status: 'ok' as const
    };

    setTimeout(() => {
      setEventLogs(prev => [newLog, ...prev.slice(0, 4)]);
      setIsSimulating(false);
    }, 600);
  };

  const enterpriseSectors = [
    { nameAr: 'سلاسل المطابخ والضيافة', nameEn: 'Multi-Branch F&B & POS', code: 'SLA-POS' },
    { nameAr: 'الخدمات اللوجستية والأسطول', nameEn: 'Fleet & Logistics Dispatch', code: 'LOG-FLEET' },
    { nameAr: 'المنصات الطبية والعيادات', nameEn: 'Healthcare & Patient Flow', code: 'MED-PORTAL' },
    { nameAr: 'الفوترة والمحافظ الرقمية', nameEn: 'FinTech & B2B Escrow', code: 'FIN-ESCROW' }
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#030712]">
      {/* Precision Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-35 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Authoritative Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-right rtl:text-right ltr:text-left">
            {/* Engineering Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-blue-400 text-xs font-mono font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              <span>{t('هندسة برمجيات المؤسسات · أنظمة سحابية متعددة المستأجرين', 'Enterprise Systems · Multi-Tenant Cloud Architecture')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display text-white leading-[1.25] tracking-tight">
              {t('نبني التقنية التي تجعل', 'Engineered for Scale.')} <br />
              <span className="text-white">
                {t('أعمالك أقوى وأسرع توسعًا.', 'Digital Systems Powering Modern Enterprise.')}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-arabic font-normal">
              {t(
                'نحوّل العمليات التشغيلية المعقدة في الشركات إلى منصات سحابية عالية الاستقرار، مصممة بأعلى معايير هندسة البرمجيات لتضمن مزامنة لحظية، أمانًا عاليًا، وقابلية توسع غير محدودة.',
                'We engineer resilient multi-tenant cloud platforms that unify fragmented operations into high-throughput, event-driven digital engines built for limitless enterprise scale.'
              )}
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                href={`/${language}/start-project`}
                className="group inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-blue-900/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>{t('ابدأ مشروعك وابنِ نظامك', 'Start Architecture Discovery')}</span>
                <ArrowIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>

              <Link
                href={`/${language}/solutions`}
                className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-medium text-sm sm:text-base px-5 py-3.5 rounded-xl transition-all duration-200"
              >
                <Layers className="w-4 h-4 text-blue-400" />
                <span>{t('استكشف الحلول والمعمارية', 'Explore Solutions')}</span>
              </Link>
            </div>

            {/* Verified Architectural Metrics Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-6 text-right rtl:text-right ltr:text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">&lt; 14ms</div>
                <div className="text-xs text-slate-400 font-arabic mt-0.5">{t('متوسط استجابة الشبكة Edge', 'Global Edge Latency')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-blue-400 tracking-tight">99.99%</div>
                <div className="text-xs text-slate-400 font-arabic mt-0.5">{t('ضمان التوفر SLA', 'High-Availability SLA')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-teal-400 tracking-tight">Zero-Lock</div>
                <div className="text-xs text-slate-400 font-arabic mt-0.5">{t('ملكية شيفرة ومعمارية كاملة', 'Full Code Ownership')}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Architecture Workbench */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#0b1120] rounded-2xl p-5 border border-slate-800/90 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              
              {/* Workbench Window Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <span className="text-[11px] font-mono text-slate-400 mr-2 rtl:mr-0 rtl:ml-2">novixa-workbench // v2.6.4</span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-[#030712] p-1 rounded-lg border border-slate-800 text-[11px]">
                  <button
                    onClick={() => setActiveTab('pipeline')}
                    className={`px-2.5 py-1 rounded-md transition-all font-mono ${
                      activeTab === 'pipeline'
                        ? 'bg-blue-600 text-white font-medium shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Event Bus
                  </button>
                  <button
                    onClick={() => setActiveTab('schema')}
                    className={`px-2.5 py-1 rounded-md transition-all font-mono ${
                      activeTab === 'schema'
                        ? 'bg-blue-600 text-white font-medium shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Schema
                  </button>
                  <button
                    onClick={() => setActiveTab('telemetry')}
                    className={`px-2.5 py-1 rounded-md transition-all font-mono ${
                      activeTab === 'telemetry'
                        ? 'bg-blue-600 text-white font-medium shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Metrics
                  </button>
                </div>
              </div>

              {/* Tab 1: Live Event Pipeline */}
              {activeTab === 'pipeline' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                      <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>Live Event Dispatch Bus</span>
                    </div>
                    <button
                      onClick={runSimulation}
                      disabled={isSimulating}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[11px] font-mono transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <Play className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
                      <span>{isSimulating ? 'Dispatching...' : 'Simulate Packet'}</span>
                    </button>
                  </div>

                  {/* Visual Node Pipeline */}
                  <div className="grid grid-cols-4 gap-1.5 p-2 bg-[#030712] rounded-xl border border-slate-800/80 text-[10px] font-mono text-center">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                      <div className="text-blue-400 font-bold">QR / App</div>
                      <div className="text-slate-500 mt-0.5">Ingress</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                      <div className="text-teal-400 font-bold">Edge API</div>
                      <div className="text-slate-500 mt-0.5">&lt; 5ms Route</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                      <div className="text-purple-400 font-bold">PostgreSQL</div>
                      <div className="text-slate-500 mt-0.5">RLS Tenant</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                      <div className="text-emerald-400 font-bold">POS & KDS</div>
                      <div className="text-slate-500 mt-0.5">Live Sync</div>
                    </div>
                  </div>

                  {/* Event Log Stream */}
                  <div className="space-y-1.5 max-h-[160px] overflow-hidden font-mono text-[11px]">
                    {eventLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#030712]/90 border border-slate-800/60"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span className="text-slate-400 text-[10px]">{log.time}</span>
                          <span className="text-slate-200 truncate">{log.event}</span>
                        </div>
                        <span className="text-emerald-400 text-[10px] shrink-0 font-bold">{log.latency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Schema Inspector */}
              {activeTab === 'schema' && (
                <div className="p-3 bg-[#030712] rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-2 overflow-x-auto">
                  <div className="text-slate-400">// Tenant Isolation Schema Definition</div>
                  <pre className="text-blue-300 leading-relaxed font-mono text-[11px]">
{`interface TenantContext {
  tenantId: UUID;
  schema: "isolated_tenant";
  roles: Array<RolePermission>;
  encryptionKey: AES256_GCM;
}

export async function dispatchTx(
  ctx: TenantContext, 
  payload: OrderPayload
): Promise<SyncResult> {
  // Deterministic state machine
  return await eventBus.emit(ctx, payload);
}`}
                  </pre>
                </div>
              )}

              {/* Tab 3: Telemetry & SLA */}
              {activeTab === 'telemetry' && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-[#030712] rounded-xl border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-400">API P99 LATENCY</div>
                      <div className="text-lg font-bold font-mono text-emerald-400">11.4 ms</div>
                      <div className="text-[10px] text-slate-400 mt-1">Edge Cloud Router</div>
                    </div>
                    <div className="p-3 bg-[#030712] rounded-xl border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-400">DB CONCURRENCY</div>
                      <div className="text-lg font-bold font-mono text-blue-400">12,000 req/s</div>
                      <div className="text-[10px] text-slate-400 mt-1">Read Replica Pool</div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#030712] rounded-xl border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-teal-400" />
                      <span>Zero Cold-Start Edge Execution</span>
                    </div>
                    <span className="text-emerald-400 text-[11px]">Active</span>
                  </div>
                </div>
              )}

              {/* Bottom Security Certificate Strip */}
              <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>256-Bit Encrypted Data Sync</span>
                </span>
                <span className="text-slate-400">Edge Gateway: Active</span>
              </div>
            </div>
          </div>

        </div>

        {/* Enterprise Verticals & Credibility Strip */}
        <div className="mt-16 pt-8 border-t border-slate-800/60">
          <div className="text-center md:text-right rtl:md:text-right ltr:md:text-left mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {t('قطاعات معمارية متخصصة وأنظمة عالية الاعتمادية', 'Specialized Enterprise Architecture & Operational Verticals')}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {enterpriseSectors.map((sector, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-medium text-slate-200 font-display">
                    {t(sector.nameAr, sector.nameEn)}
                  </div>
                  <div className="text-[10px] font-mono text-blue-400/80 mt-0.5">
                    {sector.code}
                  </div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/70"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

