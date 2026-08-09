'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { ViewType } from '../../types';
import { 
  Sparkles, ArrowLeft, ArrowRight, Shield, Zap, Layers, Cpu, 
  CheckCircle2, RefreshCw, BarChart3, Database, MessageSquare, 
  Building2, Users, ShoppingCart, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  onNavigate?: (view: ViewType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // State for interactive architecture visual demo
  const [activeTab, setActiveTab] = useState<'fragmented' | 'unified'>('unified');
  const [selectedNode, setSelectedNode] = useState<string>('core');

  const nodes = [
    { id: 'orders', nameAr: 'المبيعات والطلبات', nameEn: 'Orders & Sales', icon: ShoppingCart, count: '1,420 / اليوم' },
    { id: 'inventory', nameAr: 'المخزون والفروع', nameEn: 'Inventory & Branches', icon: Database, count: '8 فروع موحدة' },
    { id: 'customers', nameAr: 'العملاء والولاء', nameEn: 'Customers & Loyalty', icon: Users, count: '99.4% رضى' },
    { id: 'pulse', nameAr: 'نبض التشغيل (AI)', nameEn: 'Pulse Analytics', icon: BarChart3, count: 'تنبؤ لحظي' },
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-950">
      {/* Background Glowing Grids & Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-gradient pointer-events-none opacity-80"></div>
      <div className="absolute -top-24 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-5 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-line-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left / Main Text Side */}
          <div className="lg:col-span-7 space-y-6 text-right rtl:text-right ltr:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>{t('Software Engineering · Digital Products · Business Platforms', 'Software Engineering · Digital Products · Business Platforms')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.25] tracking-tight">
              {t('نبني التقنية التي تجعل', 'Engineered for Growth.')} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-teal-300 bg-clip-text text-transparent">
                {t('أعمالك أقوى وأكثر توسعًا.', 'Building Systems That Power Scale.')}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-arabic font-normal">
              {t(
                'نحوّل الأفكار والعمليات التشغيلية المعقدة إلى منتجات ومنصات رقمية حديثة، مصممة بأعلى معايير الهندسة لتنفذ اليوم وتتوسع مع شركتك غدًا.',
                'We transform complex operational workflows into modern digital platforms—engineered to execute flawlessly today and scale effortlessly tomorrow.'
              )}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/${language}/start-project`}
                className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-xl shadow-blue-600/30 transition-all duration-300 hover:shadow-blue-600/50 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4 text-blue-200" />
                <span>{t('ابدأ مشروعك معنا', 'Start Your Project')}</span>
                <ArrowIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>

              <Link
                href={`/${language}/products`}
                className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-medium text-sm sm:text-base px-5 py-3.5 rounded-xl transition-all duration-200"
              >
                <Layers className="w-4 h-4 text-teal-400" />
                <span>{t('اكتشف ما نبنيه', 'Explore Our Products')}</span>
              </Link>
            </div>

            {/* Proof Points Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-right rtl:text-right ltr:text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-display text-white">100%</div>
                <div className="text-xs text-slate-400 font-arabic">{t('معمارية مخصصة', 'Custom Architecture')}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-display text-blue-400">High Standard</div>
                <div className="text-xs text-slate-400 font-arabic">{t('معايير أمان موثوقة', 'Security Standards')}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-display text-teal-400">99.9%</div>
                <div className="text-xs text-slate-400 font-arabic">{t('استقرار التشغيل', 'Uptime Guarantee')}</div>
              </div>
            </div>
          </div>

          {/* Right / Interactive Architecture System Visual */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-2xl p-5 border border-slate-800/90 shadow-2xl bg-slate-900/90 relative overflow-hidden">
              {/* Top Control Toggle */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">novixa-system-v2.6</span>
                </div>

                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px] font-medium">
                  <button
                    onClick={() => setActiveTab('fragmented')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activeTab === 'fragmented'
                        ? 'bg-rose-950 text-rose-300 font-semibold border border-rose-800/50'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t('أدوات مجزأة', 'Fragmented')}
                  </button>
                  <button
                    onClick={() => setActiveTab('unified')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activeTab === 'unified'
                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t('نظام نوڤيكسا', 'Novixa Core')}
                  </button>
                </div>
              </div>

              {/* Interactive Visual Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'fragmented' ? (
                  <motion.div
                    key="fragmented"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 py-2"
                  >
                    <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs text-rose-300 flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                      <span>
                        {t(
                          'تشتت البيانات بين الواتساب وشيتات الإكسل والورق يسبب أخطاء تشغيلية وبطء شديد في المبيعات.',
                          'Data scattered across WhatsApp, manual spreadsheets, and physical paper leads to constant fulfillment errors.'
                        )}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-slate-400">
                        <div className="text-slate-200 font-semibold flex items-center gap-1.5 mb-1">
                          <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                          <span>WhatsApp & Chats</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{t('طلبات ضائعة وبدون أتمتة', 'Lost orders & zero automation')}</p>
                      </div>

                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-slate-400">
                        <div className="text-slate-200 font-semibold flex items-center gap-1.5 mb-1">
                          <Database className="w-3.5 h-3.5 text-amber-400" />
                          <span>Excel Files</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{t('تكرار يدوّي وتعارض مخزون', 'Manual entry & stock conflict')}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="unified"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 py-1"
                  >
                    {/* Core Hub */}
                    <div className="p-4 bg-gradient-to-br from-blue-950/80 via-slate-900 to-slate-950 rounded-xl border border-blue-600/40 relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold font-display text-xs">
                            N
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white font-display">NOVIXA CORE SYSTEM</div>
                            <div className="text-[10px] text-blue-300 font-mono">Status: Connected & Operational</div>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-800 font-mono">
                          LIVE HIGH SPEED
                        </span>
                      </div>

                      {/* Interactive Connected Nodes */}
                      <div className="grid grid-cols-2 gap-2">
                        {nodes.map((node) => {
                          const IconComp = node.icon;
                          const isSelected = selectedNode === node.id;
                          return (
                            <button
                              key={node.id}
                              onClick={() => setSelectedNode(node.id)}
                              className={`p-2.5 rounded-lg border text-right rtl:text-right ltr:text-left transition-all ${
                                isSelected
                                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 text-xs font-semibold mb-0.5">
                                <IconComp className="w-3.5 h-3.5 text-blue-400" />
                                <span>{t(node.nameAr, node.nameEn)}</span>
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">{node.count}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Node Insight Detail */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-teal-400" />
                        <span className="text-slate-300">
                          {selectedNode === 'orders' && t('ربط مباشر بين كيو آر المبيعات والمطبخ', 'Instant order routing to Kitchen POS')}
                          {selectedNode === 'inventory' && t('مزامنة المستودع تلقائيًا بعد كل عملية بيع', 'Auto ingredient deduction per order')}
                          {selectedNode === 'customers' && t('ملف عميل موحد مع نقاط الولاء المباشرة', 'Universal loyalty ID and customer history')}
                          {selectedNode === 'pulse' && t('تصنيف الذكاء الاصطناعي للملاحظات التشغيلية', 'AI sentiment classification on operational logs')}
                        </span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom System Status */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-blue-400" />
                  <span>256-Bit Encrypted Data Sync</span>
                </span>
                <span className="text-slate-400">Response: 14ms</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
