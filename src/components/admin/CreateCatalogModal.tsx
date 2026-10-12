'use client';

import { useState } from 'react';
import { Plus, X, Layers } from 'lucide-react';
import { createCatalogItemAction } from '@/app/admin/actions';

interface CreateCatalogModalProps {
  lang: 'ar' | 'en';
}

export function CreateCatalogModal({ lang }: CreateCatalogModalProps) {
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
        <span>{t('إضافة خدمة أو حل جديد', 'Add Catalog Item')}</span>
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
                  <Layers className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    {t('إضافة عنصر جديد في الكتالوج', 'Add Item to Catalog')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t(
                      'إضافة خدمة هندسية، حل جاهز، منتج سحابي، أو قطاع أعمال',
                      'Add engineering service, turnkey solution, SaaS product, or vertical'
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
                await createCatalogItemAction(formData);
                setOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('نوع العنصر *', 'Item Kind *')}
                  </label>
                  <select
                    name="kind"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="service">{t('خدمة هندسية (Service)', 'Engineering Service')}</option>
                    <option value="solution">{t('حل تشغيلي جاهز (Turnkey Solution)', 'Turnkey Solution')}</option>
                    <option value="product">{t('منتج سحابي (SaaS Product)', 'SaaS Product')}</option>
                    <option value="industry">{t('قطاع أعمال متسق (Industry Vertical)', 'Industry Vertical')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('المعرف اللطيف (Slug) *', 'URL Slug *')}
                  </label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="e.g. logistics-engine"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('الاسم بالعربية *', 'Title (Arabic) *')}
                  </label>
                  <input
                    type="text"
                    name="titleAr"
                    required
                    placeholder="مثال: نظام إدارة الشحن والخدمات اللوجستية"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
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
                    placeholder="e.g. Logistics & Fleet Management System"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
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
                  placeholder="شرح موجز للقيمة التشغيلية للخدمة أو الحل..."
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
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
                  placeholder="Concise operational description..."
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
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
                    defaultValue="حل تشغيلي متكامل"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('شارة التصنيف (إنجليزي)', 'Badge (English)')}
                  </label>
                  <input
                    type="text"
                    name="badgeEn"
                    defaultValue="Turnkey Engine"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
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
                  placeholder="تطبيق جوال, لوحة تحكم, تتبع مباشر"
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('أبرز المزايا والقدرات (كل ميزة في سطر منفصل)', 'Key Features (one per line)')}
                </label>
                <textarea
                  name="features"
                  rows={3}
                  placeholder="مزامنة حية للخرائط&#10;تنبيهات فورية للسائقين&#10;فوترة إلكترونية وتقارير إشغال"
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('حالة النشر', 'Publish Status')}
                </label>
                <select
                  name="status"
                  defaultValue="active"
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
                  {t('إضافة وحفظ', 'Save & Publish Item')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
