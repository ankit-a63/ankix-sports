import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Trophy, ShieldCheck, Info } from 'lucide-react';
import { cricketApi } from '../services/api';
import { getTeamIdentity } from '../utils/cricketAssets';

export const PointsTablePage: React.FC = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['points-table'],
    queryFn: () => cricketApi.getStandings(),
  });

  const tournament = response?.data;
  const standings = tournament?.standings || [];

  return (
    <div className="min-h-screen py-10 container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-6 border-b border-brand-border/60">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-surface text-brand-emerald border border-brand-border">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-extrabold text-white">
              POINTS TABLE & STANDINGS
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
              {tournament?.tournamentName} ({tournament?.season}) • Official Standings
            </p>
          </div>
        </div>
      </div>

      {/* Note about standings data integrity */}
      <div className="my-6 p-4 rounded-xl bg-brand-surface/70 border border-brand-border/80 flex items-start gap-3 text-xs text-brand-muted">
        <Info className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Standings reflect official tournament table data supplied by the cricket scheduling system with played (P), won (W), lost (L), tied (T), no result (NR), net run rate (NRR), and points (PTS).
        </p>
      </div>

      {/* Standings Table */}
      <div className="rounded-2xl glass-card border border-brand-border/60 overflow-hidden shadow-card-elevated">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-brand-charcoal text-brand-muted uppercase font-mono text-[11px] border-b border-brand-border">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">Pos</th>
                <th className="py-3.5 px-4">Team</th>
                <th className="py-3.5 px-3 text-center">P</th>
                <th className="py-3.5 px-3 text-center">W</th>
                <th className="py-3.5 px-3 text-center">L</th>
                <th className="py-3.5 px-3 text-center">T</th>
                <th className="py-3.5 px-3 text-center">NR</th>
                <th className="py-3.5 px-4 text-center font-bold text-white">PTS</th>
                <th className="py-3.5 px-4 text-right font-mono">NRR</th>
                <th className="py-3.5 px-4 text-center hidden md:table-cell">Recent Form</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40 font-mono">
              {isLoading ? (
                [...Array(8)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={10} className="py-4 px-4 bg-brand-surface/30" />
                  </tr>
                ))
              ) : (
                standings.map((row: any, index: number) => {
                  const teamInfo = getTeamIdentity(row.team);
                  const isTop4 = index < 4;

                  return (
                    <tr
                      key={row.team}
                      className={`hover:bg-brand-surface/50 transition-colors ${
                        isTop4 ? 'bg-brand-emerald/[0.02]' : ''
                      }`}
                    >
                      {/* Pos with top 4 playoff qualifier indicator */}
                      <td className="py-3.5 px-4 text-center font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                            index === 0
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                              : isTop4
                              ? 'bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/40'
                              : 'text-brand-muted'
                          }`}
                        >
                          {row.pos}
                        </span>
                      </td>

                      {/* Team Name & Badge */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3 font-sans">
                          <div
                            className="w-7 h-7 rounded-full overflow-hidden bg-brand-surface border border-brand-border flex items-center justify-center p-0.5 flex-shrink-0"
                            dangerouslySetInnerHTML={{ __html: teamInfo.badgeSvg }}
                          />
                          <div>
                            <span className="font-semibold text-white">{row.team}</span>
                            <span className="text-xs text-brand-muted font-mono ml-2 uppercase">
                              {row.teamShort}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Stats */}
                      <td className="py-3.5 px-3 text-center text-brand-muted">{row.played}</td>
                      <td className="py-3.5 px-3 text-center text-brand-emerald font-semibold">{row.won}</td>
                      <td className="py-3.5 px-3 text-center text-brand-red/90">{row.lost}</td>
                      <td className="py-3.5 px-3 text-center text-brand-muted">{row.tied}</td>
                      <td className="py-3.5 px-3 text-center text-brand-muted">{row.noResult}</td>
                      <td className="py-3.5 px-4 text-center font-extrabold text-white text-base">
                        {row.points}
                      </td>
                      <td
                        className={`py-3.5 px-4 text-right font-semibold ${
                          row.netRunRate.startsWith('+') ? 'text-brand-emerald' : 'text-brand-muted'
                        }`}
                      >
                        {row.netRunRate}
                      </td>

                      {/* Form Guide */}
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        <div className="flex items-center justify-center gap-1.5 font-sans">
                          {row.form.map((res: any, idx: number) => (
                            <span
                              key={idx}
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                res === 'W'
                                  ? 'bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/40'
                                  : res === 'L'
                                  ? 'bg-red-950/60 text-red-300 border border-red-800/40'
                                  : 'bg-brand-surface text-brand-muted border border-brand-border'
                              }`}
                            >
                              {res}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
