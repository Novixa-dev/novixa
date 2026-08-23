'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  FileSpreadsheet, MessageCircle, AlertTriangle, CheckCircle, 
  ArrowLeft, ArrowRight, Layers, Sparkles, Workflow, Clock, Ban,
  Zap, Database, ShieldAlert, Cpu, ArrowUpRight, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProblemTransformation: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [mode, setMode] = useState<'fragmented' | 'unified'>('unified');

  return (
    <section className="py-20 lg:py-28 bg-[#070d1d] border-y border-slate-800/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-mono font-medium">
            <Workflow className="w-3.5 h-3.5" />
            <span>{t('معمارية التحول الرقمي والتشغيلي', 'Operational Architecture Transformation')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
            {t('الأعمال لا تحتاج مزيدًا من الأدوات.', 'Enterprises do not need more tools.')} <br />
            <span className="text-slate-300">
              {t('تحتاج نظامًا يعمل معًا كوحدة واحدة.', 'They need a unified, resilient software engine.')}
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-arabic">
            {t(
              'تشتت العمليات بين شات الواتساب، ملفات الإكسل، والأنظمة المغلقة يخلق اختناقات يومية. قارن أدناه كيف تعيد معمارية نوڤيكسا ربط كل نقطة تشغيلية في الوقت الفعلي.',
              'Data silos between chat messages, spreadsheets, and disconnected legacy software create massive operational friction. Compare below how Novixa unifies your entire pipeline.'
            )}
          </p>

          {/* Mode Switcher Buttons */}
          <div className="inline-flex items-center gap-2 p-1.5 bg-[#030712] border border-slate-800 rounded-xl shadow-xl mt-4">
            <button
              onClick={() => setMode('fragmented')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                mode === 'fragmented'
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800/80 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{t('الواقع المشتت (Friction)', 'Fragmented Setup')}</span>
            </button>

            <button
              onClick={() => setMode('unified')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                mode === 'unified'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>{t('منظومة نوڤيكسا المتصلة (Novixa Core)', 'Novixa Unified Engine')}</span>
            </button>
          </div>
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {mode === 'fragmented' ? (
              <motion.div
                key="fragmented-mode"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0b1120] border border-rose-900/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/80 flex items-center justify-center text-rose-400 font-bold">
                      <Ban className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        {t('بيئة العمل المجزأة والأدوات المنفصلة', 'Fragmented Architecture & Disconnected Data')}
                      </h3>
                      <p className="text-xs text-rose-400 font-mono">
                        {t('معدل الخطأ اليدوي: مرتفع · وقت المزامنة: 3 - 6 ساعات', 'Manual Error Rate: High · Sync Latency: 3-6 Hours')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-rose-400 bg-rose-950/80 border border-rose-800/60 px-3 py-1 rounded-full font-mono shrink-0 w-fit">
                    High Risk Friction
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Fragmented Item 1 */}
                  <div className="p-4 bg-[#030712] rounded-xl border border-rose-950 text-right rtl:text-right ltr:text-left space-y-2">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm font-display">
                      <MessageCircle className="w-4 h-4" />
                      <span>{t('رسائل متناثرة بالواتساب', 'WhatsApp & Voice Notes')}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {t('أوامر البيع والتعديلات تضيع داخل محادثات غير رسمية دون رقم مرجعي أو تدقيق زمني.', 'Orders and instructions are lost in unstructured chat threads with zero audit trail.')}
                    </p>
                  </div>

                  {/* Fragmented Item 2 */}
                  <div className="p-4 bg-[#030712] rounded-xl border border-rose-950 text-right rtl:text-right ltr:text-left space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-display">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>{t('شيتات إكسل مكررة', 'Manual Excel Trackers')}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {t('إدخال البيانات يدوياً في نهاية الوردية يسبب تضارب جرد المخازن وتأخر التسويات المالية.', 'Manual end-of-day spreadsheet reconciliation leads to stock discrepancies.')}
                    </p>
                  </div>

                  {/* Fragmented Item 3 */}
                  <div className="p-4 bg-[#030712] rounded-xl border border-rose-950 text-right rtl:text-right ltr:text-left space-y-2">
                    <div className="flex items-center gap-2 text-slate-300 font-bold text-sm font-display">
                      <Clock className="w-4 h-4 text-rose-400" />
                      <span>{t('أنظمة قديمة معزولة', 'Isolated Legacy Systems')}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {t('نظام المحاسبة معزول عن نقاط البيع، وفريق الإدارة يتخذ قرارات بناءً على تقارير أسبوعية متأخرة.', 'Accounting is disconnected from point of sale, forcing decisions on outdated weekly reports.')}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-rose-300 gap-2">
                  <span>{t('النتيجة: إرهاق تشغيلي، شكاوى عملاء متكررة، وتسريب هوامش الربح', 'Outcome: Team burnout, customer friction, and hidden revenue leakage')}</span>
                  <span className="font-mono text-rose-400 font-bold">-32% Operational Throughput</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unified-mode"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0b1120] border border-blue-600/50 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-blue-900/20 relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold font-display">
                      N
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        {t('منظومة نوڤيكسا الرقمية الموحدة', 'The Novixa Unified Enterprise Engine')}
                      </h3>
                      <p className="text-xs text-blue-400 font-mono">
                        {t('معدل المزامنة: لحظي (< 14ms) · أتمتة كاملة للبيانات', 'Real-Time Sync: Sub-14ms · Full Event-Driven Automation')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full font-mono shrink-0 w-fit">
                    Unified Cloud Architecture
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Unified Item 1 */}
                  <div className="p-4 bg-[#030712] rounded-xl border border-blue-900/50 text-right rtl:text-right ltr:text-left space-y-2">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-sm font-display">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{t('طابور أحداث مركزي فوري', 'Universal Event Bus')}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t('كل طلب أو حركة بيعية يتم توجيهها لحظياً إلى المطبخ، الفروع، ولوحة التحكم بدون أي إدخال يدوي.', 'Every transaction instantly streams to kitchen displays and accounting with zero manual re-entry.')}
                    </p>
                  </div>

                  {/* Unified Item 2 */}
                  <div className="p-4 bg-[#030712] rounded-xl border border-blue-900/50 text-right rtl:text-right ltr:text-left space-y-2">
                    <div className="flex items-center gap-2 text-teal-400 font-bold text-sm font-display">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{t('مزامنة المخزون متعدد الفروع', 'Multi-Branch Inventory Sync')}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t('خصم فوري للمكونات والمنتجات عند البيع مع تنبيهات تلقائية لإعادة الشراء والتوريد.', 'Live ingredient deduction and automated restock alerts prevent shortages before they occur.')}
                    </p>
                  </div>

                  {/* Unified Item 3 */}
                  <div className="p-4 bg-[#030712] rounded-xl border border-blue-900/50 text-right rtl:text-right ltr:text-left space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm font-display">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{t('تيليمتري ومؤشرات قيادية', 'Live Telemetry & Pulse AI')}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t('لوحة قيادة تفاعلية بجوالك تحلل اتجاهات الإيرادات وملاحظات الفريق التشغيلي بالذكاء الاصطناعي.', 'Executive dashboards analyze real-time revenue velocity and employee pulse notes automatically.')}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-300 gap-2">
                  <span>{t('النتيجة: استقرار بنسبة 99.99%، وضوح تنفيذي كامل، وتسريع نمو المبيعات', 'Outcome: 99.99% uptime, complete executive clarity, and accelerated revenue expansion')}</span>
                  <span className="font-mono text-emerald-400 font-bold">+74% Operational Velocity</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

