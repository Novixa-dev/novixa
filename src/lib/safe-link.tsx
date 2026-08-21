'use client';

import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: React.ReactNode;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, children, onClick, replace, scroll = true, prefetch, target, ...props },
  ref
) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
    
    // If not a standard left-click or has modifiers, allow default browser behavior
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || target === '_blank') {
      return;
    }

    if (href && href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      
      if (typeof window !== 'undefined') {
        if (replace) {
          window.history.replaceState(null, '', href);
        } else {
          window.history.pushState(null, '', href);
        }
        window.dispatchEvent(new Event('popstate'));
        
        if (scroll) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <a ref={ref} href={href} target={target} onClick={handleClick} {...props}>
      {children}
    </a>
  );
});

export default Link;
