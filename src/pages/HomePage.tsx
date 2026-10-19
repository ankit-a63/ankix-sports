import React, { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Radio, Calendar, Trophy, CheckCircle, RefreshCw, Layers, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cricketApi } from '../services/api';
import { CricketMatch } from '../types/cricket';
import { HeroStadium3D } from '../components/3d/HeroStadium3D';
import { MatchCard } from '../components/match/MatchCard';
import { MatchCardSkeleton } from '../components/match/MatchCardSkeleton';
import { EmptyMatchesState } from '../components/match/EmptyMatchesState';
import { useFavorites } from '../hooks/useFavorites';

export const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'upcoming' | 'completed' | 'favorites'>('all');
  const matchesSectionRef = useRef<HTMLDivElement>(null);
  const { isMatchFavorite } = useFavorites();

  // Fetch all matches with react-query
  const {
    data: matchesResponse,
    isLoading,
    isRefetching,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['matches', 'all'],
    queryFn: () => cricketApi.getAllMatches(),
    refetchInterval: 60000, // 60s live poll interval
  });

  const matches: CricketMatch[] = matchesResponse?.data || [];
  const liveMatches = matches.filter(m => m.isLive);
  const upcomingMatches = matches.filter(m => m.isUpcoming);
  const completedMatches = matches.filter(m => m.isCompleted);
  const favoriteMatches = matches.filter(m => isMatchFavorite(m.id));

  const displayedMatches = matches.filter(m => {
    if (activeFilter === 'live') return m.isLive;
    if (activeFilter === 'upcoming') return m.isUpcoming;
    if (activeFilter === 'completed') return m.isCompleted;
    if (activeFilter === 'favorites') return isMatchFavorite(m.id);
    return true;
  });

  const handleExploreLiveClick = () => {
    setActiveFilter('live');
    matchesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const lastUpdatedTime = dataUpdatedAt
    ? new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date(dataUpdatedAt))
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* 3D Cinematic Hero */}
      <HeroStadium3D
        liveCount={liveMatches.length}
        totalMatchesCount={matches.length}
        isLiveLoading={isLoading}
        onExploreLiveClick={handleExploreLiveClick}
      />

      {/* Main Match Arena Section */}
      <section ref={matchesSectionRef} id="matches-arena" className="py-12 sm:py-16 container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Arena Header & Dynamic Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-brand-border/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald" />
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                MATCH CENTRE
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-brand-muted mt-1">
              Live scorecards, schedule tracking, and genuine match results
            </p>
          </div>

          {/* Filter Pills & Manual Refresh */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'all', label: 'All Matches', count: matches.length, isLive: false },
                { id: 'live', label: 'Live Now', count: liveMatches.length, isLive: true },
                { id: 'upcoming', label: 'Upcoming', count: upcomingMatches.length, isLive: false },
                { id: 'completed', label: 'Completed', count: completedMatches.length, isLive: false },
                { id: 'favorites', label: 'Starred', count: favoriteMatches.length, isLive: false, isFav: true },
              ] as const
            ).map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  activeFilter === f.id
                    ? 'bg-brand-emerald text-brand-bg font-bold shadow-emerald-glow'
                    : 'bg-brand-surface/80 text-brand-muted hover:text-white hover:bg-brand-surface border border-brand-border'
                }`}
              >
                {f.isLive && f.count > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-bg animate-ping" />
                )}
                {'isFav' in f && f.isFav && (
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                )}
                <span>{f.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activeFilter === f.id
                      ? 'bg-brand-bg/20 text-brand-bg'
                      : 'bg-brand-charcoal text-brand-muted'
                  }`}
                >
                  {f.count}
                </span>
              </button>
            ))}

            {/* Manual Refresh Button */}
            <button
              onClick={() => refetch()}
              disabled={isRefetching}
              className="p-2 rounded-xl bg-brand-surface hover:bg-brand-charcoal border border-brand-border text-brand-muted hover:text-white transition-colors disabled:opacity-50"
              title="Refresh match scores"
              aria-label="Refresh match scores"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin text-brand-emerald' : ''}`} />
            </button>
          </div>
        </div>

        {/* Live Data Freshness Timestamp */}
        <div className="flex items-center justify-between text-[11px] font-mono text-brand-subtle py-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-emerald/70" />
            <span>
              STATUS: {matchesResponse?.info?.freshness === 'demo' ? 'REFERENCE DEMO FEED' : 'LIVE API SYNC'}
            </span>
          </div>

          {lastUpdatedTime && (
            <div>LAST UPDATED: {lastUpdatedTime} IST</div>
          )}
        </div>

        {/* Matches Grid */}
        <div className="mt-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <MatchCardSkeleton key={i} />
              ))}
            </div>
          ) : displayedMatches.length === 0 ? (
            <EmptyMatchesState
              category={activeFilter}
              onRefresh={() => refetch()}
              onViewAll={() => setActiveFilter('all')}
            />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayedMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Tournaments & Quick Hub */}
      <section className="py-12 bg-brand-navy/60 border-t border-brand-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Featured Tournaments & Series
              </h3>
              <p className="text-xs text-brand-muted mt-1">
                Explore comprehensive schedules and tournament brackets
              </p>
            </div>
            <Link
              to="/series"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-emerald hover:underline"
            >
              <span>View All Series</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Indian Premier League',
                format: 'T20',
                meta: '10 Franchises • 74 Matches',
                tag: 'LEAGUE',
              },
              {
                title: 'Border-Gavaskar Trophy',
                format: 'T20 / Test',
                meta: 'India vs Australia',
                tag: 'BILATERAL',
              },
              {
                title: 'ICC World Test Championship',
                format: 'TEST',
                meta: 'Global Standings',
                tag: 'ICC EVENT',
              },
              {
                title: 'Men\'s Asia Cup',
                format: 'T20 / ODI',
                meta: '6 Nations Tournament',
                tag: 'CONTINENTAL',
              },
            ].map(item => (
              <Link
                key={item.title}
                to="/series"
                className="group p-5 rounded-2xl glass-card border border-brand-border/60 hover:border-brand-emerald/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-brand-muted mb-2">
                  <span className="text-brand-emerald font-bold">{item.format}</span>
                  <span className="px-2 py-0.5 rounded bg-brand-surface border border-brand-border">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-brand-emerald transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-brand-muted mt-1">{item.meta}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why ANKIX SPORTS Feature Grid */}
      <section className="py-14 container mx-auto px-4 sm:px-6 lg:px-8 border-t border-brand-border/40">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h3 className="text-2xl font-display font-extrabold text-white">
            ENGINEERED FOR THE MODERN FAN
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            No simulated data. No fake score changes. Pure genuine sports intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-card border border-brand-border/60">
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 border border-brand-emerald/30 flex items-center justify-center text-brand-emerald mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">3D Spatial Arena</h4>
            <p className="text-xs text-brand-muted mt-2 leading-relaxed">
              Interactive 3D perspective cards, real-time lighting shaders, and Three.js physics built with buttery 60fps performance.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-brand-border/60">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan mb-4">
              <Radio className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">60-Second Auto-Polling</h4>
            <p className="text-xs text-brand-muted mt-2 leading-relaxed">
              Live score synchronization with intelligent change detection, background pause, and cached quota protection.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-brand-border/60">
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 border border-brand-emerald/30 flex items-center justify-center text-brand-emerald mb-4">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Data Integrity First</h4>
            <p className="text-xs text-brand-muted mt-2 leading-relaxed">
              Missing scores never become fake zeros. Timestamps are formatted in Asia/Kolkata (IST), with clear provenance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
