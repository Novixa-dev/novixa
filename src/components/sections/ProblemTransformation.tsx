'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  FileSpreadsheet,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Workflow,
  Clock,
  Ban,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProblemTransformation: React.FC = () => {
  const { t } = useLanguage();

  const [mode, setMode] = useState<'fragmented' | 'unified'>('unified');

  return (
    <section className="py-20 lg:py-28 bg-slate-900/60 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-semibold">
            <Workflow className="w-3.5 h-3.5" />
            <span>{t('تحول نموذج العمل', 'Workflow Transformation')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('الأعمال لا تحتاج مزيدًا من الأدوات.', 'Businesses don\'t need more tools.')} <br />
            <span className="text-blue-400">{t('تحتاج نظامًا يعمل معًا.', 'They need a system that works together.')}</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t(
              'الاعتماد على الواتساب والإكسل والبرامج غير المترابطة يلتهم وقت فريقك ويتسبب في ضياع الأرباح. انقر أدناه للرؤية التفاعلية لكيف توحد نوڤيكسا هذه الدورة.',
              'Relying on fragmented chats, manual spreadsheets, and disconnected tools drains your team\'s focus. Toggle below to see how Novixa connects everything into one clear engine.'
            )}
          </p>

          {/* Mode Switcher Buttons */}
          <div className="inline-flex items-center gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-xl shadow-lg mt-4">
            <button
              onClick={() => setMode('fragmented')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                mode === 'fragmented'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{t('الوضع المشتت الحالي', 'Fragmented Friction')}</span>
            </button>

            <button
              onClick={() => setMode('unified')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                mode === 'unified'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>{t('منصة نوڤيكسا الموحدة', 'Novixa Unified Engine')}</span>
            </button>
          </div>
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {mode === 'fragmented' ? (
              <motion.div
                key="fragmented-mode"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-950/90 border border-rose-900/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative"
              >
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/80 flex items-center justify-center text-rose-400 font-bold">
                      <Ban className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        {t('بيئة العمل المشتتة واليدوية', 'The Fragmented Operational State')}
                      </h3>
                      <p className="text-xs text-rose-400 font-mono">
                        {t('مستوى الخطأ التشغيلي: مرتفع جدًا (High Risk)', 'Operational Error Rate: High Risk')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-rose-400 bg-rose-950/80 border border-rose-800/60 px-3 py-1 rounded-full font-mono">
                    Fragmented Setup
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Fragmented Item 1 */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-rose-950 text-right rtl:text-right ltr:text-left space-y-2">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm font-display">
                      <MessageCircle className="w-4 h-4" />
                      <span>{t('مجموعات الواتساب', 'WhatsApp Groups')}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t('تداول الطلبات والتعليمات بالرسائل النصية والصوتية يسبب نسيان التفاصيل وتأخير التنفيذ.', 'Orders sent via voice notes or chat lead to missed details and fulfillment delays.')}
                    </p>
                  </div>

                  {/* Fragmented Item 2 */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-rose-950 text-right rtl:text-right ltr:text-left space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-display">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>{t('شيتات الإكسل اليومية', 'Excel Spreadsheets')}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t('إدخال البيانات يدوياً في نهاية اليوم يؤدي لتضارب كميات المخزون وتأخر التقارير.', 'Manual end-of-day data entry causes inventory mismatches and stale reporting.')}
                    </p>
                  </div>

                  {/* Fragmented Item 3 */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-rose-950 text-right rtl:text-right ltr:text-left space-y-2">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-sm font-display">
                      <Clock className="w-4 h-4 text-rose-400" />
                      <span>{t('أنظمة قديمة منفصلة', 'Disconnected Legacy Apps')}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t('نظام نقاط بيع لا يتحدث مع مستودع الفروع، ودعم عملاء غير مطلع على المبيعات.', 'POS system does not talk to inventory, leaving support unaware of order statuses.')}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-rose-300">
                  <span>{t('النتيجة: إرهاق الموظفين، شكاوى العملاء، وضياع الأرباح', 'Outcome: Team burnout, customer complaints, and revenue leakage')}</span>
                  <span className="font-mono text-rose-400 font-bold">-28% Efficiency</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unified-mode"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-950/90 border border-blue-600/50 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-blue-900/20 relative"
              >
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold font-display">
                      N
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        {t('منصة نوڤيكسا الرقمية الموحدة', 'The Novixa Connected Platform')}
                      </h3>
                      <p className="text-xs text-blue-400 font-mono">
                        {t('مستوى الدقة والسرعة: ممتازة (Sub-second Sync)', 'Operational Accuracy: Sub-second Sync')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full font-mono">
                    Unified Platform
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Unified Item 1 */}
                  <div className="p-4 bg-slate-900/90 rounded-xl border border-blue-900/50 text-right rtl:text-right ltr:text-left space-y-2">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-sm font-display">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{t('لوحة تشغيل مركزية', 'Central Operator Hub')}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t('جميع الطلبات والمبيعات تدخل تلقائيًا إلى شاشة واحدة دونحاجة لتدخل بشري مكرر.', 'All customer orders and bookings automatically flow into one live operational queue.')}
                    </p>
                  </div>

                  {/* Unified Item 2 */}
                  <div className="p-4 bg-slate-900/90 rounded-xl border border-blue-900/50 text-right rtl:text-right ltr:text-left space-y-2">
                    <div className="flex items-center gap-2 text-teal-400 font-bold text-sm font-display">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{t('تخصيص ومزامنة المخزون', 'Real-Time Inventory Sync')}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t('خصم المكونات فورياً مع كل عملية بيع مع إرسال تنبيهات تلقائية لإعادة الطلب.', 'Ingredients or stock deducted automatically with every order, sending restock alerts.')}
                    </p>
                  </div>

                  {/* Unified Item 3 */}
                  <div className="p-4 bg-slate-900/90 rounded-xl border border-blue-900/50 text-right rtl:text-right ltr:text-left space-y-2">
                    <div className="flex items-center gap-2 text-sky-400 font-bold text-sm font-display">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{t('ذكاء تحليلي مباشر', 'Live Executive Analytics')}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t('اتخاذ قرارات مبنية على بيانات دقيقة ولحظية من جوالك في أي وقت ومن أي مكان.', 'Executive insights and branch metrics delivered live to your phone anytime.')}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-blue-300">
                  <span>{t('النتيجة: أوتوماتيكية كاملة، سرعة تنفيذ، ونمو أرباح مستدام', 'Outcome: Automated workflows, instant execution, and sustainable scale')}</span>
                  <span className="font-mono text-emerald-400 font-bold">+65% Speed</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
