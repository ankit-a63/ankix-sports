import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Radio, Menu, X, ShieldCheck } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { isDemoModeActive } from '../../services/api';
import { SocialNavIcons, CREATOR_LINKS, GitHubIcon, LinkedInIcon } from './SocialLinks';
import { ThemeToggle } from '../common/ThemeToggle';

interface NavbarProps {
  liveCount: number;
  onOpenSearch: () => void;
  onOpenApiStatus?: () => void;
  onOpenLogos?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ liveCount, onOpenSearch, onOpenApiStatus, onOpenLogos }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDemo, setIsDemo] = useState(isDemoModeActive());
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Keep demo status synced
  useEffect(() => {
    const handleChanged = (e: any) => {
      setIsDemo(e.detail?.active ?? isDemoModeActive());
    };
    window.addEventListener('ankix_demo_mode_changed', handleChanged);
    return () => window.removeEventListener('ankix_demo_mode_changed', handleChanged);
  }, []);

  // Listen for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  const navLinks = [
    { label: 'Home', path: '/' },
    {
      label: 'Live',
      path: '/live',
      hasLiveBadge: liveCount > 0,
      badgeText: liveCount > 0 ? `${liveCount}` : undefined,
    },
    { label: 'Upcoming', path: '/upcoming' },
    { label: 'Results', path: '/results' },
    { label: 'Series', path: '/series' },
    { label: 'Points Table', path: '/points-table' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-brand-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Logo size="md" showTagline={false} />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-brand-surface shadow-sm'
                      : 'text-brand-muted hover:text-white hover:bg-brand-surface/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {link.hasLiveBadge && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald"></span>
                      </span>
                    )}
                    {isActive && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-emerald rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-brand-surface/80 hover:bg-brand-surface border border-brand-border text-brand-muted hover:text-white text-xs font-medium transition-colors"
              title="Search matches (Ctrl+K)"
              aria-label="Search matches"
            >
              <Search className="w-4 h-4 text-brand-emerald" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-brand-charcoal rounded border border-brand-border/60 text-brand-subtle">
                Ctrl K
              </kbd>
            </button>

            {/* Dark / Light Theme Toggle */}
            <ThemeToggle />

            {/* Social / Developer Links */}
            <div className="hidden sm:flex items-center pl-1 border-l border-brand-border/50">
              <SocialNavIcons />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-brand-surface border border-brand-border text-brand-muted hover:text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border/60 bg-brand-bg/95 backdrop-blur-xl px-4 py-5 space-y-2 animate-fadeIn">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? 'text-brand-emerald bg-brand-surface border border-brand-border'
                    : 'text-brand-muted hover:text-white hover:bg-brand-surface/40'
                }`
              }
            >
              <span>{link.label}</span>
              {link.hasLiveBadge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-emerald/20 text-brand-emerald text-xs font-mono font-bold">
                  <Radio className="w-3 h-3 animate-pulse" />
                  LIVE
                </span>
              )}
            </NavLink>
          ))}

          {/* Mobile Theme Toggle */}
          <div className="pt-3 border-t border-brand-border/40 flex items-center justify-between px-2 text-xs">
            <span className="text-brand-muted">Display Theme</span>
            <ThemeToggle />
          </div>

          {/* Mobile Creator Contact */}
          <div className="pt-3 border-t border-brand-border/40 flex items-center justify-between px-2">
            <span className="text-xs text-brand-muted font-medium">Developed by Ankit</span>
            <div className="flex items-center gap-2">
              <a
                href={CREATOR_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-emerald"
                title="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href={CREATOR_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-brand-surface border border-brand-border text-brand-muted hover:text-cyan-400"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
