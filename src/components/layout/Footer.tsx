import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, ShieldCheck, Heart, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { CREATOR_LINKS, GitHubIcon, LinkedInIcon, CreatorCard } from './SocialLinks';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-brand-bg border-t border-brand-border/60 text-brand-muted text-sm relative overflow-hidden">
      {/* Stadium Grid Glow subtle footer backdrop */}
      <div className="absolute inset-0 bg-stadium-grid opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-48 bg-brand-emerald/5 blur-3xl pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-brand-border/40">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" showTagline={true} />
            <p className="text-xs text-brand-muted max-w-sm leading-relaxed mt-3">
              ANKIX SPORTS is an elite live cricket score platform delivering genuine international and domestic cricket data, real-time match centres, scorecards, upcoming fixtures, and tournament standings.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-emerald font-mono">
              <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
              <span>TIMEZONE: ASIA/KOLKATA (IST)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Scores & Fixtures
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/live" className="hover:text-brand-emerald transition-colors flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-brand-emerald" />
                  <span>Live Matches</span>
                </Link>
              </li>
              <li>
                <Link to="/upcoming" className="hover:text-white transition-colors">
                  Upcoming Fixtures
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-white transition-colors">
                  Recent Results
                </Link>
              </li>
              <li>
                <Link to="/series" className="hover:text-white transition-colors">
                  Series & Tournaments
                </Link>
              </li>
              <li>
                <Link to="/points-table" className="hover:text-white transition-colors">
                  Points Table
                </Link>
              </li>
            </ul>
          </div>

          {/* Coverage */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Major Circuits
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-white/80">ICC World Test Championship</li>
              <li className="text-white/80">ICC Men&apos;s T20 World Cup</li>
              <li className="text-white/80">Indian Premier League (IPL)</li>
              <li className="text-white/80">Border-Gavaskar Trophy</li>
              <li className="text-white/80">The Ashes Series</li>
            </ul>
          </div>

          {/* Data Provider & Integrity */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Data Integrity
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Powered by server-side verification using CricAPI / CricketData.org feeds. Scores, overs, and match outcomes reflect official match states without synthetic simulation.
            </p>
            <a
              href="https://cricketdata.org/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-brand-cyan hover:underline font-mono"
            >
              <span>cricketdata.org</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Creator & Platform Architecture Showcase */}
        <div className="py-8 border-b border-brand-border/40 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <CreatorCard />
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            {/* Live Sports Data Partner Attribution */}
            <div className="p-3.5 rounded-xl bg-brand-surface/40 border border-brand-border/40">
              <span className="text-[11px] font-mono uppercase text-brand-emerald font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                Data Provider Attribution
              </span>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                Special thanks to <a href="https://cricketdata.org/" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-brand-cyan underline">CricketData.org (CricAPI)</a> for providing authentic live sports data APIs and real-time match coverage.
              </p>
              <a
                href="https://cricketdata.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-brand-cyan hover:underline inline-flex items-center gap-1.5 mt-2"
              >
                <span>cricketdata.org</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-brand-surface/40 border border-brand-border/40 flex items-center justify-between text-xs">
              <span className="text-brand-muted">Direct Contact</span>
              <div className="flex items-center gap-3">
                <a
                  href={CREATOR_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-muted hover:text-white flex items-center gap-1 transition-colors"
                >
                  <GitHubIcon className="w-3.5 h-3.5 text-brand-emerald" />
                  <span>GitHub</span>
                </a>
                <span className="text-brand-border">•</span>
                <a
                  href={CREATOR_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-muted hover:text-white flex items-center gap-1 transition-colors"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-subtle">
          <div>
            &copy; {new Date().getFullYear()} ANKIX SPORTS. Developed by <a href={CREATOR_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-emerald font-semibold transition-colors">Ankit</a>. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Built for cricket fans worldwide</span>
            <span className="text-brand-emerald">•</span>
            <span className="font-mono text-brand-muted">V1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
