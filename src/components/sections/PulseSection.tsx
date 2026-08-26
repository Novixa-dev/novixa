'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Activity, MessageSquare, Sparkles, CheckCircle2,
  BarChart2, Filter, ThumbsUp, HeartPulse, Lock
} from 'lucide-react';

const SAMPLE_FEEDBACK: { id: string; text: { ar: string; en: string }; cat: 'operational' | 'culture' | 'idea'; likes: number; status: { ar: string; en: string } }[] = [
  {
    id: '1',
    text: {
      ar: 'نحتاج ربط أجهزة الطلب الذاتي للمطعم بمستودع الفروع بشكل مباشر لتفادي نفاد الأصناف.',
      en: 'We need direct POS-to-warehouse sync to prevent stockouts during weekend rush.',
    },
    cat: 'operational',
    likes: 14,
    status: { ar: 'قيد المراجعة القيادية', en: 'Under review' },
  },
  {
    id: '2',
    text: {
      ar: 'اقتراح بتوفير جلسة تدريبية أسبوعية لمهارات خدمة العملاء للموظفين الجدد.',
      en: 'Suggestion for a weekly customer-service training session for new staff.',
    },
    cat: 'culture',
    likes: 21,
    status: { ar: 'تم الاعتماد للتنفيذ', en: 'Approved for action' },
  },
];

const CATEGORY_LABEL: Record<string, { ar: string; en: string }> = {
  operational: { ar: 'تشغيلي', en: 'Operations' },
  culture: { ar: 'بيئة عمل', en: 'Culture' },
  idea: { ar: 'فكرة', en: 'Idea' },
};

export const PulseSection: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const [category, setCategory] = useState<'operational' | 'culture' | 'idea'>('operational');

  const visibleFeedback = SAMPLE_FEEDBACK.filter((item) => item.cat === category || category === 'operational');

  return (
    <section className="py-20 lg:py-28 bg-slate-900/80 border-y border-slate-800 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[500px] bg-teal-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950 border border-teal-800/80 text-teal-300 text-xs font-semibold shadow-sm">
            <HeartPulse className="w-4 h-4 text-teal-400" />
            <span>{t('تسليط الضوء على المنتج: Novixa Pulse', 'Product Spotlight: Novixa Pulse')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            {t('نبض — صوت الموظفين،', 'Pulse — Employee Voice,')} <br />
            <span className="text-teal-400">{t('يصل إلى صناع القرار.', 'Reaching Decision-Makers.')}</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t(
              'منصة تجمع ملاحظات ومقترحات الفريق التشغيلي، وتصنّفها حسب الفئة والأولوية، لتصل إلى القيادة بوضوح بدل أن تضيع في المحادثات.',
              'A platform that collects frontline notes and suggestions, sorts them by category and priority, and surfaces them to leadership clearly instead of getting lost in chat threads.'
            )}
          </p>
        </div>

        {/* Workflow Lifecycle Diagram */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14 text-center">
          {[
            { step: '01', labelAr: 'جمع الملاحظات', labelEn: 'Collect', icon: MessageSquare },
            { step: '02', labelAr: 'تصنيف وفرز', labelEn: 'Sort & Filter', icon: Filter },
            { step: '03', labelAr: 'قياس النبض', labelEn: 'Measure Score', icon: BarChart2 },
            { step: '04', labelAr: 'ترتيب الأولويات', labelEn: 'Prioritize', icon: Activity },
            { step: '05', labelAr: 'مناقشة الفريق', labelEn: 'Discuss', icon: Sparkles },
            { step: '06', labelAr: 'اتخاذ القرار', labelEn: 'Act & Resolve', icon: CheckCircle2 },
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800/80 text-teal-300 flex items-center justify-center mx-auto text-xs font-bold font-mono">
                  {item.step}
                </div>
                <div className="font-display font-bold text-xs text-white">{t(item.labelAr, item.labelEn)}</div>
              </div>
            );
          })}
        </div>

        {/* Static Illustrative Product Preview */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 bg-slate-950/90 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-5 text-right rtl:text-right ltr:text-left">
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
                {t('معاينة توضيحية للمنتج', 'Illustrative Product Preview')}
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                {t('كيف تُصنَّف الملاحظات', 'How notes get sorted')}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {t(
                  'استعرض فئات التصنيف — هذه بيانات توضيحية لشرح فكرة المنتج، وليست بيانات حية من عميل.',
                  'Browse the category filters below — this is illustrative sample data to explain the product concept, not live customer data.'
                )}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold block">
                {t('تصفية حسب الفئة:', 'Filter by category:')}
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['operational', 'culture', 'idea'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`py-2 px-2 rounded-lg border font-medium text-center transition-all ${
                      category === c
                        ? 'bg-teal-600 text-white border-teal-500 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t(CATEGORY_LABEL[c].ar, CATEGORY_LABEL[c].en)}
                  </button>
                ))}
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300 pt-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{t('تقديم ملاحظات بهوية معلنة أو مجهولة', 'Anonymous or attributed submission')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{t('تصنيف حسب الفئة والقسم والأولوية', 'Category, department, and priority tagging')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{t('لوحة تنفيذية لمتابعة حالة كل ملاحظة', 'An executive board to track each item to resolution')}</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Static Dashboard Mockup */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-950 border border-teal-800 text-teal-300">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold font-display text-white">NOVIXA PULSE</div>
                  <div className="text-xs text-slate-400 font-arabic">{t('لوحة القيادة التنفيذية (نموذج توضيحي)', 'Executive dashboard (illustrative mockup)')}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{t('نموذج للملاحظات المصنّفة', 'Sample sorted feedback')}</span>
                <span className="text-teal-400 font-bold">{visibleFeedback.length} {t('عناصر', 'items')}</span>
              </div>

              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {visibleFeedback.map((item) => (
                  <div key={item.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-950 text-teal-300 border border-teal-800/60">
                        {t(CATEGORY_LABEL[item.cat].ar, CATEGORY_LABEL[item.cat].en)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{t(item.status.ar, item.status.en)}</span>
                    </div>

                    <p className="text-slate-200 leading-relaxed font-arabic">{t(item.text.ar, item.text.en)}</p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-[11px] text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <ThumbsUp className="w-3 h-3 text-teal-400" />
                        {item.likes}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-center flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3 text-slate-500" />
              <span className="text-[11px] text-slate-500 font-mono">
                {t('التصميم مبني على مبادئ خصوصية وعزل بيانات صارمة.', 'Designed around strict data privacy and isolation principles.')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
