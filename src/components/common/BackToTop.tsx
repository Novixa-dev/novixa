'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Return-to-top control.
 *
 * Several pages here run long — the homepage is twelve sections, and the
 * services and solutions catalogues are longer still — and the only way back
 * to the navigation was to scroll the whole way. Appears once the reader is a
 * viewport and a half down, which is far enough that they have committed to
 * reading rather than just overshooting.
 *
 * Sits at the inline end so it never covers content in either direction, and
 * respects reduced motion by jumping instead of smooth-scrolling.
 */
export const BackToTop: React.FC = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    // Move focus to the top of the document too, so keyboard and screen-reader
    // users land where the scroll did rather than keeping focus on a button
    // that has just slid out of view.
    document.getElementById('main-content')?.focus();
  };

  // Unmounted rather than hidden. The HTML `hidden` attribute would lose to
  // the `flex` utility class on display, leaving an invisible but focusable
  // button sitting in the tab order — a keyboard trap.
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('العودة إلى أعلى الصفحة', 'Back to top')}
      className="fixed bottom-6 end-6 z-40 w-11 h-11 rounded-xl glass-overlay border border-white/[0.1] text-slate-300 hover:text-white hover:border-blue-500/50 shadow-xl transition-colors flex items-center justify-center"
    >
      <ArrowUp className="w-4 h-4" aria-hidden="true" />
    </button>
  );
};
