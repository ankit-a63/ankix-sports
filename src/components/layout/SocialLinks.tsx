import React from 'react';
import { ExternalLink } from 'lucide-react';

export const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const CREATOR_LINKS = {
  github: 'https://github.com/ankit-a63',
  linkedin: 'https://linkedin.com/in/ankit-a63',
};

export const SocialNavIcons: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5">
      <a
        href={CREATOR_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-brand-surface/70 hover:bg-brand-surface border border-brand-border/60 hover:border-brand-emerald/40 text-brand-muted hover:text-white transition-all duration-200"
        title="Ankit on GitHub (github.com/ankit-a63)"
        aria-label="GitHub Profile"
      >
        <GitHubIcon className="w-4 h-4 text-brand-muted hover:text-brand-emerald transition-colors" />
      </a>
      <a
        href={CREATOR_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-brand-surface/70 hover:bg-brand-surface border border-brand-border/60 hover:border-cyan-400/40 text-brand-muted hover:text-cyan-400 transition-all duration-200"
        title="Ankit on LinkedIn (linkedin.com/in/ankit-a63)"
        aria-label="LinkedIn Profile"
      >
        <LinkedInIcon className="w-4 h-4 text-brand-muted hover:text-cyan-400 transition-colors" />
      </a>
    </div>
  );
};

export const CreatorCard: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-charcoal/90 to-brand-surface/80 border border-brand-border/80 shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/10 blur-2xl pointer-events-none rounded-full" />
      
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-emerald via-teal-500 to-cyan-500 flex items-center justify-center text-brand-bg font-black font-mono text-base shadow-glow-emerald">
            A
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h5 className="text-sm font-bold text-white tracking-wide">ANKIT</h5>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/30">
                CREATOR
              </span>
            </div>
            <p className="text-[11px] text-brand-muted mt-0.5">
              Full-Stack & Cricket Platform Architect
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-brand-border/50 flex flex-wrap items-center gap-2 relative z-10">
        <a
          href={CREATOR_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-bg/80 hover:bg-brand-bg border border-brand-border/70 hover:border-brand-emerald/50 text-xs font-medium text-white transition-all shadow-sm"
        >
          <GitHubIcon className="w-3.5 h-3.5 text-brand-emerald" />
          <span>GitHub</span>
          <ExternalLink className="w-3 h-3 text-brand-subtle" />
        </a>

        <a
          href={CREATOR_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-bg/80 hover:bg-brand-bg border border-brand-border/70 hover:border-cyan-400/50 text-xs font-medium text-white transition-all shadow-sm"
        >
          <LinkedInIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>LinkedIn</span>
          <ExternalLink className="w-3 h-3 text-brand-subtle" />
        </a>
      </div>
    </div>
  );
};
