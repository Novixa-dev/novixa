import React from 'react';
import { Skeleton } from './Skeleton';

/**
 * Route-level loading placeholder.
 *
 * Rendered by the `loading.tsx` files, which Next.js shows while a route
 * segment streams in. Every page on this site previously navigated with no
 * intermediate state at all: a click held the old page on screen with no
 * feedback until the new one was ready, which on a slow connection is
 * indistinguishable from the click not registering.
 *
 * The shape deliberately mirrors the real page layout — eyebrow pill, title,
 * lede, then a content grid — so the transition into real content is a
 * settling rather than a jump.
 *
 * Announced as a single `role="status"` region. The individual bars are
 * `aria-hidden`; a screen reader should hear "loading" once, not a list of
 * empty boxes.
 */
export const RouteSkeleton: React.FC<{
  /** Content shape below the header. */
  variant?: 'grid' | 'article' | 'panel';
  /** Localized "loading" announcement. Arabic is the site's default locale. */
  label?: string;
}> = ({ variant = 'grid', label = 'جاري التحميل… / Loading…' }) => {
  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none -z-10" />

      <div
        role="status"
        aria-live="polite"
        aria-label={label}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"
      >
        <span className="sr-only">{label}</span>

        <div aria-hidden="true" className="space-y-4 max-w-3xl">
          <Skeleton variant="pill" className="h-6 w-40" />
          <Skeleton className="h-10 sm:h-14 w-full" />
          <Skeleton className="h-10 sm:h-14 w-4/5" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>

        {variant === 'grid' && (
          <div aria-hidden="true" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl border border-white/[0.06] p-6 space-y-4"
              >
                <Skeleton variant="rounded" className="h-12 w-12" />
                <Skeleton className="h-5 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
                <Skeleton className="h-9 w-full" />
              </div>
            ))}
          </div>
        )}

        {variant === 'article' && (
          <div aria-hidden="true" className="max-w-3xl space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className={`h-4 ${i % 4 === 3 ? 'w-2/3' : 'w-full'}`} />
            ))}
          </div>
        )}

        {variant === 'panel' && (
          <div aria-hidden="true" className="space-y-5">
            <div className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden">
              <Skeleton className="h-12 w-full rounded-none" />
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-5 space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Skeleton variant="rounded" className="lg:col-span-2 h-64" />
              <Skeleton variant="rounded" className="h-64" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
