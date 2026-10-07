'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * A thin progress bar at the top of the viewport during route changes.
 *
 * App Router transitions are client-side, so the browser's own loading
 * indicator never fires: a click on a nav link produced no feedback at all
 * until the next page painted. On a slow connection that is indistinguishable
 * from a dead link, and people click again.
 *
 * The bar eases toward 90% while the navigation is in flight and completes
 * when the new pathname lands. It never reaches 100% on its own, because
 * claiming completion before the page arrives is worse than showing nothing.
 *
 * Suppressed entirely under `prefers-reduced-motion`, where a sliding bar is
 * exactly the kind of movement the preference asks us not to make; the
 * `aria-busy` region below still announces the state.
 */
export const NavigationProgress: React.FC = () => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const previousPath = useRef(pathname);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    // A same-path re-render is not a navigation.
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    clearTimers();
    setVisible(true);
    setProgress(100);

    // Hold the completed bar briefly so the motion reads as "finished"
    // rather than simply vanishing, then reset for the next navigation.
    timers.current.push(
      setTimeout(() => setVisible(false), 260),
      setTimeout(() => setProgress(0), 560)
    );

    return clearTimers;
  }, [pathname]);

  useEffect(() => {
    // Intercept clicks on in-app links to start the bar at click time — the
    // pathname only changes once the navigation has already resolved, which
    // is far too late to be useful feedback.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || anchor.target === '_blank') return;

      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname) return;
      } catch {
        return;
      }

      clearTimers();
      setVisible(true);
      setProgress(12);

      // Ease toward 90% while the route resolves. The steps shrink, so the
      // bar decelerates rather than stalling at a fixed value.
      let current = 12;
      const advance = () => {
        current = Math.min(90, current + (90 - current) * 0.22);
        setProgress(current);
        if (current < 89) timers.current.push(setTimeout(advance, 180));
      };
      timers.current.push(setTimeout(advance, 180));
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      clearTimers();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="motion-reduce:hidden fixed inset-x-0 top-0 z-[60] h-0.5 pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-teal-400 transition-[width,opacity] ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          transitionDuration: progress === 100 ? '200ms' : '400ms',
        }}
      />
    </div>
  );
};
