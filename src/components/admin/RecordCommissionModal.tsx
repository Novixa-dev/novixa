'use client';

import { useState } from 'react';
import { Plus, X, DollarSign, Calculator } from 'lucide-react';
import { recordCommissionAction } from '@/app/admin/actions';
import type { PartnerItem } from '@/lib/content-store';

interface RecordCommissionModalProps {
  partners: PartnerItem[];
  lang: 'ar' | 'en';
}

export function RecordCommissionModal({ partners, lang }: RecordCommissionModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState(partners[0]?.id || '');
  const [saleAmount, setSaleAmount] = useState<number>(10000);

  const isAr = lang === 'ar';
  const t = (ar: string, en: string) => (isAr ? ar : en);

  const currentPartner = partners.find((p) => p.id === selectedPartnerId) || partners[0];
  const rate = currentPartner?.defaultCommissionRate || 30;
  const calculatedCommission = Math.round(saleAmount * (rate / 100));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={partners.length === 0}
        className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
      >
        <Plus className="h-4 w-4 text-emerald-400" />
        <span>{t('تسجيل صفقة وعمولة', 'Record Sale / Commission')}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-lg glass-card rounded-2xl border border-white/[0.1] bg-slate-900/95 p-6 shadow-2xl"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/20">
                  <DollarSign className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    {t('تسجيل صفقة محالة وعمولة مستحقة', 'Record Sale & Commission')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t('حساب العمولة آلياً وإضافتها إلى سجل مستحقات الشريك', 'Calculates commission and registers it in partner ledger')}
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
                await recordCommissionAction(formData);
                setOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('الشريك المستفيد', 'Attributed Partner')} *
                </label>
                <select
                  name="partnerId"
                  value={selectedPartnerId}
                  onChange={(e) => setSelectedPartnerId(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                >
                  {partners.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.referralCode} — {p.defaultCommissionRate}%)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('قيمة الصفقة الإجمالية ($ USD)', 'Deal Contract Value ($ USD)')} *
                  </label>
                  <input
                    type="number"
                    name="saleAmountUsd"
                    value={saleAmount}
                    onChange={(e) => setSaleAmount(Number(e.target.value) || 0)}
                    required
                    min={1}
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('نسبة العمولة المطبقة (%)', 'Applied Rate (%)')}
                  </label>
                  <input
                    type="number"
                    name="commissionRate"
                    defaultValue={rate}
                    key={rate}
                    min={1}
                    max={100}
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Commission Summary Banner */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-emerald-400" />
                  <span className="font-medium">
                    {t('العمولة المحسوبة المستحقة:', 'Calculated Commission:')}
                  </span>
                </div>
                <div className="font-display text-base font-bold text-emerald-400 font-mono">
                  ${calculatedCommission.toLocaleString()} USD
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('معرف العميل المحتمل / المشروع (اختياري)', 'Lead / Project ID (Optional)')}
                </label>
                <input
                  type="text"
                  name="leadId"
                  placeholder={t('مثال: lead_abc123 أو اسم العقد', 'e.g. lead_abc123 or contract ref')}
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-800/80 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('ملاحظات وتفاصيل الدفعة', 'Payment / Agreement Notes')}
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder={t('رقم الفاتورة، تاريخ التحويل المجدول، أو أي تفاصيل إضافية...', 'Invoice ID, payout date, or extra info...')}
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
                  className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500 transition-colors"
                >
                  {t('تسجيل العمولة فوراً', 'Record Commission')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
