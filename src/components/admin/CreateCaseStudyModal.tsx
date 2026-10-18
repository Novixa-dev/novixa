'use client';

import { useState } from 'react';
import { Plus, X, Briefcase } from 'lucide-react';
import { createCaseStudyAction } from '@/app/admin/actions';

interface CreateCaseStudyModalProps {
  lang: 'ar' | 'en';
}

export function CreateCaseStudyModal({ lang }: CreateCaseStudyModalProps) {
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
        <span>{t('إضافة حالة دراسة / نموذج هندسي', 'Add Case Study')}</span>
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
                  <Briefcase className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    {t('إضافة نموذج عمل أو حالة دراسة', 'Add Case Study / Prototype')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t(
                      'يجب تصنيف العمل بنزاهة (عرض توضيحي، نموذج هندسي، أو مشروع معتمد)',
                      'Honestly labeled as Demo, Engineering Prototype, or Verified Project'
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
                await createCaseStudyAction(formData);
                setOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('اسم المشروع / العميل *', 'Project / Client Name *')}
                  </label>
                  <input
                    type="text"
                    name="client"
                    required
                    placeholder="e.g. Apex Hospitality Systems"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('المعرف اللطيف (Slug) *', 'URL Slug *')}
                  </label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="e.g. apex-hospitality"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white font-mono text-[11px] focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('العنوان بالعربية *', 'Title (Arabic) *')}
                  </label>
                  <input
                    type="text"
                    name="titleAr"
                    required
                    placeholder="مثال: هندسة منصة تشغيل المجموعات الفندقية"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('العنوان بالإنجليزية *', 'Title (English) *')}
                  </label>
                  <input
                    type="text"
                    name="titleEn"
                    required
                    placeholder="e.g. Hospitality Group Operations Architecture"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('تصنيف العمل بنزاهة (عربي)', 'Status Label (Arabic)')}
                  </label>
                  <select
                    name="statusLabelAr"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="عرض توضيحي لمنتج (Product Demo)">عرض توضيحي لمنتج (Product Demo)</option>
                    <option value="معمارية مفاهيمية (Concept Architecture)">معمارية مفاهيمية (Concept Architecture)</option>
                    <option value="نموذج أولي هندسي (Engineering Prototype)">نموذج أولي هندسي (Engineering Prototype)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('تصنيف العمل بنزاهة (إنجليزي)', 'Status Label (English)')}
                  </label>
                  <select
                    name="statusLabelEn"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Product Demonstration">Product Demonstration</option>
                    <option value="Concept Architecture">Concept Architecture</option>
                    <option value="Engineering Prototype">Engineering Prototype</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('المشكلة / التحدي بالعربية *', 'Challenge (Arabic) *')}
                </label>
                <textarea
                  name="challengeAr"
                  required
                  rows={2}
                  placeholder="وصف المشكلة التشغيلية التي تمت معالجتها..."
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('المشكلة / التحدي بالإنجليزية *', 'Challenge (English) *')}
                </label>
                <textarea
                  name="challengeEn"
                  required
                  rows={2}
                  placeholder="Operational bottleneck addressed..."
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('الحل المعماري بالعربية *', 'Solution (Arabic) *')}
                </label>
                <textarea
                  name="solutionAr"
                  required
                  rows={2}
                  placeholder="الحل الهندسي والتقنيات التي وظفت لحل المشكلة..."
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('الحل المعماري بالإنجليزية *', 'Solution (English) *')}
                </label>
                <textarea
                  name="solutionEn"
                  required
                  rows={2}
                  placeholder="Architectural solution delivered..."
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('التقنيات المستخدمة (مفصولة بفواصل)', 'Tech Stack (comma separated)')}
                </label>
                <input
                  type="text"
                  name="technologies"
                  defaultValue="Next.js, TypeScript, PostgreSQL, Tailwind CSS"
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white font-mono text-[11px] focus:border-blue-500 focus:outline-none"
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
                  <option value="draft">{t('مسودة غير معروضة (Draft)', 'Draft')}</option>
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
                  {t('حفظ النموذج', 'Save Case Study')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
