'use client';

import { useState, useEffect } from 'react';

export function usePathname(): string {
  const [pathname, setPathname] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      return window.location.hash.replace(/^#/, '');
    }
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash && window.location.hash.startsWith('#/')) {
        setPathname(window.location.hash.replace(/^#/, ''));
      } else {
        setPathname(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return pathname;
}

export function useRouter() {
  return {
    push: (url: string) => {
      if (typeof window !== 'undefined') {
        if (window.location.hash && window.location.hash.startsWith('#/')) {
          window.location.hash = `#${url}`;
        } else {
          window.history.pushState(null, '', url);
          window.dispatchEvent(new Event('popstate'));
        }
      }
    },
    replace: (url: string) => {
      if (typeof window !== 'undefined') {
        if (window.location.hash && window.location.hash.startsWith('#/')) {
          window.location.hash = `#${url}`;
        } else {
          window.history.replaceState(null, '', url);
          window.dispatchEvent(new Event('popstate'));
        }
      }
    },
    back: () => {
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    },
    forward: () => {
      if (typeof window !== 'undefined') {
        window.history.forward();
      }
    },
    refresh: () => {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    },
    prefetch: () => {},
  };
}

export function useSearchParams() {
  const [params, setParams] = useState(() => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  });

  useEffect(() => {
    const update = () => setParams(new URLSearchParams(window.location.search));
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
    };
  }, []);

  return params;
}

export function useParams() {
  return {};
}

export function notFound() {
  if (typeof window !== 'undefined') {
    console.warn('notFound called');
  }
}

export function redirect(url: string) {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
}
