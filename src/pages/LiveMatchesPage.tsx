import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Radio, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cricketApi } from '../services/api';
import { MatchCard } from '../components/match/MatchCard';
import { MatchCardSkeleton } from '../components/match/MatchCardSkeleton';
import { EmptyMatchesState } from '../components/match/EmptyMatchesState';

export const LiveMatchesPage: React.FC = () => {
  const {
    data: response,
    isLoading,
    isRefetching,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['matches', 'live'],
    queryFn: () => cricketApi.getLiveMatches(),
    refetchInterval: 60000,
  });

  const liveMatches = response?.data || [];

  const lastUpdated = dataUpdatedAt
    ? new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date(dataUpdatedAt))
    : null;

  return (
    <div className="min-h-screen py-10 container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border/60">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-emerald"></span>
            </span>
            <h1 className="text-3xl font-display font-extrabold text-white">
              LIVE CRICKET ARENA
            </h1>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Real-time ball-by-ball updates and scores for ongoing matches
          </p>
        </div>

        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs font-mono text-brand-muted">
              SYNCED: {lastUpdated} IST
            </span>
          )}

          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-surface hover:bg-brand-charcoal text-white border border-brand-border transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin text-brand-emerald' : ''}`} />
            <span>Refresh Feed</span>
          </button>
        </div>
      </div>

      {/* Live Content */}
      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <MatchCardSkeleton key={i} />
            ))}
          </div>
        ) : liveMatches.length === 0 ? (
          <div className="py-12">
            <EmptyMatchesState
              category="live"
              onRefresh={() => refetch()}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
