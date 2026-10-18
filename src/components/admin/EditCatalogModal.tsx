'use client';

import { useState } from 'react';
import { Edit2, X } from 'lucide-react';
import { updateCatalogItemAction } from '@/app/admin/actions';
import type { CatalogItem } from '@/lib/content-store';

interface EditCatalogModalProps {
  item: CatalogItem;
  lang: 'ar' | 'en';
}

export function EditCatalogModal({ item, lang }: EditCatalogModalProps) {
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
                  {t('تعديل عنصر الكتالوج', 'Edit Catalog Item')}
                </h3>
                <p className="text-xs text-slate-400 font-mono" translate="no">
                  {item.publicRoute}
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
                await updateCatalogItemAction(formData);
                setOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <input type="hidden" name="id" value={item.id} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('الاسم بالعربية *', 'Title (Arabic) *')}
                  </label>
                  <input
                    type="text"
                    name="titleAr"
                    required
                    defaultValue={item.title.ar}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('الاسم بالإنجليزية *', 'Title (English) *')}
                  </label>
                  <input
                    type="text"
                    name="titleEn"
                    required
                    defaultValue={item.title.en}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('الوصف بالعربية *', 'Description (Arabic) *')}
                </label>
                <textarea
                  name="descAr"
                  required
                  rows={2}
                  defaultValue={item.description.ar}
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('الوصف بالإنجليزية *', 'Description (English) *')}
                </label>
                <textarea
                  name="descEn"
                  required
                  rows={2}
                  defaultValue={item.description.en}
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('شارة التصنيف (عربي)', 'Badge (Arabic)')}
                  </label>
                  <input
                    type="text"
                    name="badgeAr"
                    defaultValue={item.categoryBadge?.ar || ''}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('شارة التصنيف (إنجليزي)', 'Badge (English)')}
                  </label>
                  <input
                    type="text"
                    name="badgeEn"
                    defaultValue={item.categoryBadge?.en || ''}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('الوسوم والمخرجات (Tags مفصولة بفواصل)', 'Tags / Deliverables (comma separated)')}
                </label>
                <input
                  type="text"
                  name="tags"
                  defaultValue={item.tags.join(', ')}
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('أبرز المزايا والقدرات (كل ميزة في سطر منفصل)', 'Key Features (one per line)')}
                </label>
                <textarea
                  name="features"
                  rows={3}
                  defaultValue={item.features.join('\n')}
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white focus:border-blue-500 focus:outline-none resize-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('حالة النشر', 'Publish Status')}
                </label>
                <select
                  name="status"
                  defaultValue={item.status}
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="active">{t('نشط ومعروض (Active)', 'Active')}</option>
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
