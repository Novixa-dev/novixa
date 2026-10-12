'use client';

import { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  action: (formData: FormData) => Promise<void>;
  id: string;
  itemName: string;
  lang: 'ar' | 'en';
}

export function DeleteConfirmModal({ action, id, itemName, lang }: DeleteConfirmModalProps) {
  const [open, setOpen] = useState(false);
  const isAr = lang === 'ar';
  const t = (ar: string, en: string) => (isAr ? ar : en);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 bg-red-950/20 px-2.5 py-1 text-xs text-red-300 hover:bg-red-900/40 hover:text-red-200 transition-colors"
      >
        <Trash2 className="h-3 w-3" />
        <span>{t('حذف', 'Delete')}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-sm glass-card rounded-2xl border border-red-500/30 bg-slate-900/95 p-5 shadow-2xl space-y-4"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-400 border border-red-500/20">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-sm font-bold text-white">
                  {t('تأكيد الحذف النهائي', 'Confirm Permanent Deletion')}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {t(
                    `هل أنت متأكد من رغبتك في حذف "${itemName}"؟ لا يمكن التراجع عن هذا الإجراء.`,
                    `Are you sure you want to permanently delete "${itemName}"? This action cannot be undone.`
                  )}
                </p>
              </div>
            </div>

            <form
              action={async (formData) => {
                await action(formData);
                setOpen(false);
              }}
              className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/[0.08]"
            >
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="confirm" value="yes" />

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/[0.1] bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                {t('إلغاء', 'Cancel')}
              </button>
              <button
                type="submit"
                className="rounded-xl bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-500 transition-colors"
              >
                {t('تأكيد الحذف', 'Confirm Delete')}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
