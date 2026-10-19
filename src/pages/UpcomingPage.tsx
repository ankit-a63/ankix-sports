import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, MapPin, ChevronRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cricketApi } from '../services/api';
import { CricketMatch } from '../types/cricket';
import { getTeamIdentity, formatToIST, getCountdown } from '../utils/cricketAssets';
import { MatchCardSkeleton } from '../components/match/MatchCardSkeleton';
import { EmptyMatchesState } from '../components/match/EmptyMatchesState';

export const UpcomingPage: React.FC = () => {
  const [formatFilter, setFormatFilter] = useState<string>('all');

  const { data: response, isLoading } = useQuery({
    queryKey: ['matches', 'upcoming'],
    queryFn: () => cricketApi.getUpcomingMatches(),
  });

  const matches: CricketMatch[] = response?.data || [];

  const filteredMatches = matches.filter(m => {
    if (formatFilter === 'all') return true;
    return m.matchType.toLowerCase() === formatFilter.toLowerCase();
  });

  // Group matches by date
  const groupedMatches: Record<string, CricketMatch[]> = {};
  filteredMatches.forEach(match => {
    const dateKey = match.date || 'Upcoming';
    if (!groupedMatches[dateKey]) {
      groupedMatches[dateKey] = [];
    }
    groupedMatches[dateKey].push(match);
  });

  return (
    <div className="min-h-screen py-10 container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border/60">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-surface text-brand-cyan border border-brand-border">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-extrabold text-white">
                UPCOMING FIXTURES
              </h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                Scheduled international and domestic cricket fixtures in Asia/Kolkata (IST)
              </p>
            </div>
          </div>
        </div>

        {/* Format Filters */}
        <div className="flex items-center gap-2">
          {['all', 't20', 'odi', 'test'].map(fmt => (
            <button
              key={fmt}
              onClick={() => setFormatFilter(fmt)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase transition-colors ${
                formatFilter === fmt
                  ? 'bg-brand-emerald text-brand-bg font-bold shadow-emerald-glow'
                  : 'bg-brand-surface text-brand-muted hover:text-white border border-brand-border'
              }`}
            >
              {fmt === 'all' ? 'All Formats' : fmt.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <MatchCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredMatches.length === 0 ? (
          <EmptyMatchesState category="upcoming" />
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedMatches).map(([dateKey, matchList]) => {
              const dateHeading = formatToIST(dateKey).date;

              return (
                <div key={dateKey} className="space-y-4">
                  {/* Date Header Badge */}
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 rounded-xl bg-brand-surface/90 border border-brand-border/80 text-xs font-mono font-bold text-brand-cyan uppercase">
                      {dateHeading}
                    </span>
                    <div className="flex-1 h-[1px] bg-brand-border/40" />
                  </div>

                  {/* Matches Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {matchList.map(match => {
                      const team1 = getTeamIdentity(match.teams[0]);
                      const team2 = getTeamIdentity(match.teams[1]);
                      const istTime = formatToIST(match.dateTimeGMT).time;
                      const countdown = getCountdown(match.dateTimeGMT);

                      return (
                        <div
                          key={match.id}
                          className="rounded-2xl glass-card p-5 border border-brand-border/60 hover:border-brand-emerald/40 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between text-xs mb-3">
                              <span className="font-mono uppercase font-bold text-brand-emerald">
                                {match.matchType.toUpperCase()}
                              </span>
                              {countdown && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-brand-cyan bg-brand-surface px-2 py-0.5 rounded-full border border-brand-border">
                                  <Clock className="w-3 h-3" />
                                  {countdown}
                                </span>
                              )}
                            </div>

                            <div className="space-y-3 my-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-full overflow-hidden bg-brand-surface border border-brand-border flex items-center justify-center p-0.5"
                                  dangerouslySetInnerHTML={{ __html: team1.badgeSvg }}
                                />
                                <span className="font-semibold text-white">{team1.name}</span>
                              </div>

                              <div className="text-[11px] font-mono text-brand-subtle pl-4">VS</div>

                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-full overflow-hidden bg-brand-surface border border-brand-border flex items-center justify-center p-0.5"
                                  dangerouslySetInnerHTML={{ __html: team2.badgeSvg }}
                                />
                                <span className="font-semibold text-white">{team2.name}</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-brand-border/40 text-xs text-brand-muted space-y-2">
                            <div className="flex items-center gap-1.5 truncate">
                              <Clock className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0" />
                              <span className="text-white font-mono">{istTime}</span>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 truncate">
                                <MapPin className="w-3.5 h-3.5 text-brand-subtle flex-shrink-0" />
                                <span className="truncate">{match.venue}</span>
                              </div>

                              <Link
                                to={`/match/${match.id}`}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-emerald hover:underline flex-shrink-0"
                              >
                                <span>Preview</span>
                                <ChevronRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
