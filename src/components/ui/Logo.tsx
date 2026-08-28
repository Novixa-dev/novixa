import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: { icon: 'h-6 w-6', text: 'text-lg', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { icon: 'h-8 w-8', text: 'text-xl', badge: 'text-[10px] px-2 py-0.5' },
    lg: { icon: 'h-10 w-10', text: 'text-2xl', badge: 'text-xs px-2.5 py-1' },
    xl: { icon: 'h-14 w-14', text: 'text-3xl', badge: 'text-xs px-3 py-1' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Novixa N Geometry Icon */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-0.5 shadow-lg shadow-blue-900/30 group transition-all duration-300 hover:shadow-blue-600/40 ${currentSize.icon}`}>
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle Grid Accent inside N symbol */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-60"></div>
          
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/5 h-3/5 text-blue-500 transition-transform duration-300 group-hover:scale-110">
            {/* Geometric N Shape */}
            <path d="M10 8V32M10 8L30 32M30 8V32" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Accent Tech Node Circle */}
            <circle cx="30" cy="8" r="2.5" fill="#14B8A6" />
            <circle cx="10" cy="32" r="2.5" fill="#2563EB" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span translate="no" className={`font-display font-extrabold tracking-tight text-white ${currentSize.text}`}>
            NOVIXA
          </span>
          <span className="text-[10px] font-arabic text-slate-400 tracking-wider font-medium -mt-1 hidden sm:block">
            نوڤيكسا • هندسة البرمجيات
          </span>
        </div>
      )}
    </div>
  );
};
