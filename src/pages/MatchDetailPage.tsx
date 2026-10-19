import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Radio,
  Clock,
  MapPin,
  Trophy,
  RefreshCw,
  Info,
  Layers,
  ShieldCheck,
  Flame,
  MessageSquare,
} from 'lucide-react';
import { cricketApi } from '../services/api';
import { getTeamIdentity, formatToIST } from '../utils/cricketAssets';
import { MatchDetailData, ScorecardInning } from '../types/cricket';

export const MatchDetailPage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [activeTab, setActiveTab] = useState<'summary' | 'scorecard' | 'commentary' | 'info'>('summary');
  const [selectedInningIndex, setSelectedInningIndex] = useState<number>(0);

  const {
    data: response,
    isLoading,
    isRefetching,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => cricketApi.getMatchDetail(matchId || ''),
    enabled: Boolean(matchId),
    refetchInterval: 30000, // 30s interval for match centre
  });

  const match: MatchDetailData | null = response?.data || null;

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 container mx-auto px-4 max-w-5xl">
        <div className="h-64 rounded-3xl glass-card animate-pulse border border-brand-border/60 mb-8" />
        <div className="h-96 rounded-3xl glass-card animate-pulse border border-brand-border/60" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen py-24 container mx-auto px-4 text-center max-w-md">
        <div className="p-4 rounded-2xl glass-panel border border-brand-border/60 mb-6">
          <Info className="w-10 h-10 text-brand-cyan mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">Match Not Found</h2>
          <p className="text-xs text-brand-muted mb-4">
            The requested match ID could not be loaded from the live feed or demo database.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-emerald text-brand-bg hover:bg-brand-emeraldHover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Match Arena</span>
          </Link>
        </div>
      </div>
    );
  }

  const team1Name = match.teams?.[0] || 'Team 1';
  const team2Name = match.teams?.[1] || 'Team 2';
  const team1 = getTeamIdentity(team1Name);
  const team2 = getTeamIdentity(team2Name);

  const team1Score = match.score?.find(s => s.inning.toLowerCase().includes(team1Name.toLowerCase())) || match.score?.[0];
  const team2Score = match.score?.find(s => s.inning.toLowerCase().includes(team2Name.toLowerCase())) || (match.score && match.score.length > 1 ? match.score[1] : undefined);

  const istSchedule = formatToIST(match.dateTimeGMT || match.date);
  const scorecardInnings: ScorecardInning[] = match.scorecard || [];
  const activeInning = scorecardInnings[selectedInningIndex] || scorecardInnings[0];

  const lastUpdated = dataUpdatedAt
    ? new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date(dataUpdatedAt))
    : null;

  return (
    <div className="min-h-screen pb-16">
      
      {/* Cinematic Match Stadium Banner Header */}
      <section className="relative pt-6 pb-12 stadium-mesh border-b border-brand-border/60 overflow-hidden">
        {/* Stadium Floodlight Accents */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[250px] bg-brand-emerald/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[200px] bg-brand-cyan/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
          
          {/* Navigation Bar */}
          <div className="flex items-center justify-between pb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-white px-3 py-1.5 rounded-lg bg-brand-surface/80 border border-brand-border hover:border-brand-emerald/40 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Fixtures</span>
            </Link>

            <div className="flex items-center gap-3">
              {match.isLive && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/50 text-xs font-mono font-bold tracking-wider">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  LIVE ARENA
                </span>
              )}

              <button
                onClick={() => refetch()}
                disabled={isRefetching}
                className="p-1.5 rounded-lg bg-brand-surface hover:bg-brand-charcoal text-brand-muted hover:text-white border border-brand-border"
                title="Refresh score"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin text-brand-emerald' : ''}`} />
              </button>
            </div>
          </div>

          {/* Tournament & Venue Badge */}
          <div className="text-center space-y-1 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface/90 border border-brand-border text-xs font-mono text-brand-muted">
              <span className="text-brand-emerald font-bold uppercase">{match.matchType.toUpperCase()}</span>
              <span>•</span>
              <span className="text-white">{match.seriesName || match.name}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-brand-muted">
              <MapPin className="w-3.5 h-3.5 text-brand-subtle" />
              <span>{match.venue}</span>
              <span>•</span>
              <span>{istSchedule.full}</span>
            </div>
          </div>

          {/* Team Duel Display */}
          <div className="rounded-3xl glass-card border border-brand-border/80 p-6 sm:p-8 shadow-card-elevated">
            <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
              
              {/* Team 1 */}
              <div className="md:col-span-5 flex items-center justify-between md:justify-end gap-4 text-right">
                <div className="order-2 md:order-1 min-w-0">
                  <h3 className="text-lg sm:text-2xl font-display font-extrabold text-white truncate">
                    {team1.name}
                  </h3>
                  {team1Score ? (
                    <div className="font-mono mt-1">
                      <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                        {team1Score.r}
                        <span className="text-brand-muted text-lg font-normal">/{team1Score.w}</span>
                      </span>
                      <span className="text-xs text-brand-muted block mt-0.5 font-sans">
                        {team1Score.o} overs
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-mono text-brand-subtle">Yet to bat</span>
                  )}
                </div>

                <div
                  className="order-1 md:order-2 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-brand-surface border-2 border-brand-border flex items-center justify-center p-1 flex-shrink-0 shadow-md"
                  dangerouslySetInnerHTML={{ __html: team1.badgeSvg }}
                />
              </div>

              {/* VS Divider */}
              <div className="md:col-span-1 text-center font-mono font-bold text-xs text-brand-subtle">
                <div className="inline-block px-2.5 py-1 rounded-full bg-brand-surface border border-brand-border">
                  VS
                </div>
              </div>

              {/* Team 2 */}
              <div className="md:col-span-5 flex items-center justify-between md:justify-start gap-4 text-left">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-brand-surface border-2 border-brand-border flex items-center justify-center p-1 flex-shrink-0 shadow-md"
                  dangerouslySetInnerHTML={{ __html: team2.badgeSvg }}
                />

                <div className="min-w-0">
                  <h3 className="text-lg sm:text-2xl font-display font-extrabold text-white truncate">
                    {team2.name}
                  </h3>
                  {team2Score ? (
                    <div className="font-mono mt-1">
                      <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                        {team2Score.r}
                        <span className="text-brand-muted text-lg font-normal">/{team2Score.w}</span>
                      </span>
                      <span className="text-xs text-brand-muted block mt-0.5 font-sans">
                        {team2Score.o} overs
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-mono text-brand-subtle">
                      {match.isUpcoming ? 'Scheduled' : 'Yet to bat'}
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Current Match Situation Banner */}
            <div className="mt-6 pt-5 border-t border-brand-border/60 text-center">
              <p className="text-sm sm:text-base font-semibold text-brand-emerald">
                {match.status}
              </p>
              {match.tossWinner && (
                <p className="text-xs text-brand-muted mt-1 font-mono">
                  Toss: {match.tossWinner} chose to {match.tossChoice}
                </p>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[
              { id: 'summary', label: 'Summary' },
              { id: 'scorecard', label: 'Scorecard' },
              { id: 'commentary', label: 'Commentary' },
              { id: 'info', label: 'Match Info' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-brand-emerald text-brand-bg font-bold shadow-emerald-glow'
                    : 'bg-brand-surface text-brand-muted hover:text-white hover:bg-brand-charcoal border border-brand-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Tab Panels */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 max-w-5xl">
        
        {/* TAB 1: SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Quick Match Facts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl glass-card border border-brand-border/60">
                <span className="text-xs font-mono text-brand-muted uppercase">Toss Decision</span>
                <p className="text-sm font-bold text-white mt-1">
                  {match.tossWinner ? `${match.tossWinner} (Elected to ${match.tossChoice})` : 'Pending'}
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-brand-border/60">
                <span className="text-xs font-mono text-brand-muted uppercase">Match Format</span>
                <p className="text-sm font-bold text-brand-emerald uppercase mt-1">
                  {match.matchType} Match
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-brand-border/60">
                <span className="text-xs font-mono text-brand-muted uppercase">Venue</span>
                <p className="text-sm font-bold text-white mt-1 truncate">
                  {match.venue}
                </p>
              </div>
            </div>

            {/* Innings Summary Cards */}
            {match.score && match.score.length > 0 ? (
              <div className="space-y-4">
                <h4 className="text-sm font-mono font-bold uppercase text-brand-muted">
                  Innings Breakdown
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {match.score.map((inn, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl glass-card border border-brand-border/60 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-semibold text-brand-muted">
                          Inning {idx + 1}
                        </span>
                        <h4 className="text-base font-bold text-white mt-0.5">{inn.inning}</h4>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-2xl font-extrabold text-brand-emerald tabular-nums">
                          {inn.r}/{inn.w}
                        </div>
                        <span className="text-xs text-brand-muted">{inn.o} overs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Honest Integrity Notice */}
            <div className="p-4 rounded-xl bg-brand-surface/60 border border-brand-border text-xs text-brand-muted flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
              <span>
                Scores are directly synchronized from official provider match feeds. ANKIX SPORTS strictly adheres to factual cricket outcomes.
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: SCORECARD */}
        {activeTab === 'scorecard' && (
          <div className="space-y-6">
            {scorecardInnings.length === 0 ? (
              <div className="text-center py-12 rounded-2xl glass-panel border border-brand-border p-6">
                <Info className="w-8 h-8 text-brand-cyan mx-auto mb-3" />
                <h4 className="text-base font-bold text-white">Full Scorecard Data Pending</h4>
                <p className="text-xs text-brand-muted max-w-md mx-auto mt-1 leading-relaxed">
                  Detailed ball-by-ball batting and bowling tables will be populated as official scorecard records are broadcasted by the data provider for this fixture.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Inning Switcher */}
                {scorecardInnings.length > 1 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {scorecardInnings.map((inn, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedInningIndex(idx)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-colors ${
                          selectedInningIndex === idx
                            ? 'bg-brand-emerald text-brand-bg font-bold'
                            : 'bg-brand-surface text-brand-muted hover:text-white border border-brand-border'
                        }`}
                      >
                        {inn.inning}
                      </button>
                    ))}
                  </div>
                )}

                {/* Batting Scorecard Table */}
                <div className="rounded-2xl glass-card border border-brand-border/60 overflow-hidden">
                  <div className="px-5 py-3.5 bg-brand-charcoal border-b border-brand-border flex items-center justify-between">
                    <h4 className="text-xs font-mono font-bold uppercase text-white">
                      Batting • {activeInning?.inning}
                    </h4>
                    {activeInning?.totals && (
                      <span className="text-xs font-mono text-brand-emerald">
                        TOTAL: {activeInning.totals.R}/{activeInning.totals.W} ({activeInning.totals.O} ov)
                      </span>
                    )}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-brand-surface/40 text-brand-muted text-[11px] font-mono uppercase border-b border-brand-border/40">
                        <tr>
                          <th className="py-3 px-4">Batter</th>
                          <th className="py-3 px-3">Dismissal</th>
                          <th className="py-3 px-3 text-right font-bold text-white">R</th>
                          <th className="py-3 px-3 text-right">B</th>
                          <th className="py-3 px-3 text-right">4s</th>
                          <th className="py-3 px-3 text-right">6s</th>
                          <th className="py-3 px-4 text-right">SR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border/30 font-mono">
                        {activeInning?.batting.map((b, i) => (
                          <tr key={i} className="hover:bg-brand-surface/40 transition-colors">
                            <td className="py-3 px-4 font-sans font-semibold text-white">
                              {b.batsman.name}
                            </td>
                            <td className="py-3 px-3 font-sans text-xs text-brand-muted">
                              {b['dismissal-text'] || b.dismissal || 'not out'}
                            </td>
                            <td className="py-3 px-3 text-right font-bold text-white text-sm tabular-nums">
                              {b.r}
                            </td>
                            <td className="py-3 px-3 text-right text-brand-muted tabular-nums">{b.b}</td>
                            <td className="py-3 px-3 text-right text-brand-muted tabular-nums">{b['4s']}</td>
                            <td className="py-3 px-3 text-right text-brand-muted tabular-nums">{b['6s']}</td>
                            <td className="py-3 px-4 text-right text-brand-emerald tabular-nums">
                              {b.sr}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Extras Breakdown */}
                  {activeInning?.extras && (
                    <div className="px-5 py-3 bg-brand-surface/30 border-t border-brand-border/40 text-xs font-mono text-brand-muted flex flex-wrap items-center justify-between gap-2">
                      <span>
                        Extras: <strong className="text-white">{activeInning.extras.r}</strong> (b {activeInning.extras.b}, lb {activeInning.extras.lb}, w {activeInning.extras.w}, nb {activeInning.extras.nb})
                      </span>
                      <span>
                        Run Rate: <strong className="text-brand-emerald">{activeInning.totals?.RR}</strong>
                      </span>
                    </div>
                  )}
                </div>

                {/* Bowling Scorecard Table */}
                <div className="rounded-2xl glass-card border border-brand-border/60 overflow-hidden">
                  <div className="px-5 py-3.5 bg-brand-charcoal border-b border-brand-border">
                    <h4 className="text-xs font-mono font-bold uppercase text-white">
                      Bowling • {activeInning?.inning}
                    </h4>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-brand-surface/40 text-brand-muted text-[11px] font-mono uppercase border-b border-brand-border/40">
                        <tr>
                          <th className="py-3 px-4">Bowler</th>
                          <th className="py-3 px-3 text-right">O</th>
                          <th className="py-3 px-3 text-right">M</th>
                          <th className="py-3 px-3 text-right">R</th>
                          <th className="py-3 px-3 text-right font-bold text-white">W</th>
                          <th className="py-3 px-3 text-right">Econ</th>
                          <th className="py-3 px-4 text-right">WD / NB</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border/30 font-mono">
                        {activeInning?.bowling.map((bw, i) => (
                          <tr key={i} className="hover:bg-brand-surface/40 transition-colors">
                            <td className="py-3 px-4 font-sans font-semibold text-white">
                              {bw.bowler.name}
                            </td>
                            <td className="py-3 px-3 text-right text-brand-muted tabular-nums">{bw.o}</td>
                            <td className="py-3 px-3 text-right text-brand-muted tabular-nums">{bw.m}</td>
                            <td className="py-3 px-3 text-right text-brand-muted tabular-nums">{bw.r}</td>
                            <td className="py-3 px-3 text-right font-bold text-brand-emerald text-sm tabular-nums">
                              {bw.w}
                            </td>
                            <td className="py-3 px-3 text-right text-brand-muted tabular-nums">{bw.eco}</td>
                            <td className="py-3 px-4 text-right text-brand-subtle tabular-nums">
                              {bw.wd} / {bw.nb}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COMMENTARY */}
        {activeTab === 'commentary' && (
          <div className="space-y-4">
            <div className="rounded-2xl glass-card border border-brand-border/60 p-8 text-center max-w-lg mx-auto">
              <MessageSquare className="w-10 h-10 text-brand-cyan mx-auto mb-3" />
              <h4 className="text-base font-bold text-white">
                Live Commentary Feed Status
              </h4>
              <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                As per the official Cricket Data API specifications, live ball-by-ball commentary text is currently under provider testing and restricted to specific licensed fantasy tiers.
              </p>
              <div className="mt-4 p-3 rounded-xl bg-brand-surface border border-brand-border text-xs text-brand-subtle font-mono text-left">
                &gt; Integrity Note: ANKIX SPORTS strictly adheres to genuine provider broadcast data and never manufactures synthetic or simulated commentary.
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MATCH INFO */}
        {activeTab === 'info' && (
          <div className="rounded-2xl glass-card border border-brand-border/60 p-6 space-y-4 text-xs sm:text-sm">
            <h4 className="text-sm font-mono font-bold uppercase text-white pb-3 border-b border-brand-border">
              Official Match Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/50">
                <span className="text-xs font-mono text-brand-muted uppercase">Tournament / Series</span>
                <p className="font-semibold text-white mt-1">{match.seriesName || match.name}</p>
              </div>

              <div className="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/50">
                <span className="text-xs font-mono text-brand-muted uppercase">Match Format</span>
                <p className="font-semibold text-brand-emerald uppercase mt-1">{match.matchType}</p>
              </div>

              <div className="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/50">
                <span className="text-xs font-mono text-brand-muted uppercase">Venue</span>
                <p className="font-semibold text-white mt-1">{match.venue}</p>
              </div>

              <div className="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/50">
                <span className="text-xs font-mono text-brand-muted uppercase">Scheduled Start (IST)</span>
                <p className="font-semibold text-white mt-1">{istSchedule.full}</p>
              </div>

              {match.umpires && match.umpires.length > 0 && (
                <div className="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/50">
                  <span className="text-xs font-mono text-brand-muted uppercase">On-field Umpires</span>
                  <p className="font-semibold text-white mt-1">{match.umpires.join(', ')}</p>
                </div>
              )}

              {match.referee && (
                <div className="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/50">
                  <span className="text-xs font-mono text-brand-muted uppercase">Match Referee</span>
                  <p className="font-semibold text-white mt-1">{match.referee}</p>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
