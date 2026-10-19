import React, { useState, useEffect } from 'react';
import { AlertCircle, Key, ExternalLink, X } from 'lucide-react';
import { isDemoModeActive } from '../../services/api';

interface DemoModeBannerProps {
  onOpenStatusModal: () => void;
}

export const DemoModeBanner: React.FC<DemoModeBannerProps> = ({ onOpenStatusModal }) => {
  const [isDemo, setIsDemo] = useState(isDemoModeActive());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleChanged = (e: any) => {
      setIsDemo(e.detail?.active ?? isDemoModeActive());
    };
    window.addEventListener('ankix_demo_mode_changed', handleChanged);
    return () => window.removeEventListener('ankix_demo_mode_changed', handleChanged);
  }, []);

  if (!isDemo || dismissed) return null;

  return (
    <aside aria-label="Demo mode warning" className="relative z-30 bg-gradient-to-r from-amber-950/90 via-purple-950/90 to-brand-navy border-b border-amber-500/40 px-4 py-2 text-xs text-amber-200">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono font-bold text-[10px] tracking-wider uppercase">
            DEMO MODE ACTIVE
          </span>
          <span className="text-white/90 font-medium">
            Displaying sample reference matches for UI evaluation. Real matches require a Cricket Data API key.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenStatusModal}
            className="inline-flex items-center gap-1 font-semibold text-amber-300 hover:text-white underline underline-offset-2 transition-colors"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Configure CRICKET_API_KEY</span>
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded text-amber-300/70 hover:text-white hover:bg-white/10"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
