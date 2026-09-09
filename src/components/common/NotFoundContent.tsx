'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const NotFoundContent: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 text-center py-24">
      <div className="max-w-md w-full glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-teal-400 tracking-widest uppercase">
            {t('404 — الصفحة غير موجودة', '404 — Page Not Found')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            {t('المسار المطلوب غير متاح', 'This page could not be found')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {t(
              'يبدو أن الصفحة أو المورد الذي تبحث عنه قد تم نقله أو غير موجود حالياً في منظومة نوڤيكسا.',
              'The page or resource you were looking for may have moved or no longer exists.'
            )}
          </p>
        </div>

        <div className="pt-4 flex items-center justify-center">
          <Link
            href={`/${language}`}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>{t('العودة للرئيسية', 'Back to Home')}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
