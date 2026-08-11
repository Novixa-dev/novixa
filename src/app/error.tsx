'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Novixa Global Error Boundary]:', error);
  }, [error]);

  return (
    <html>
      <body className="bg-slate-950 min-h-screen flex items-center justify-center p-6 text-center text-white">
        <div className="max-w-md w-full glass-card p-8 rounded-3xl border border-red-900/50 bg-slate-900/95 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-950 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white font-display">
              حدث خطأ غير متوقع / An unexpected error occurred
            </h1>
            <p className="text-xs text-slate-400 font-arabic leading-relaxed">
              تعذر تحميل الجزء المطلوب مؤقتاً. جاري حفظ سجل النظام للتحقق الهندسي.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>إعادة المحاولة / Retry</span>
            </button>
            <a
              href="/ar"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>الرئيسية</span>
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
