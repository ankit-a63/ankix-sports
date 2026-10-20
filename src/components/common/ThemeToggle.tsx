import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isLight, setIsLight] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('ankix_theme') === 'light';
  });

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('theme-light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ankix_theme', 'light');
    } else {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('ankix_theme', 'dark');
    }
  }, [isLight]);

  return (
    <button
      onClick={() => setIsLight(prev => !prev)}
      className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 rounded-xl border border-brand-border bg-brand-surface hover:bg-brand-charcoal text-xs font-mono font-medium text-brand-muted hover:text-white transition-all duration-200"
      title={isLight ? 'Switch to Dark Stadium Mode' : 'Switch to Day Mode'}
      aria-label="Toggle dark/light mode"
    >
      {isLight ? (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden lg:inline text-amber-400 font-bold">LIGHT</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-brand-emerald" />
          <span className="hidden lg:inline text-brand-emerald font-bold">DARK</span>
        </>
      )}
    </button>
  );
};
