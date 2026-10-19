import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    // Dynamic asset & readiness ticker
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 25) + 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 400);
        }, 200);
      } else {
        setProgress(currentProgress);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-bg text-white overflow-hidden"
          role="status"
          aria-live="polite"
        >
          {/* Subtle Background Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-brand-emerald/10 blur-[120px] pointer-events-none" />

          {/* Logo & Cricket Seam Graphic */}
          <div className="relative z-10 flex flex-col items-center space-y-8 px-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Logo size="xl" showTagline={true} isLink={false} />
            </motion.div>

            {/* Spinning Cricket Seam Orbit */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-brand-border border-t-brand-emerald border-r-brand-cyan"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-brand-red to-[#BD1825] shadow-sm relative flex items-center justify-center">
                <div className="w-4 h-0.5 bg-white/70 transform rotate-45" />
              </div>
            </div>

            {/* Progress Bar & Percentage */}
            <div className="w-64 max-w-xs space-y-2">
              <div className="h-1.5 w-full bg-brand-surface rounded-full overflow-hidden border border-brand-border/60">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-emerald to-brand-cyan rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-brand-muted">
                <span>INITIALIZING ENGINE</span>
                <span className="text-brand-emerald font-semibold">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
