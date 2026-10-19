import React from 'react';

export const MatchCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl glass-card p-5 sm:p-6 border border-brand-border/60 animate-pulse flex flex-col justify-between h-[230px]">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between pb-3.5 border-b border-brand-border/40">
        <div className="flex items-center gap-2">
          <div className="w-12 h-5 rounded bg-brand-surface" />
          <div className="w-32 h-4 rounded bg-brand-surface" />
        </div>
        <div className="w-14 h-5 rounded-full bg-brand-surface" />
      </div>

      {/* Teams Skeleton */}
      <div className="space-y-4 my-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-surface" />
            <div className="space-y-1.5">
              <div className="w-24 h-4 rounded bg-brand-surface" />
              <div className="w-10 h-3 rounded bg-brand-surface" />
            </div>
          </div>
          <div className="w-16 h-7 rounded bg-brand-surface" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-surface" />
            <div className="space-y-1.5">
              <div className="w-28 h-4 rounded bg-brand-surface" />
              <div className="w-10 h-3 rounded bg-brand-surface" />
            </div>
          </div>
          <div className="w-16 h-7 rounded bg-brand-surface" />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="pt-3 border-t border-brand-border/40 flex items-center justify-between">
        <div className="w-40 h-4 rounded bg-brand-surface" />
        <div className="w-16 h-6 rounded bg-brand-surface" />
      </div>
    </div>
  );
};
