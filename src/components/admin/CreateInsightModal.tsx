'use client';

import { useState } from 'react';
import { Plus, X, BookOpen } from 'lucide-react';
import { createInsightAction } from '@/app/admin/actions';

interface CreateInsightModalProps {
  lang: 'ar' | 'en';
}

export function CreateInsightModal({ lang }: CreateInsightModalProps) {
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
        <span>{t('إضافة مقال جديد', 'Write New Article')}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-white/[0.1] bg-slate-900/95 p-6 shadow-2xl"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/20">
                  <BookOpen className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    {t('نشر مقال ورؤية هندسية جديدة', 'Publish New Technical Insight')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t(
                      'المقالات تعزز المصداقية الهندسية ومحركات البحث (SEO)',
                      'Articles establish architectural credibility and organic SEO'
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
                await createInsightAction(formData);
                setOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('المعرف اللطيف للرابط (Slug) *', 'URL Slug *')}
                </label>
                <input
                  type="text"
                  name="slug"
                  required
                  placeholder="e.g. database-scaling-patterns"
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white font-mono text-[11px] focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('عنوان المقال بالعربية *', 'Title (Arabic) *')}
                  </label>
                  <input
                    type="text"
                    name="titleAr"
                    required
                    placeholder="مثال: أنماط هندسة قواعد البيانات السحابية"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('عنوان المقال بالإنجليزية *', 'Title (English) *')}
                  </label>
                  <input
                    type="text"
                    name="titleEn"
                    required
                    placeholder="e.g. Cloud Database Architecture Patterns"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('مقدمة المقال بالعربية (Excerpt) *', 'Excerpt (Arabic) *')}
                </label>
                <textarea
                  name="excerptAr"
                  required
                  rows={2}
                  placeholder="ملخص مركز يجيب على ما يستفيده القارئ من المقال..."
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('مقدمة المقال بالإنجليزية (Excerpt) *', 'Excerpt (English) *')}
                </label>
                <textarea
                  name="excerptEn"
                  required
                  rows={2}
                  placeholder="Executive summary of the technical insight..."
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('التصنيف (عربي)', 'Category (Arabic)')}
                  </label>
                  <input
                    type="text"
                    name="categoryAr"
                    defaultValue="هندسة البرمجيات"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('التصنيف (إنجليزي)', 'Category (English)')}
                  </label>
                  <input
                    type="text"
                    name="categoryEn"
                    defaultValue="Software Architecture"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('مدة القراءة (عربي)', 'Read Time (Arabic)')}
                  </label>
                  <input
                    type="text"
                    name="readTimeAr"
                    defaultValue="5 دقائق قراءة"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('مدة القراءة (إنجليزي)', 'Read Time (English)')}
                  </label>
                  <input
                    type="text"
                    name="readTimeEn"
                    defaultValue="5 min read"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
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
                  <option value="draft">{t('مسودة غير معروضة (Draft)', 'Draft')}</option>
                  <option value="archived">{t('مؤرشف (Archived)', 'Archived')}</option>
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
                  {t('نشر المقال', 'Publish Insight')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
