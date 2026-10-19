import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  isLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  isLink = true,
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', sportsText: 'text-xs', space: 'gap-2' },
    md: { icon: 36, text: 'text-xl', sportsText: 'text-sm', space: 'gap-2.5' },
    lg: { icon: 44, text: 'text-2xl', sportsText: 'text-base', space: 'gap-3' },
    xl: { icon: 56, text: 'text-3xl', sportsText: 'text-lg', space: 'gap-3.5' },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`group inline-flex items-center ${currentSize.space} ${className}`}>
      {/* Custom Vector Monogram Icon */}
      <div className="relative flex-shrink-0">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00F59B" />
              <stop offset="100%" stopColor="#00D8F6" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Obsidian Hexagonal / Shield Base */}
          <rect width="64" height="64" rx="16" fill="#070B14" />
          <rect x="1.5" y="1.5" width="61" height="61" rx="14.5" stroke="#1E2D4A" strokeWidth="2" className="group-hover:stroke-brand-emerald/50 transition-colors" />

          {/* Angular Geometric Monogram A / Stumps */}
          <path d="M32 10 L48 50 L39 50 L34 37 L30 37 L25 50 L16 50 Z" fill="url(#logoGrad)" />
          <polygon points="32,23 36,33 28,33" fill="#070B14" />

          {/* Glowing Cricket Ball Feature with seam */}
          <circle cx="32" cy="27" r="3.5" fill="#00F59B" filter="url(#logoGlow)" />
          <path d="M30 25.5 C31.5 27 32.5 27 34 28.5" stroke="#070B14" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Typography */}
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
    </div>
  );

  if (!isLink) {
    return content;
  }

  return (
    <Link to="/" className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald rounded-lg">
      {content}
    </Link>
  );
};
