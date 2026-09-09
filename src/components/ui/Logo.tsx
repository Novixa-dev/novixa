import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: { icon: 'h-7 w-7', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'h-9 w-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'h-11 w-11', text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'h-14 w-14', text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Novixa N Geometry Icon: Intertwined with isometric 3D Cube / Hexagon */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-700 to-slate-900 p-0.5 shadow-lg shadow-blue-900/30 group transition-all duration-300 hover:shadow-blue-500/40 hover:scale-105 ${currentSize.icon}`}>
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle Glow Accent inside symbol */}
          <div className="absolute inset-0 bg-radial-gradient from-blue-500/25 via-transparent to-transparent opacity-80" />

          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4/5 h-4/5 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="novixaBlueGrad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id="novixaFacetGrad" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#1E293B" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Geometric Hexagon / Isometric Cube Outer Frame */}
            <path
              d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5L24 4Z"
              stroke="url(#novixaBlueGrad)"
              strokeWidth="1.5"
              strokeOpacity="0.45"
              fill="url(#novixaFacetGrad)"
            />

            {/* Internal Isometric Perspective Axes */}
            <path
              d="M24 4V24M24 24L42 14.5M24 24L6 14.5M24 24V44"
              stroke="#60A5FA"
              strokeWidth="1"
              strokeOpacity="0.2"
              strokeDasharray="2 2"
            />

            {/* Sharp Intertwined Geometric 'N' */}
            <path
              d="M14 34V14L34 34V14"
              stroke="url(#novixaBlueGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Tech Corner Accent Nodes */}
            <circle cx="14" cy="14" r="2.5" fill="#38BDF8" />
            <circle cx="34" cy="34" r="2.5" fill="#2563EB" />
            <circle cx="24" cy="24" r="1.5" fill="#A5F3FC" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span translate="no" className={`font-display font-extrabold tracking-tight text-white ${currentSize.text}`}>
            NOVIXA
          </span>
          <span className={`${currentSize.sub} font-arabic text-slate-300 tracking-wider font-medium -mt-1 hidden sm:block`}>
            نوڤيكسا • هندسة البرمجيات
          </span>
        </div>
      )}
    </div>
  );
};
