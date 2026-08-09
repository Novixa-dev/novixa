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
  { href, children, onClick, replace, scroll, prefetch, ...props },
  ref
) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
    if (!e.defaultPrevented && href) {
      if (href.startsWith('/')) {
        const currentHash = typeof window !== 'undefined' ? window.location.hash : '';
        if (currentHash && currentHash.startsWith('#/')) {
          e.preventDefault();
          window.location.hash = `#${href}`;
          return;
        }
      }
    }
  };

  return (
    <a ref={ref} href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
});

export default Link;
