import React from 'react';
import { Calendar, Radio, RefreshCw } from 'lucide-react';

interface EmptyMatchesStateProps {
  category: string;
  onRefresh?: () => void;
  onViewAll?: () => void;
}

export const EmptyMatchesState: React.FC<EmptyMatchesStateProps> = ({
  category,
  onRefresh,
  onViewAll,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl glass-panel border border-brand-border/60 max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-full bg-brand-surface flex items-center justify-center text-brand-emerald mb-4 border border-brand-border shadow-inner">
        {category === 'live' ? (
          <Radio className="w-8 h-8 text-brand-emerald animate-pulse" />
        ) : (
          <Calendar className="w-8 h-8 text-brand-cyan" />
        )}
      </div>

      <h3 className="text-xl font-display font-bold text-white mb-2">
        {category === 'live'
          ? 'No Genuine Matches Live Right Now'
          : `No ${category.charAt(0).toUpperCase() + category.slice(1)} Fixtures Found`}
      </h3>

      <p className="text-sm text-brand-muted max-w-sm mb-6 leading-relaxed">
        {category === 'live'
          ? 'Currently no matches in active play across covered ICC or domestic circuits. Check upcoming matches or recent results.'
          : 'No matches matched this filter in the current schedule returned by the cricket data provider.'}
      </p>

      <div className="flex items-center gap-3">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-surface text-white border border-brand-border hover:border-brand-emerald/40 hover:bg-brand-charcoal transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Check Feed</span>
          </button>
        )}

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-brand-bg hover:bg-brand-emeraldHover font-bold transition-colors"
          >
            <span>View All Fixtures</span>
          </button>
        )}
      </div>
    </div>
  );
};
