import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'default' | 'circular' | 'rounded' | 'pill';
  shimmer?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'default',
  shimmer = true,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-2xl';
      case 'pill':
        return 'rounded-full';
      default:
        return 'rounded-xl';
    }
  };

  return (
    <div
      className={`bg-slate-800/80 ${shimmer ? 'skeleton-shimmer' : 'animate-pulse'} ${getVariantClass()} ${className}`}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                        PRODUCT SKELETON COMPONENTS                         */
/* -------------------------------------------------------------------------- */

export const ProductCardSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800/80 flex flex-col justify-between gap-6 relative overflow-hidden"
          aria-hidden="true"
        >
          <div className="space-y-4 text-right rtl:text-right ltr:text-left">
            {/* Top Row: Icon, Name, Category & Status Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <div className="space-y-1.5">
                  <Skeleton className="w-24 h-4 rounded-md" />
                  <Skeleton className="w-16 h-3 rounded-md" />
                </div>
              </div>
              <Skeleton className="w-20 h-6 rounded-full" />
            </div>

            {/* Title & Description Lines */}
            <div className="space-y-2 pt-1">
              <Skeleton className="w-4/5 h-5 rounded-md" />
              <Skeleton className="w-full h-3.5 rounded-md" />
              <Skeleton className="w-3/4 h-3.5 rounded-md" />
            </div>

            {/* Key Features Checkmarks */}
            <div className="pt-2 space-y-2.5">
              <Skeleton className="w-28 h-3 rounded-md" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-3.5 h-3.5 rounded-full shrink-0" />
                  <Skeleton className="w-5/6 h-3 rounded-md" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-3.5 h-3.5 rounded-full shrink-0" />
                  <Skeleton className="w-4/6 h-3 rounded-md" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-3.5 h-3.5 rounded-full shrink-0" />
                  <Skeleton className="w-3/4 h-3 rounded-md" />
                </div>
              </div>
            </div>

            {/* Metrics Highlight Box */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-around">
              <div className="flex flex-col items-center gap-1">
                <Skeleton className="w-14 h-5 rounded-md" />
                <Skeleton className="w-20 h-2.5 rounded-md" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Skeleton className="w-14 h-5 rounded-md" />
                <Skeleton className="w-20 h-2.5 rounded-md" />
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <Skeleton className="w-20 h-3 rounded-md" />
            <Skeleton className="w-24 h-4 rounded-md" />
          </div>
        </div>
      ))}
    </>
  );
};

export const ProductViewCardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-10" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 bg-slate-900/90 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-right rtl:text-right ltr:text-left"
        >
          {/* Left / Main Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="w-14 h-14 rounded-2xl shrink-0" />
              <div className="space-y-2">
                <Skeleton className="w-48 h-6 rounded-md" />
                <Skeleton className="w-32 h-3.5 rounded-md" />
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <Skeleton className="w-full h-4 rounded-md" />
              <Skeleton className="w-11/12 h-4 rounded-md" />
              <Skeleton className="w-3/4 h-4 rounded-md" />
            </div>

            <div className="space-y-3 pt-2">
              <Skeleton className="w-36 h-3.5 rounded-md" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                    <Skeleton className="w-3/4 h-3.5 rounded-md" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Skeleton className="w-36 h-4 rounded-md" />
            </div>
          </div>

          {/* Right Impact & CTA Block */}
          <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 text-center">
            <div className="space-y-3 flex flex-col items-center">
              <Skeleton className="w-24 h-3.5 rounded-md" />
              <Skeleton className="w-28 h-8 rounded-lg" />
              <Skeleton className="w-40 h-3 rounded-md" />
            </div>

            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                       CASE STUDIES SKELETON COMPONENTS                     */
/* -------------------------------------------------------------------------- */

export const CaseStudyCardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between gap-6 relative"
          aria-hidden="true"
        >
          <div className="space-y-4 text-right rtl:text-right ltr:text-left">
            {/* Meta Badges */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Skeleton className="w-24 h-6 rounded-md" />
              <Skeleton className="w-20 h-5 rounded" />
            </div>

            {/* Title */}
            <div className="space-y-1.5 pt-1">
              <Skeleton className="w-full h-5 rounded-md" />
              <Skeleton className="w-2/3 h-5 rounded-md" />
            </div>

            {/* Challenge Excerpt */}
            <div className="space-y-2 pt-1">
              <Skeleton className="w-full h-3.5 rounded-md" />
              <Skeleton className="w-11/12 h-3.5 rounded-md" />
              <Skeleton className="w-4/5 h-3.5 rounded-md" />
            </div>

            {/* Metrics Highlights Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col gap-1.5">
                <Skeleton className="w-16 h-6 rounded-md" />
                <Skeleton className="w-20 h-2.5 rounded-md" />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col gap-1.5">
                <Skeleton className="w-16 h-6 rounded-md" />
                <Skeleton className="w-20 h-2.5 rounded-md" />
              </div>
            </div>

            {/* Tech Tags Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Skeleton className="w-14 h-4 rounded" />
              <Skeleton className="w-16 h-4 rounded" />
              <Skeleton className="w-12 h-4 rounded" />
              <Skeleton className="w-18 h-4 rounded" />
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <Skeleton className="w-20 h-3 rounded-md" />
            <Skeleton className="w-32 h-4 rounded-md" />
          </div>
        </div>
      ))}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                         INSIGHTS SKELETON COMPONENTS                       */
/* -------------------------------------------------------------------------- */

export const InsightCardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between gap-6 relative"
          aria-hidden="true"
        >
          <div className="space-y-3.5 text-right rtl:text-right ltr:text-left">
            {/* Category & Read Time */}
            <div className="flex items-center justify-between text-xs">
              <Skeleton className="w-24 h-6 rounded-md" />
              <div className="flex items-center gap-1.5">
                <Skeleton className="w-3.5 h-3.5 rounded-full" />
                <Skeleton className="w-14 h-3.5 rounded-md" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1.5 pt-1">
              <Skeleton className="w-full h-5 rounded-md" />
              <Skeleton className="w-3/4 h-5 rounded-md" />
            </div>

            {/* Excerpt */}
            <div className="space-y-2 pt-1">
              <Skeleton className="w-full h-3.5 rounded-md" />
              <Skeleton className="w-11/12 h-3.5 rounded-md" />
              <Skeleton className="w-4/5 h-3.5 rounded-md" />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <Skeleton className="w-20 h-3 rounded-md" />
            <Skeleton className="w-24 h-4 rounded-md" />
          </div>
        </div>
      ))}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                         SOLUTIONS SKELETON COMPONENTS                      */
/* -------------------------------------------------------------------------- */

export const SolutionCardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-10" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 bg-slate-900/90 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-right rtl:text-right ltr:text-left"
        >
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
              <div className="space-y-2">
                <Skeleton className="w-40 h-6 rounded-md" />
                <Skeleton className="w-24 h-4 rounded-full" />
              </div>
            </div>

            <Skeleton className="w-3/4 h-4 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="w-full h-3.5 rounded-md" />
              <Skeleton className="w-4/5 h-3.5 rounded-md" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                  <Skeleton className="w-3/4 h-3.5 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 text-center">
            <div className="space-y-2 flex flex-col items-center">
              <Skeleton className="w-24 h-3 rounded-md" />
              <Skeleton className="w-44 h-4 rounded-md" />
            </div>
            <Skeleton className="w-full h-11 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};
