'use client';

import { useState } from 'react';
import { Edit2, X } from 'lucide-react';
import { updateLeadDetails } from '@/app/admin/actions';
import type { Lead } from '@/lib/leads';

interface EditLeadModalProps {
  lead: Lead;
  lang: 'ar' | 'en';
}

export function EditLeadModal({ lead, lang }: EditLeadModalProps) {
  const [open, setOpen] = useState(false);
  const isAr = lang === 'ar';
  const t = (ar: string, en: string) => (isAr ? ar : en);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
      >
        <Edit2 className="h-3.5 w-3.5 text-blue-400" />
        <span>{t('تعديل البيانات', 'Edit Details')}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-white/[0.1] bg-slate-900/95 p-6 shadow-2xl"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
              <div>
                <h3 className="font-display text-base font-bold text-white">
                  {t('تعديل تفاصيل العميل والطلب', 'Edit Lead & Project Details')}
                </h3>
                <p className="text-xs text-slate-400 font-mono" translate="no">
                  {lead.receiptId}
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
                await updateLeadDetails(formData);
                setOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <input type="hidden" name="id" value={lead.id} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('اسم العميل *', 'Client Name *')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={lead.name}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('البريد الإلكتروني *', 'Email Address *')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    defaultValue={lead.email}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('رقم الهاتف / واتساب', 'Phone / WhatsApp')}
                  </label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={lead.phone || ''}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('اسم الشركة أو الجهة', 'Company / Entity')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    defaultValue={lead.company || ''}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('نوع المشروع', 'Project Type')}
                  </label>
                  <input
                    type="text"
                    name="projectType"
                    defaultValue={lead.projectType || ''}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('الميزانية المقدرة', 'Budget Range')}
                  </label>
                  <input
                    type="text"
                    name="budgetRange"
                    defaultValue={lead.budgetRange || ''}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('الإطار الزمني المطلوب', 'Timeline')}
                </label>
                <input
                  type="text"
                  name="timeline"
                  defaultValue={lead.timeline || ''}
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('تفاصيل الطلب والمشروع', 'Project & Inquiry Details')}
                </label>
                <textarea
                  name="details"
                  rows={3}
                  defaultValue={lead.details || ''}
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 p-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                />
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
                  {t('تحديث البيانات', 'Save Changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
