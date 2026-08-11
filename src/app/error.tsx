'use client';

import React, { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Novixa Error Boundary]:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center text-white font-sans">
      <div className="max-w-md w-full p-8 rounded-3xl border border-red-900/50 bg-slate-900/95 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-950 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-white">
            حدث خطأ غير متوقع / An unexpected error occurred
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            تعذر تحميل الجزء المطلوب مؤقتاً. جاري حفظ سجل النظام للتحقق الهندسي.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-all flex items-center gap-2"
          >
            إعادة المحاولة / Retry
          </button>
          <a
            href="/ar"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center gap-2"
          >
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}
