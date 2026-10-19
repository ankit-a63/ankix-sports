import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Trophy, Calendar, Layers, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cricketApi } from '../services/api';
import { SeriesItem } from '../types/cricket';

export const SeriesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: response, isLoading } = useQuery({
    queryKey: ['series', 'list'],
    queryFn: () => cricketApi.getSeries(),
  });

  const seriesList: SeriesItem[] = response?.data || [];

  const filteredSeries = searchQuery.trim()
    ? seriesList.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : seriesList;

  return (
    <div className="min-h-screen py-10 container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border/60">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-surface text-brand-emerald border border-brand-border">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-extrabold text-white">
                SERIES & TOURNAMENTS
              </h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                International tours, bilateral trophies, and premier franchise leagues
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search series or tours..."
            className="w-full bg-brand-surface border border-brand-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-emerald"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-44 rounded-2xl glass-card animate-pulse border border-brand-border/60" />
            ))}
          </div>
        ) : filteredSeries.length === 0 ? (
          <div className="text-center py-16 text-brand-muted">
            No series matching &quot;{searchQuery}&quot; found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSeries.map(series => (
              <div
                key={series.id}
                className="rounded-2xl glass-card p-6 border border-brand-border/60 hover:border-brand-emerald/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-brand-muted mb-3">
                    <span className="text-brand-cyan">
                      {series.startDate} – {series.endDate}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-brand-surface border border-brand-border text-white">
                      {(series.matches ?? (series.t20 + series.odi + series.test))} MATCHES
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white hover:text-brand-emerald transition-colors leading-snug">
                    {series.name}
                  </h3>

                  {/* Format Pills */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-mono">
                    {series.t20 > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800/50">
                        {series.t20} T20
                      </span>
                    )}
                    {series.odi > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-blue-950/60 text-blue-300 border border-blue-800/50">
                        {series.odi} ODI
                      </span>
                    )}
                    {series.test > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-800/50">
                        {series.test} TEST
                      </span>
                    )}
                    {series.squads ? (
                      <span className="px-2.5 py-1 rounded-lg bg-brand-surface text-brand-muted border border-brand-border">
                        {series.squads} SQUADS
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/40 flex items-center justify-between">
                  <span className="text-xs text-brand-muted font-mono">Official Tour</span>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-emerald hover:underline"
                  >
                    <span>View Matches</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
