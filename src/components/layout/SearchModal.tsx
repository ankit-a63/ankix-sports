import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Radio, Calendar, Trophy, ChevronRight } from 'lucide-react';
import { CricketMatch } from '../../types/cricket';
import { getTeamIdentity } from '../../utils/cricketAssets';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: CricketMatch[];
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, matches }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredMatches = query.trim()
    ? matches.filter(m => {
        const q = query.toLowerCase();
        return (
          m.name.toLowerCase().includes(q) ||
          m.teams.some(t => t.toLowerCase().includes(q)) ||
          (m.seriesName && m.seriesName.toLowerCase().includes(q)) ||
          (m.venue && m.venue.toLowerCase().includes(q))
        );
      })
    : matches.slice(0, 5);

  const handleSelect = (matchId: string) => {
    onClose();
    navigate(`/match/${matchId}`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-2xl rounded-2xl glass-card border border-brand-border/80 shadow-2xl overflow-hidden"
        >
          {/* Input Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-border/60">
            <Search className="w-5 h-5 text-brand-emerald flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search teams (India, CSK), tournaments (IPL), or venues..."
              className="w-full bg-transparent text-white placeholder-brand-muted text-sm sm:text-base focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-brand-muted hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-brand-muted bg-brand-surface rounded border border-brand-border">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-brand-muted">
              {query.trim() ? `Found ${filteredMatches.length} Matches` : 'Recent & Popular Fixtures'}
            </div>

            {filteredMatches.length === 0 ? (
              <div className="text-center py-10 text-brand-muted text-sm">
                No fixtures matched &quot;{query}&quot;
              </div>
            ) : (
              filteredMatches.map(m => {
                const team1 = getTeamIdentity(m.teams[0]);
                const team2 = getTeamIdentity(m.teams[1]);

                return (
                  <button
                    key={m.id}
                    onClick={() => handleSelect(m.id)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-brand-surface/90 text-left transition-colors border border-transparent hover:border-brand-border group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex -space-x-1 flex-shrink-0">
                        <div
                          className="w-6 h-6 rounded-full overflow-hidden bg-brand-surface border border-brand-border flex items-center justify-center p-0.5"
                          dangerouslySetInnerHTML={{ __html: team1.badgeSvg }}
                        />
                        <div
                          className="w-6 h-6 rounded-full overflow-hidden bg-brand-surface border border-brand-border flex items-center justify-center p-0.5"
                          dangerouslySetInnerHTML={{ __html: team2.badgeSvg }}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-brand-emerald transition-colors truncate">
                          {m.name}
                        </div>
                        <div className="text-xs text-brand-muted truncate">
                          {m.seriesName || m.matchType.toUpperCase()} • {m.venue}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      {m.isLive ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-brand-emerald bg-brand-emerald/15 px-2 py-0.5 rounded-full border border-brand-emerald/40">
                          <Radio className="w-2.5 h-2.5 animate-pulse" />
                          LIVE
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-brand-muted uppercase">
                          {m.isCompleted ? 'FINAL' : 'UPCOMING'}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-brand-subtle group-hover:text-white transition-colors" />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
