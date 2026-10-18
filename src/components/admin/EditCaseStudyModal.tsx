'use client';

import { useState } from 'react';
import { Edit2, X } from 'lucide-react';
import { updateCaseStudyAction } from '@/app/admin/actions';
import type { CaseStudyItem } from '@/lib/content-store';

interface EditCaseStudyModalProps {
  caseStudy: CaseStudyItem;
  lang: 'ar' | 'en';
}

export function EditCaseStudyModal({ caseStudy, lang }: EditCaseStudyModalProps) {
  const [open, setOpen] = useState(false);
  const isAr = lang === 'ar';
  const t = (ar: string, en: string) => (isAr ? ar : en);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-slate-900/80 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
      >
        <Edit2 className="h-3 w-3 text-blue-400" />
        <span>{t('تعديل', 'Edit')}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-white/[0.1] bg-slate-900/95 p-6 shadow-2xl"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
              <div>
                <h3 className="font-display text-base font-bold text-white">
                  {t('تعديل حالة الدراسة / النموذج', 'Edit Case Study')}
                </h3>
                <p className="text-xs text-slate-400 font-mono" translate="no">
                  /work/{caseStudy.slug}
                </p>
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
                await updateCaseStudyAction(formData);
                setOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <input type="hidden" name="id" value={caseStudy.id} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('العنوان بالعربية *', 'Title (Arabic) *')}
                  </label>
                  <input
                    type="text"
                    name="titleAr"
                    required
                    defaultValue={caseStudy.title.ar}
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
                    defaultValue={caseStudy.title.en}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
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
                  defaultValue={caseStudy.challenge.ar}
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
                  defaultValue={caseStudy.challenge.en}
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
                  defaultValue={caseStudy.solution.ar}
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
                  defaultValue={caseStudy.solution.en}
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('حالة النشر', 'Publish Status')}
                </label>
                <select
                  name="status"
                  defaultValue={caseStudy.status}
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
                  {t('حفظ التعديلات', 'Save Changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
