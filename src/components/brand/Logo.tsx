import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  isLink?: boolean;
  shieldOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  isLink = true,
  shieldOnly = false,
}) => {
  const sizeMap = {
    sm: { imgH: 'h-7 sm:h-8', text: 'text-base sm:text-lg', sportsText: 'text-xs', space: 'gap-2' },
    md: { imgH: 'h-9 sm:h-10', text: 'text-lg sm:text-xl', sportsText: 'text-xs sm:text-sm', space: 'gap-2.5' },
    lg: { imgH: 'h-12 sm:h-14', text: 'text-xl sm:text-2xl', sportsText: 'text-sm sm:text-base', space: 'gap-3' },
    xl: { imgH: 'h-20 sm:h-24', text: 'text-2xl sm:text-3xl', sportsText: 'text-base sm:text-lg', space: 'gap-3' },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`group inline-flex items-center ${currentSize.space} ${className}`}>
      {/* Official Uploaded ANKIX SPORTS Shield Emblem */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <img
          src="/assets/logos/ankix-logo.png"
          alt="ANKIX SPORTS Official Crest"
          className={`${currentSize.imgH} w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_12px_rgba(0,245,155,0.35)]`}
          loading="eager"
        />
      </div>

      {!shieldOnly && size !== 'xl' && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className={`font-display font-black tracking-wider text-white ${currentSize.text}`}>
              ANKIX
            </span>
            <span className={`font-display font-extrabold tracking-widest text-brand-emerald text-glow-emerald ${currentSize.sportsText}`}>
              SPORTS
            </span>
          </div>

          {showTagline && (
            <span className="text-[10px] tracking-[0.2em] font-mono text-brand-muted uppercase mt-1 font-semibold">
              EVERY RUN. EVERY MOMENT.
            </span>
          )}
        </div>
      )}

      {size === 'xl' && showTagline && (
        <div className="flex flex-col items-center">
          <span className="text-xs tracking-[0.25em] font-mono text-brand-emerald uppercase font-bold text-glow-emerald">
            EVERY RUN. EVERY MOMENT.
          </span>
        </div>
      )}
    </div>
  );

  if (!isLink) {
    return content;
  }

  return (
    <Link to="/" className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald rounded-lg" aria-label="ANKIX SPORTS Home">
      {content}
    </Link>
  );
};
