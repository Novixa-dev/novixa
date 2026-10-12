'use client';

import { useState } from 'react';
import { Plus, X, HelpCircle } from 'lucide-react';
import { createFaqAction } from '@/app/admin/actions';

interface CreateFaqModalProps {
  lang: 'ar' | 'en';
}

export function CreateFaqModal({ lang }: CreateFaqModalProps) {
  const [open, setOpen] = useState(false);
  const isAr = lang === 'ar';
  const t = (ar: string, en: string) => (isAr ? ar : en);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-colors"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        <span>{t('إضافة سؤال جديد', 'Add New FAQ')}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-white/[0.1] bg-slate-900/95 p-6 shadow-2xl"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/20">
                  <HelpCircle className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    {t('إضافة سؤال وجواب جديد', 'Add New Question & Answer')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t(
                      'يظهر السؤال في صفحة الأسئلة الشائعة ومخطط البيانات المنظمة JSON-LD',
                      'Rendered on FAQ page and synced with structured data'
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              action={async (formData) => {
                await createFaqAction(formData);
                setOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('تصنيف السؤال *', 'Topic Category *')}
                  </label>
                  <select
                    name="topic"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="engagement">{t('كيف نبدأ العمل (Engagement)', 'Starting Engagement')}</option>
                    <option value="delivery">{t('التنفيذ والمواعيد (Delivery)', 'Delivery & Timelines')}</option>
                    <option value="ownership">{t('الملكية والعقود (Ownership)', 'Ownership & Contracts')}</option>
                    <option value="operations">{t('التشغيل بعد الإطلاق (Operations)', 'Operations After Launch')}</option>
                    <option value="general">{t('أسئلة عامة (General)', 'General Questions')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('ترتيب الظهور', 'Display Order')}
                  </label>
                  <input
                    type="number"
                    name="order"
                    defaultValue={1}
                    min={1}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('نص السؤال بالعربية *', 'Question (Arabic) *')}
                </label>
                <input
                  type="text"
                  name="questionAr"
                  required
                  placeholder="مثال: كيف تضمنون سرية بيانات مشروعي؟"
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('نص السؤال بالإنجليزية *', 'Question (English) *')}
                </label>
                <input
                  type="text"
                  name="questionEn"
                  required
                  placeholder="e.g. How do you ensure confidentiality of my project data?"
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('الإجابة بالعربية *', 'Answer (Arabic) *')}
                </label>
                <textarea
                  name="answerAr"
                  required
                  rows={3}
                  placeholder="نوقع اتفاقية عدم إفصاح (NDA) ملزمة قانونياً قبل استلام أي مستندات تشغيلية..."
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('الإجابة بالإنجليزية *', 'Answer (English) *')}
                </label>
                <textarea
                  name="answerEn"
                  required
                  rows={3}
                  placeholder="We sign a binding Non-Disclosure Agreement (NDA) before reviewing workflows..."
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('حالة النشر', 'Publish Status')}
                </label>
                <select
                  name="status"
                  defaultValue="published"
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="published">{t('منشور ومباشر (Published)', 'Published')}</option>
                  <option value="draft">{t('مسودة مؤجلة (Draft)', 'Draft')}</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/[0.1] bg-slate-800 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  {t('إلغاء', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-colors"
                >
                  {t('حفظ السؤال', 'Save Question')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
