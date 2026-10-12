'use client';

import { useState } from 'react';
import { Plus, X, HeartHandshake } from 'lucide-react';
import { createCampaignAction } from '@/app/admin/actions';

interface CreateCampaignModalProps {
  lang: 'ar' | 'en';
}

export function CreateCampaignModal({ lang }: CreateCampaignModalProps) {
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
        <span>{t('إطلاق مبادرة مجتمعية جديدة', 'Launch New Campaign')}</span>
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
                  <HeartHandshake className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    {t('إطلاق مبادرة مجتمعية / منحة تقنية', 'Launch Community Initiative')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t('مبادرات دعم المطورين، الفعاليات التقنية، والمنظمات غير الربحية', 'Support for devs, hackathons, open source, and non-profits')}
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
                await createCampaignAction(formData);
                setOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('المعرف الفريد (Slug)', 'Campaign Slug')} *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="student-dev-sponsorship"
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('الحد الأقصى للمستفيدين (Quota)', 'Quota Limit')} *
                  </label>
                  <input
                    type="number"
                    name="quota"
                    defaultValue={10}
                    min={1}
                    required
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('عنوان المبادرة (بالعربية)', 'Title (Arabic)')} *
                </label>
                <input
                  type="text"
                  name="titleAr"
                  required
                  placeholder="مثال: منحة تطوير مواقع الفعاليات التقنية المجانية"
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('عنوان المبادرة (بالإنجليزية)', 'Title (English)')} *
                </label>
                <input
                  type="text"
                  name="titleEn"
                  required
                  placeholder="e.g. Pro-bono Community Event Landing Pages"
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('الوصف (عربي)', 'Description (AR)')}
                  </label>
                  <textarea
                    name="descAr"
                    rows={3}
                    placeholder="بناء واستضافة مواقع ويب سريعة للهاكاثونات والملتقيات غير الربحية مجاناً."
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('الوصف (إنجليزي)', 'Description (EN)')}
                  </label>
                  <textarea
                    name="descEn"
                    rows={3}
                    placeholder="Fast, accessible websites built and hosted pro-bono for tech conferences & hackathons."
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('معايير الأهلية (عربي)', 'Eligibility (AR)')}
                  </label>
                  <input
                    type="text"
                    name="eligAr"
                    placeholder="ملتقى تقني أو مجتمعي غير تجاري في منطقة الخليج والشرق الأوسط."
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('معايير الأهلية (إنجليزي)', 'Eligibility (EN)')}
                  </label>
                  <input
                    type="text"
                    name="eligEn"
                    placeholder="Non-commercial tech community or university event in the MENA/GCC region."
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('حالة النشر', 'Status')}
                </label>
                <select
                  name="status"
                  defaultValue="active"
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="active">{t('نشطة وتستقبل طلبات (Active)', 'Active')}</option>
                  <option value="paused">{t('متوقفة مؤقتاً (Paused)', 'Paused')}</option>
                  <option value="completed">{t('مكتملة ومغلقة (Completed)', 'Completed')}</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/[0.08] px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {t('إلغاء', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 transition-colors"
                >
                  {t('إطلاق المبادرة', 'Launch Campaign')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
