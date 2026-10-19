import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ShieldCheck, Sparkles, Layers } from 'lucide-react';

interface LogoShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoShowcaseModal: React.FC<LogoShowcaseModalProps> = ({ isOpen, onClose }) => {
  const [backgroundMode, setBackgroundMode] = useState<'dark' | 'charcoal' | 'light'>('dark');

  const logos = [
    {
      id: 'primary',
      title: 'Primary Brand Logo',
      subtitle: 'Full horizontal lockup with monogram, wordmark & tagline',
      file: '/assets/logos/ankix-logo-primary.svg',
      recommendedFor: 'Navbar, Hero Header, Pitch Presentations, Brand Partnerships',
    },
    {
      id: 'monogram',
      title: 'App Icon & Monogram Badge',
      subtitle: 'High-impact 3D stadium shield with glowing cricket ball',
      file: '/assets/logos/ankix-logo-monogram.svg',
      recommendedFor: 'Mobile App Icon, Social Media Avatars, Favicons, App Store',
    },
    {
      id: 'stadium',
      title: 'Stadium Crest Tournament Emblem',
      subtitle: 'Athletic crest with crossed bats, hexagonal frame & established seal',
      file: '/assets/logos/ankix-logo-stadium.svg',
      recommendedFor: 'Tournament Trophies, Match Centres, Official Badges, Jerseys',
    },
    {
      id: 'minimal',
      title: 'Minimalist Vector Silhouette',
      subtitle: 'Streamlined stumps with dynamic ball motion in flight',
      file: '/assets/logos/ankix-logo-minimal.svg',
      recommendedFor: 'Broadcast Watermarks, Small Prints, Merchandise, Dark & Light UI',
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl rounded-3xl glass-card border border-brand-border/80 p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-brand-border/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-surface text-brand-emerald border border-brand-border shadow-inner">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-display font-extrabold text-white">
                  ANKIX SPORTS Brand Identity Suite
                </h3>
                <p className="text-xs text-brand-muted font-mono mt-0.5">
                  Official Vector SVG Logos • 100% Scalable
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Preview Background Switcher */}
              <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono">
                <button
                  onClick={() => setBackgroundMode('dark')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    backgroundMode === 'dark' ? 'bg-brand-bg text-brand-emerald font-bold' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setBackgroundMode('charcoal')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    backgroundMode === 'charcoal' ? 'bg-brand-charcoal text-white font-bold' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  Charcoal
                </button>
                <button
                  onClick={() => setBackgroundMode('light')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    backgroundMode === 'light' ? 'bg-white text-black font-bold' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  Light
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-brand-muted hover:text-white hover:bg-brand-surface transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Logos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            {logos.map(logo => {
              const bgClass =
                backgroundMode === 'dark'
                  ? 'bg-[#070B14]'
                  : backgroundMode === 'charcoal'
                  ? 'bg-[#152238]'
                  : 'bg-[#F1F5F9]';

              return (
                <div
                  key={logo.id}
                  className="rounded-2xl glass-card border border-brand-border/70 overflow-hidden flex flex-col justify-between"
                >
                  {/* Logo Preview Canvas */}
                  <div className={`p-8 flex items-center justify-center min-h-[170px] ${bgClass} transition-colors duration-200 border-b border-brand-border/50`}>
                    <img
                      src={logo.file}
                      alt={logo.title}
                      className="max-h-24 w-auto object-contain filter drop-shadow-md"
                    />
                  </div>

                  {/* Logo Details */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="text-base font-bold text-white">{logo.title}</h4>
                      <p className="text-xs text-brand-muted mt-0.5">{logo.subtitle}</p>
                    </div>

                    <div className="text-[11px] font-mono text-brand-subtle">
                      <span className="text-brand-emerald font-semibold">Recommended for:</span> {logo.recommendedFor}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-brand-muted uppercase">SVG Vector Format</span>
                      <a
                        href={logo.file}
                        download={`${logo.id}-ankix-logo.svg`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-surface hover:bg-brand-charcoal text-brand-emerald hover:text-white border border-brand-border transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download SVG</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-emerald" />
              <span>100% Original Vector Artwork • ANKIX SPORTS &copy; 2026</span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl font-semibold bg-brand-surface hover:bg-brand-charcoal border border-brand-border text-white transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
