'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { AlertTriangle } from 'lucide-react';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { language, t } = useLanguage();

  useEffect(() => {
    console.error('[Novixa Error Boundary]:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 text-center py-24">
      <div className="max-w-md w-full glass-card p-8 sm:p-12 rounded-3xl border border-red-900/50 bg-slate-900/95 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-950 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold font-display text-white">
            {t('حدث خطأ غير متوقع', 'Something went wrong')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {t(
              'تعذر تحميل هذا الجزء مؤقتاً. يمكنك إعادة المحاولة أو العودة للرئيسية.',
              'This part of the page failed to load. You can try again or head back home.'
            )}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-all"
          >
            {t('إعادة المحاولة', 'Try Again')}
          </button>
          <a
            href={`/${language}`}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all"
          >
            {t('الرئيسية', 'Home')}
          </a>
        </div>
      </div>
    </div>
  );
}
