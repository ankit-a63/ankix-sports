// ANKIX SPORTS - Typed Cricket Models

export type MatchFormat = 't20' | 'odi' | 'test' | string;

export type MatchStatusCategory = 'live' | 'upcoming' | 'completed' | 'abandoned';

export interface InningScore {
  r: number; // Runs
  w: number; // Wickets
  o: number; // Overs
  inning: string; // e.g. "India Inning 1"
}

export interface CricketMatch {
  id: string;
  name: string;
  matchType: MatchFormat;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: {
    name: string;
    shortname: string;
    img?: string;
  }[];
  score?: InningScore[];
  series_id?: string;
  seriesName?: string;
  fantasyEnabled?: boolean;
  hasSquad?: boolean;
  matchStarted?: boolean;
  matchEnded?: boolean;
  tossWinner?: string;
  tossChoice?: 'bat' | 'bowl' | string;
  matchWinner?: string;
  // Normalized helper fields
  category?: MatchStatusCategory;
  isLive?: boolean;
  isUpcoming?: boolean;
  isCompleted?: boolean;
}

export interface BatsmanScore {
  batsman: {
    id: string;
    name: string;
  };
  dismissal?: string;
  bowler?: {
    id: string;
    name: string;
  };
  'dismissal-text'?: string;
  r: number; // Runs
  b: number; // Balls
  '4s': number;
  '6s': number;
  sr: number; // Strike Rate
}

export interface BowlerScore {
  bowler: {
    id: string;
    name: string;
  };
  o: number; // Overs
  m: number; // Maidens
  r: number; // Runs conceded
  w: number; // Wickets
  nb: number; // No balls
  wd: number; // Wides
  eco: number; // Economy
}

export interface InningCatching {
  stumped: number;
  runout: number;
  catch: number;
  catcher: {
    id: string;
    name: string;
  };
}

export interface InningExtras {
  r: number;
  b: number;
  lb: number;
  w: number;
  nb: number;
  p: number;
}

export interface InningTotals {
  R: number;
  O: number;
  W: number;
  RR: number;
}

export interface ScorecardInning {
  inning: string;
  batting: BatsmanScore[];
  bowling: BowlerScore[];
  catching?: InningCatching[];
  extras?: InningExtras;
  totals?: InningTotals;
}

export interface MatchDetailData extends CricketMatch {
  scorecard?: ScorecardInning[];
  umpires?: string[];
  referee?: string;
}

export interface SeriesItem {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  odi: number;
  t20: number;
  test: number;
  squads?: number;
  matches?: number;
}

export interface SeriesDetail {
  info: SeriesItem;
  matchList: CricketMatch[];
}

export interface StandingsRow {
  pos: number;
  team: string;
  teamShort: string;
  teamLogo?: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  points: number;
  netRunRate: string;
  form: ('W' | 'L' | 'D' | 'NR')[];
}

export interface StandingsTournament {
  tournamentId: string;
  tournamentName: string;
  season: string;
  standings: StandingsRow[];
}

export interface ApiResponse<T> {
  status: 'success' | 'failure' | 'apiKeyMissing' | 'cached';
  data: T;
  info?: {
    hitsToday?: number;
    hitsLimit?: number;
    credits?: number;
    server?: number;
    offsetRows?: number;
    totalRows?: number;
    queryTime?: number;
    isDemoData?: boolean;
    cachedAt?: string;
    freshness?: 'live' | 'cached' | 'demo';
    error?: string;
  };
}
