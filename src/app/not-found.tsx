import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center text-white">
      <div className="max-w-md w-full glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-teal-400 tracking-widest uppercase">404 — الصفحة غير موجودة / Page Not Found</span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            المسار المطلوب غير متاح
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-arabic leading-relaxed">
            يبدو أن الصفحة أو المورد الذي تبحث عنه قد تم نقله أو غير موجود حالياً في منظومة نوڤيكسا.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 justify-center">
          <Link
            href="/ar"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>الرئيسية (Arabic)</span>
          </Link>
          <Link
            href="/en"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <span>Home (English)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
