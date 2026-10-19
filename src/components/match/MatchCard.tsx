import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radio, Calendar, Trophy, MapPin, ChevronRight, Clock, Star } from 'lucide-react';
import { CricketMatch, InningScore } from '../../types/cricket';
import { getTeamIdentity, formatToIST, getCountdown } from '../../utils/cricketAssets';
import { useFavorites } from '../../hooks/useFavorites';

interface MatchCardProps {
  match: CricketMatch;
  priority?: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scoreChanged, setScoreChanged] = useState(false);
  const { isMatchFavorite, toggleFavoriteMatch } = useFavorites();
  const isFav = isMatchFavorite(match.id);

  // Monitor score updates to trigger brief pulse highlight
  const prevScoreString = useRef<string>('');
  useEffect(() => {
    const currentScoreString = JSON.stringify(match.score || []);
    if (prevScoreString.current && prevScoreString.current !== currentScoreString) {
      setScoreChanged(true);
      const timer = setTimeout(() => setScoreChanged(false), 2000);
      return () => clearTimeout(timer);
    }
    prevScoreString.current = currentScoreString;
  }, [match.score]);

  // Pointer-based 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -6; // max 6 deg tilt
    const rY = ((x - centerX) / centerX) * 6;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const team1Name = match.teams?.[0] || 'Team 1';
  const team2Name = match.teams?.[1] || 'Team 2';
  const team1 = getTeamIdentity(team1Name);
  const team2 = getTeamIdentity(team2Name);

  // Extract CricAPI official team logos if available
  const team1Info = match.teamInfo?.find(t => t.name.toLowerCase() === team1Name.toLowerCase()) || match.teamInfo?.[0];
  const team2Info = match.teamInfo?.find(t => t.name.toLowerCase() === team2Name.toLowerCase()) || match.teamInfo?.[1];

  // Find inning scores for team1 and team2
  const findInningScore = (tName: string): InningScore | undefined => {
    if (!match.score || match.score.length === 0) return undefined;
    return match.score.find(s => s.inning.toLowerCase().includes(tName.toLowerCase()));
  };

  const team1Score = findInningScore(team1Name) || match.score?.[0];
  const team2Score = findInningScore(team2Name) || (match.score && match.score.length > 1 ? match.score[1] : undefined);

  const countdown = match.isUpcoming ? getCountdown(match.dateTimeGMT) : null;

  // Format badge styling
  const formatBadgeColor = (type: string) => {
    const t = type.toLowerCase();
    if (t === 't20') return 'bg-purple-950/80 text-purple-300 border-purple-800/60';
    if (t === 'odi') return 'bg-blue-950/80 text-blue-300 border-blue-800/60';
    if (t === 'test') return 'bg-amber-950/80 text-amber-300 border-amber-800/60';
    return 'bg-brand-surface text-brand-muted border-brand-border';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="perspective-[1000px] h-full"
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative h-full flex flex-col justify-between rounded-2xl glass-card p-5 sm:p-6 transition-colors duration-300 ${
          isHovered
            ? 'border-brand-emerald/40 shadow-emerald-glow'
            : match.isLive
            ? 'border-brand-emerald/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'border-brand-border/60 shadow-card-elevated'
        }`}
      >
        {/* Subtle Stadium Pitch Grid Overlay */}
        <div className="absolute inset-0 bg-stadium-grid opacity-15 rounded-2xl pointer-events-none" />

        {/* Live Score Flash Alert Overlay */}
        {scoreChanged && (
          <div className="absolute inset-0 rounded-2xl bg-brand-emerald/10 border-2 border-brand-emerald animate-pulse pointer-events-none z-20" />
        )}

        {/* Top Header: Tournament, Format, Live Status & Favorite */}
        <div className="relative z-10 flex items-center justify-between gap-2 border-b border-brand-border/50 pb-3.5 mb-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span
              className={`text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${formatBadgeColor(
                match.matchType
              )}`}
            >
              {match.matchType.toUpperCase()}
            </span>

            <span className="text-xs font-medium text-brand-muted truncate max-w-[170px] sm:max-w-[200px]" title={match.name}>
              {match.seriesName || match.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {match.isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/40 text-[11px] font-mono font-bold tracking-wider">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                LIVE
              </span>
            ) : match.isCompleted ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-charcoal text-brand-muted border border-brand-border text-[11px] font-mono">
                FINAL
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-surface text-brand-cyan border border-brand-cyan/30 text-[11px] font-mono">
                <Clock className="w-3 h-3" />
                {countdown || 'UPCOMING'}
              </span>
            )}

            {/* Favorite Star Button */}
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavoriteMatch(match.id);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                isFav
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-brand-subtle hover:text-white hover:bg-brand-surface'
              }`}
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              aria-label="Toggle Favorite"
            >
              <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Team Matchup & Oversized Scores */}
        <div className="relative z-10 space-y-4 my-auto">
          {/* Team 1 */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {team1Info?.img ? (
                <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center p-0.5 border border-brand-border bg-brand-surface overflow-hidden shadow-sm">
                  <img
                    src={team1Info.img}
                    alt={team1.name}
                    className="w-full h-full object-contain"
                    onError={e => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center p-0.5 border border-brand-border bg-brand-surface overflow-hidden shadow-sm"
                  dangerouslySetInnerHTML={{ __html: team1.badgeSvg }}
                />
              )}
              <div className="min-w-0">
                <div className="text-base font-semibold text-white truncate leading-snug">
                  {team1.name}
                </div>
                <div className="text-[11px] font-mono text-brand-muted uppercase">
                  {team1.code}
                </div>
              </div>
            </div>

            {/* Score 1 */}
            <div className="text-right flex-shrink-0 font-mono">
              {team1Score ? (
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">
                    {team1Score.r}
                    <span className="text-brand-muted text-base font-normal">/{team1Score.w}</span>
                  </div>
                  <div className="text-[11px] text-brand-muted">
                    {team1Score.o} ov
                  </div>
                </div>
              ) : (
                <span className="text-xs font-mono text-brand-subtle">Yet to bat</span>
              )}
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {team2Info?.img ? (
                <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center p-0.5 border border-brand-border bg-brand-surface overflow-hidden shadow-sm">
                  <img
                    src={team2Info.img}
                    alt={team2.name}
                    className="w-full h-full object-contain"
                    onError={e => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center p-0.5 border border-brand-border bg-brand-surface overflow-hidden shadow-sm"
                  dangerouslySetInnerHTML={{ __html: team2.badgeSvg }}
                />
              )}
              <div className="min-w-0">
                <div className="text-base font-semibold text-white truncate leading-snug">
                  {team2.name}
                </div>
                <div className="text-[11px] font-mono text-brand-muted uppercase">
                  {team2.code}
                </div>
              </div>
            </div>

            {/* Score 2 */}
            <div className="text-right flex-shrink-0 font-mono">
              {team2Score ? (
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">
                    {team2Score.r}
                    <span className="text-brand-muted text-base font-normal">/{team2Score.w}</span>
                  </div>
                  <div className="text-[11px] text-brand-muted">
                    {team2Score.o} ov
                  </div>
                </div>
              ) : (
                <span className="text-xs font-mono text-brand-subtle">
                  {match.isUpcoming ? 'Scheduled' : 'Yet to bat'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Situation / Status Banner */}
        <div className="relative z-10 mt-5 pt-3 border-t border-brand-border/40">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-brand-emerald truncate">
                {match.status}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-brand-muted truncate mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-brand-subtle flex-shrink-0" />
                <span className="truncate">{match.venue || 'Venue TBD'}</span>
              </div>
            </div>

            <Link
              to={`/match/${match.id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-brand-emerald transition-colors px-2.5 py-1.5 rounded-lg bg-brand-surface/90 hover:bg-brand-surface border border-brand-border flex-shrink-0"
              aria-label={`View match centre for ${match.name}`}
            >
              <span>Centre</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
