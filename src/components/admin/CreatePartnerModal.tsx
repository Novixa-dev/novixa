'use client';

import { useState } from 'react';
import { Plus, X, Handshake, Percent } from 'lucide-react';
import { createPartnerAction } from '@/app/admin/actions';

interface CreatePartnerModalProps {
  lang: 'ar' | 'en';
}

export function CreatePartnerModal({ lang }: CreatePartnerModalProps) {
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
        <span>{t('إضافة شريك جديد', 'Add New Partner')}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-lg glass-card rounded-2xl border border-white/[0.1] bg-slate-900/95 p-6 shadow-2xl"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/20">
                  <Handshake className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    {t('تسجيل شريك تسويقي / عمولة', 'Register Affiliate Partner')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t('العمولة الافتراضية 30% من قيمة العقود المحالة وفق ميثاق نوڤيكسا', 'Default 30% commission rate per Novixa partner program')}
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
                await createPartnerAction(formData);
                setOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('اسم الشريك / المرجع', 'Partner Name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t('مثال: سارة القحطاني', 'e.g. Sarah Al-Qahtani')}
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('البريد الإلكتروني', 'Email Address')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="partner@example.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('الشركة / الجهة (اختياري)', 'Company (Optional)')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder={t('مثال: وكالة نمو للاستشارات', 'e.g. Growth Agency')}
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('كود الإحالة الفريد (Referral Code)', 'Referral Code')} *
                  </label>
                  <input
                    type="text"
                    name="referralCode"
                    required
                    placeholder="SARAH30"
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('نسبة العمولة (%)', 'Commission Rate (%)')} *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="rate"
                      defaultValue={30}
                      min={1}
                      max={100}
                      required
                      className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none pe-8 font-mono"
                    />
                    <Percent className="absolute end-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('ملاحظات الاتفاقية / بنود خاصة', 'Agreement Notes / Terms')}
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder={t('أي شروط تفاوضية أو قنوات ترويج متفق عليها...', 'Special terms or promotion channels agreed upon...')}
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
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
                  {t('تسجيل الشريك', 'Register Partner')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
