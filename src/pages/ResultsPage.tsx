import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Trophy, CheckCircle, ChevronRight, Calendar, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cricketApi } from '../services/api';
import { CricketMatch } from '../types/cricket';
import { getTeamIdentity, formatToIST } from '../utils/cricketAssets';
import { MatchCardSkeleton } from '../components/match/MatchCardSkeleton';
import { EmptyMatchesState } from '../components/match/EmptyMatchesState';

export const ResultsPage: React.FC = () => {
  const [formatFilter, setFormatFilter] = useState<string>('all');

  const { data: response, isLoading } = useQuery({
    queryKey: ['matches', 'results'],
    queryFn: () => cricketApi.getResults(),
  });

  const matches: CricketMatch[] = response?.data || [];

  const filteredMatches = matches.filter(m => {
    if (formatFilter === 'all') return true;
    return m.matchType.toLowerCase() === formatFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen py-10 container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border/60">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-surface text-brand-emerald border border-brand-border">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-extrabold text-white">
                CRICKET RESULTS
              </h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                Completed matches, official winning margins, and certified scorecards
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

      {/* Content Grid */}
      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <MatchCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredMatches.length === 0 ? (
          <EmptyMatchesState category="completed" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map(match => {
              const team1 = getTeamIdentity(match.teams[0]);
              const team2 = getTeamIdentity(match.teams[1]);
              const team1Score = match.score?.[0];
              const team2Score = match.score?.[1];
              const istDate = formatToIST(match.date).date;

              return (
                <div
                  key={match.id}
                  className="rounded-2xl glass-card p-5 sm:p-6 border border-brand-border/60 hover:border-brand-emerald/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs pb-3 border-b border-brand-border/40">
                      <span className="font-mono font-bold uppercase text-brand-emerald">
                        {match.matchType.toUpperCase()} • FINAL
                      </span>
                      <span className="text-brand-muted font-mono">{istDate}</span>
                    </div>

                    {/* Teams & Scores */}
                    <div className="space-y-4 my-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full overflow-hidden bg-brand-surface border border-brand-border flex items-center justify-center p-0.5"
                            dangerouslySetInnerHTML={{ __html: team1.badgeSvg }}
                          />
                          <span
                            className={`font-semibold text-sm ${
                              match.matchWinner === team1.name ? 'text-brand-emerald' : 'text-white'
                            }`}
                          >
                            {team1.name}
                          </span>
                        </div>

                        {team1Score && (
                          <div className="text-right font-mono text-sm font-bold text-white tabular-nums">
                            {team1Score.r}/{team1Score.w}
                            <span className="text-[11px] font-normal text-brand-muted ml-1">
                              ({team1Score.o} ov)
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full overflow-hidden bg-brand-surface border border-brand-border flex items-center justify-center p-0.5"
                            dangerouslySetInnerHTML={{ __html: team2.badgeSvg }}
                          />
                          <span
                            className={`font-semibold text-sm ${
                              match.matchWinner === team2.name ? 'text-brand-emerald' : 'text-white'
                            }`}
                          >
                            {team2.name}
                          </span>
                        </div>

                        {team2Score && (
                          <div className="text-right font-mono text-sm font-bold text-white tabular-nums">
                            {team2Score.r}/{team2Score.w}
                            <span className="text-[11px] font-normal text-brand-muted ml-1">
                              ({team2Score.o} ov)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Result & Scorecard Link */}
                  <div className="pt-4 border-t border-brand-border/40 flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-brand-emerald truncate">
                      {match.status}
                    </p>

                    <Link
                      to={`/match/${match.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-surface hover:bg-brand-charcoal border border-brand-border text-white hover:text-brand-emerald transition-colors flex-shrink-0"
                    >
                      <span>Scorecard</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
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
