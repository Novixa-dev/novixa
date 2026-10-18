'use client';

import { useState } from 'react';
import { Plus, X, UserPlus } from 'lucide-react';
import { createLeadManual } from '@/app/admin/actions';

interface CreateLeadDialogProps {
  lang: 'ar' | 'en';
}

export function CreateLeadDialog({ lang }: CreateLeadDialogProps) {
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
        <span>{t('إضافة طلب عميل جديد', 'Record New Lead')}</span>
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
                  <UserPlus className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    {t('تسجيل طلب عميل يدوي', 'Record New Direct Lead')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t(
                      'توثيق استفسار وارد عبر الهاتف أو واتساب أو لقاء مباشر',
                      'Log enquiries received via WhatsApp, phone, or direct meetings'
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
                await createLeadManual(formData);
                setOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('اسم العميل *', 'Client Name *')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t('مثال: م. أحمد بن علي', 'e.g. Ahmed Ali')}
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
                    placeholder="name@company.com"
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
                    placeholder="+967 77X XXX XXX"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('اسم الشركة أو المنشأة', 'Company / Entity')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder={t('مثال: شركة حضرموت للتطوير', 'e.g. Acme Corp')}
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('نوع المشروع / الحل', 'Project Scope')}
                  </label>
                  <select
                    name="projectType"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="حل عقاري جاهز (Aqar)">{t('نوفكسا عقار (Aqar)', 'Novixa Aqar')}</option>
                    <option value="نظام مطاعم وكافيهات">{t('نظام مطاعم وكافيهات', 'Restaurant OS')}</option>
                    <option value="نظام عيادات ومراكز طبية">{t('نظام عيادات ومراكز طبية', 'Clinic System')}</option>
                    <option value="برمجة نظام سحابي مخصص">{t('برمجة نظام مخصص', 'Custom Engineering')}</option>
                    <option value="تطبيق ويب أو منصة SaaS">{t('تطبيق ويب أو منصة SaaS', 'Web App / SaaS')}</option>
                    <option value="استشارات وبنية تحتية">{t('استشارات واستضافة', 'Consulting & Cloud')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('الميزانية المقدرة', 'Budget Range')}
                  </label>
                  <select
                    name="budgetRange"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="$500 - $1,500">$500 – $1,500 (ترخيص أساسي)</option>
                    <option value="$1,500 - $3,500">$1,500 – $3,500</option>
                    <option value="$3,500 - $8,000">$3,500 – $8,000</option>
                    <option value="$8,000+">$8,000+ (مؤسسي مخصص)</option>
                    <option value="غير محدد">{t('قيد التحديد', 'To be scoped')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t('درجة الأولوية', 'Priority')}
                  </label>
                  <select
                    name="priority"
                    defaultValue="medium"
                    className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="urgent">{t('عاجل جداً (Urgent)', 'Urgent')}</option>
                    <option value="high">{t('أولوية عالية (High)', 'High')}</option>
                    <option value="medium">{t('أولوية متوسطة (Medium)', 'Medium')}</option>
                    <option value="low">{t('أولوية منخفضة (Low)', 'Low')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('وسوم التصنيف (Tags مفصولة بفواصل)', 'Tags (comma separated)')}
                </label>
                <input
                  type="text"
                  name="tags"
                  placeholder={t('مثال: عقار, اتصال هاتفي, حضرموت', 'e.g. Aqar, WhatsApp, Enterprise')}
                  className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('تفاصيل المحادثة والملاحظات المبدئية', 'Meeting / Conversation Notes')}
                </label>
                <textarea
                  name="details"
                  rows={3}
                  placeholder={t(
                    'دوّن ملخص ما تم مناقشته مع العميل وأبرز متطلباته...',
                    'Summarize the conversation and client expectations...'
                  )}
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
                  {t('حفظ الطلب وتوثيقه', 'Save & Record Lead')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
