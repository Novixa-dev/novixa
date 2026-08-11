'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Activity, MessageSquare, Sparkles, ShieldCheck, CheckCircle2, 
  BarChart2, ArrowLeft, ArrowRight, Send, Filter, ThumbsUp, HeartPulse
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PulseSection: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Interactive Pulse Simulator State
  const [category, setCategory] = useState<'operational' | 'culture' | 'idea'>('operational');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [feedbackList, setFeedbackList] = useState<
    { id: string; text: string; cat: string; score: number; likes: number; status: string }[]
  >([
    {
      id: '1',
      text: t('نحتاج ربط أجهزة الطلب الذاتي للمطعم بمستودع الفروع بشكل مباشر لتفادي نفاد الأصناف.', 'Need direct POS sync to prevent stockout during weekend rush.'),
      cat: 'operational',
      score: 92,
      likes: 14,
      status: t('قيد المراجعة القيادية', 'Under Exec Review')
    },
    {
      id: '2',
      text: t('اقتراح بتوفير جلسة تدريبية أسبوعية لمهارات خدمة العملاء وتقنيات التعامل السريع.', 'Suggestion for weekly customer service masterclasses for new staff.'),
      cat: 'culture',
      score: 88,
      likes: 21,
      status: t('تم الاعتماد للتنفيذ', 'Approved for Action')
    }
  ]);

  const [submittedMessage, setSubmittedMessage] = useState<boolean>(false);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const rawText = feedbackText;
    setFeedbackText('');

    try {
      const res = await fetch('/api/pulse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedback: rawText,
          category,
          author: isAnonymous ? 'عضو فريق مجهول' : 'مدير التشغيل',
          role: category === 'operational' ? 'العمليات الميدانية' : 'التطوير والتخطيط'
        })
      });

      const data = await res.json();
      if (data.success && data.item) {
        setFeedbackList([
          {
            id: data.item.id,
            text: data.item.text,
            cat: category,
            score: data.item.score,
            likes: 1,
            status: t('تم تحليله بالسيرفر المحلي', 'Server Analyzed & Processed')
          },
          ...feedbackList
        ]);
      } else {
        // Fallback local addition if API fails
        setFeedbackList([
          {
            id: Date.now().toString(),
            text: rawText,
            cat: category,
            score: Math.floor(Math.random() * 15) + 82,
            likes: 1,
            status: t('تم التسجيل في النظام Local', 'Recorded Locally')
          },
          ...feedbackList
        ]);
      }
    } catch {
      setFeedbackList([
        {
          id: Date.now().toString(),
          text: rawText,
          cat: category,
          score: Math.floor(Math.random() * 15) + 82,
          likes: 1,
          status: t('تم التسجيل في النظام Local', 'Recorded Locally')
        },
        ...feedbackList
      ]);
    }

    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  const handleUpvote = (id: string) => {
    setFeedbackList(
      feedbackList.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-900/80 border-y border-slate-800 relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[500px] bg-teal-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950 border border-teal-800/80 text-teal-300 text-xs font-semibold shadow-sm">
            <HeartPulse className="w-4 h-4 text-teal-400 animate-pulse" />
            <span>{t('تسليط الضوء على المنتج: Novixa Pulse', 'Product Spotlight: Novixa Pulse')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            {t('نبض — صوت الموظفين،', 'Pulse — Employee Voice,')} <br />
            <span className="text-teal-400">{t('أصبح جزءًا من القرار المؤسسي.', 'Transformed Into Strategic Action.')}</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t(
              'منصة سحابية متكاملة للشركات تجمع الملاحظات التشغيلية والمقترحات والشكاوى من الميدان، وتحللها بالذكاء الاصطناعي لتقديم مؤشر صحة تشغيلية (Pulse Score) لحظي للقيادة.',
              'A modern enterprise SaaS engine capturing frontline notes, analyzing sentiments via AI, and presenting executives with an operational health dashboard.'
            )}
          </p>
        </div>

        {/* Workflow Lifecycle Diagram */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14 text-center">
          {[
            { step: '01', labelAr: 'جمع الملاحظات', labelEn: 'Collect', icon: MessageSquare },
            { step: '02', labelAr: 'تصفية وتصنيف', labelEn: 'AI Filter', icon: Filter },
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

        {/* Live Interactive Pulse Demo Interface */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 bg-slate-950/90 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-5 space-y-5 text-right rtl:text-right ltr:text-left">
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
                {t('تجربة المنصة التفاعلية', 'Interactive Live Demo')}
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                {t('تجربة إرسال ملاحظة تشغيلية', 'Submit Employee Note')}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {t('جرب كتابة مقترح أو مشكلة تشغيلية ورؤية كيف يصنفها الذكاء الاصطناعي بالثواني.', 'Test typing a note to watch real-time AI sentiment classification.')}
              </p>
            </div>

            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              {/* Category Picker */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold block">
                  {t('تصنيف الملاحظة:', 'Select Category:')}
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'operational', ar: 'تشغيلي', en: 'Operations' },
                    { id: 'culture', ar: 'بيئة العمل', en: 'Culture' },
                    { id: 'idea', ar: 'فكرة نظام', en: 'System Idea' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id as any)}
                      className={`py-2 px-2 rounded-lg border font-medium text-center transition-all ${
                        category === c.id
                          ? 'bg-teal-600 text-white border-teal-500 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t(c.ar, c.en)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold block">
                  {t('نص المقترح أو الشكوى التشغيلية:', 'Your Note / Proposal:')}
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder={t('مثال: نحتاج تحسين عملية استلام الطلبات في الفرع لحل زحام عطلة نهاية الأسبوع...', 'e.g. Need automated order routing to resolve weekend queue bottlenecks...')}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                ></textarea>
              </div>

              {/* Anonymous Checkbox & Submit */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-teal-500 focus:ring-0"
                  />
                  <span>{t('إرسال بهوية مجهولة (Anonymous)', 'Submit Anonymously')}</span>
                </label>

                <button
                  type="submit"
                  disabled={!feedbackText.trim()}
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-teal-600/30 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('إرسال للنظام', 'Process Note')}</span>
                </button>
              </div>

              {submittedMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('تم تحليل الملاحظة وإدراجها في لوحة القيادة بنجاح!', 'Note classified and added to Executive Board!')}</span>
                </motion.div>
              )}
            </form>
          </div>

          {/* Right Column: Live Executive Pulse Dashboard Simulator */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-5">
            {/* Top Dashboard Metrics */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-950 border border-teal-800 text-teal-300">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold font-display text-white">NOVIXA PULSE SCORE</div>
                  <div className="text-xs text-slate-400 font-arabic">{t('مؤشر صحة بيئة العمل والتشغيل', 'Executive Operational Health Index')}</div>
                </div>
              </div>

              <div className="text-right rtl:text-right ltr:text-left">
                <div className="text-2xl font-extrabold font-display text-teal-400">89.4 / 100</div>
                <div className="text-[10px] text-emerald-400 font-mono">+4.2% {t('هذا الشهر', 'this month')}</div>
              </div>
            </div>

            {/* Submitted Feedback Stream */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{t('الملاحظات النشطة والمصنفة (AI Stream)', 'Live AI Classified Feedback Stream')}</span>
                <span className="text-teal-400 font-bold">{feedbackList.length} {t('ملاحظات', 'Items')}</span>
              </div>

              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {feedbackList.map((item) => (
                  <div key={item.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-950 text-teal-300 border border-teal-800/60">
                        {item.cat === 'operational' ? t('تشغيلي', 'Operations') : item.cat === 'culture' ? t('بيئة عمل', 'Culture') : t('فكرة', 'Idea')}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.status}</span>
                    </div>

                    <p className="text-slate-200 leading-relaxed font-arabic">{item.text}</p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-[11px] text-slate-400">
                      <span>Pulse Relevance Score: <strong className="text-teal-400">{item.score}%</strong></span>
                      <button
                        onClick={() => handleUpvote(item.id)}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3 text-teal-400" />
                        <span>{item.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-500 font-mono">
                {t('منصة Novixa Pulse مجهزة بأمن بيانات SOC2 وحماية خصوصية طاقم العمل بالكامل.', 'Novixa Pulse is equipped with SOC2 security and complete employee privacy safeguards.')}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
