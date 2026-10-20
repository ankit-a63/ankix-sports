import { ApiResponse, CricketMatch, MatchDetailData, SeriesItem, StandingsTournament } from '../types/cricket';
import { SAMPLE_MATCHES, SAMPLE_MATCH_DETAILS, SAMPLE_SERIES, SAMPLE_STANDINGS } from './sampleCricketData';

const DEMO_MODE_STORAGE_KEY = 'ankix_demo_mode_active';

export function isDemoModeActive(): boolean {
  if (typeof window === 'undefined') return false;
  // If legacy 'true' was stored from initial preview, remove it so live API takes over
  const stored = localStorage.getItem(DEMO_MODE_STORAGE_KEY);
  if (stored === 'true') {
    localStorage.removeItem(DEMO_MODE_STORAGE_KEY);
    return false;
  }
  return stored === 'force_demo';
}

export function setDemoModeActive(active: boolean): void {
  if (typeof window === 'undefined') return;
  if (active) {
    localStorage.setItem(DEMO_MODE_STORAGE_KEY, 'force_demo');
  } else {
    localStorage.removeItem(DEMO_MODE_STORAGE_KEY);
  }
  window.dispatchEvent(new CustomEvent('ankix_demo_mode_changed', { detail: { active } }));
}

// Normalize a match from CricAPI format
export function normalizeCricApiMatch(raw: any): CricketMatch {
  const isMatchEnded = Boolean(raw.matchEnded || (raw.status && /won by|drawn|tied|no result|abandoned/i.test(raw.status)));
  const isMatchStarted = Boolean(raw.matchStarted || (raw.score && raw.score.length > 0));
  const isLive = isMatchStarted && !isMatchEnded;
  const isUpcoming = !isMatchStarted && !isMatchEnded;
  const isCompleted = isMatchEnded;

  let category: 'live' | 'upcoming' | 'completed' = 'upcoming';
  if (isLive) category = 'live';
  else if (isCompleted) category = 'completed';

  return {
    id: raw.id || String(Math.random()),
    name: raw.name || (raw.teams ? raw.teams.join(' vs ') : 'Match'),
    matchType: (raw.matchType || 't20').toLowerCase(),
    status: raw.status || (isUpcoming ? 'Scheduled' : 'In Progress'),
    venue: raw.venue || 'Venue TBD',
    date: raw.date || '',
    dateTimeGMT: raw.dateTimeGMT || '',
    teams: Array.isArray(raw.teams) ? raw.teams : ['Team 1', 'Team 2'],
    teamInfo: raw.teamInfo,
    score: Array.isArray(raw.score) ? raw.score : [],
    series_id: raw.series_id,
    seriesName: raw.seriesName || (raw.series_id ? 'Tournament Match' : undefined),
    fantasyEnabled: raw.fantasyEnabled,
    hasSquad: raw.hasSquad,
    matchStarted: isMatchStarted,
    matchEnded: isMatchEnded,
    tossWinner: raw.tossWinner,
    tossChoice: raw.tossChoice,
    matchWinner: raw.matchWinner,
    category,
    isLive,
    isUpcoming,
    isCompleted,
  };
}

export const cricketApi = {
  // Fetch live matches
  async getLiveMatches(): Promise<ApiResponse<CricketMatch[]>> {
    if (isDemoModeActive()) {
      return {
        status: 'success',
        data: SAMPLE_MATCHES.filter(m => m.isLive),
        info: {
          freshness: 'demo',
          isDemoData: true,
          cachedAt: new Date().toISOString(),
          hitsToday: 0,
          hitsLimit: 500
        }
      };
    }

    try {
      const res = await fetch('/api/matches/live');
      if (!res.ok) {
        throw new Error(`API returned HTTP ${res.status}`);
      }
      const data: ApiResponse<any[]> = await res.json();
      if (data.status === 'apiKeyMissing') {
        return {
          status: 'apiKeyMissing',
          data: [],
          info: { error: 'CRICKET_API_KEY is not configured on server', freshness: 'live' }
        };
      }
      return {
        ...data,
        data: (data.data || []).map(normalizeCricApiMatch).filter(m => m.isLive)
      };
    } catch (err: any) {
      return {
        status: 'failure',
        data: [],
        info: { error: err.message || 'Failed to fetch live matches' }
      };
    }
  },

  // Fetch all matches (live, upcoming, completed)
  async getAllMatches(): Promise<ApiResponse<CricketMatch[]>> {
    if (isDemoModeActive()) {
      return {
        status: 'success',
        data: SAMPLE_MATCHES,
        info: {
          freshness: 'demo',
          isDemoData: true,
          cachedAt: new Date().toISOString(),
          hitsToday: 0,
          hitsLimit: 500
        }
      };
    }

    try {
      const res = await fetch('/api/matches/all');
      if (!res.ok) {
        throw new Error(`API returned HTTP ${res.status}`);
      }
      const data: ApiResponse<any[]> = await res.json();
      if (data.status === 'apiKeyMissing') {
        return {
          status: 'apiKeyMissing',
          data: [],
          info: { error: 'CRICKET_API_KEY is not configured on server' }
        };
      }
      return {
        ...data,
        data: (data.data || []).map(normalizeCricApiMatch)
      };
    } catch (err: any) {
      return {
        status: 'failure',
        data: [],
        info: { error: err.message || 'Failed to fetch matches' }
      };
    }
  },

  // Fetch upcoming fixtures
  async getUpcomingMatches(): Promise<ApiResponse<CricketMatch[]>> {
    if (isDemoModeActive()) {
      return {
        status: 'success',
        data: SAMPLE_MATCHES.filter(m => m.isUpcoming),
        info: {
          freshness: 'demo',
          isDemoData: true,
          cachedAt: new Date().toISOString(),
          hitsToday: 0,
          hitsLimit: 500
        }
      };
    }

    try {
      const res = await fetch('/api/matches/upcoming');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status === 'apiKeyMissing') {
        return { status: 'apiKeyMissing', data: [] };
      }
      return {
        ...data,
        data: (data.data || []).map(normalizeCricApiMatch)
      };
    } catch (err: any) {
      return { status: 'failure', data: [], info: { error: err.message } };
    }
  },

  // Fetch results (completed matches)
  async getResults(): Promise<ApiResponse<CricketMatch[]>> {
    if (isDemoModeActive()) {
      return {
        status: 'success',
        data: SAMPLE_MATCHES.filter(m => m.isCompleted),
        info: {
          freshness: 'demo',
          isDemoData: true,
          cachedAt: new Date().toISOString(),
          hitsToday: 0,
          hitsLimit: 500
        }
      };
    }

    try {
      const res = await fetch('/api/matches/results');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status === 'apiKeyMissing') {
        return { status: 'apiKeyMissing', data: [] };
      }
      return {
        ...data,
        data: (data.data || []).map(normalizeCricApiMatch)
      };
    } catch (err: any) {
      return { status: 'failure', data: [], info: { error: err.message } };
    }
  },

  // Fetch match details by ID
  async getMatchDetail(matchId: string): Promise<ApiResponse<MatchDetailData | null>> {
    if (isDemoModeActive()) {
      const match = SAMPLE_MATCH_DETAILS[matchId] || SAMPLE_MATCHES.find(m => m.id === matchId);
      if (match) {
        return {
          status: 'success',
          data: match as MatchDetailData,
          info: { freshness: 'demo', isDemoData: true, cachedAt: new Date().toISOString() }
        };
      }
      return {
        status: 'failure',
        data: null,
        info: { error: 'Match not found in reference data' }
      };
    }

    try {
      const res = await fetch(`/api/matches/${encodeURIComponent(matchId)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status === 'apiKeyMissing') {
        return { status: 'apiKeyMissing', data: null };
      }
      return data;
    } catch (err: any) {
      return { status: 'failure', data: null, info: { error: err.message } };
    }
  },

  // Fetch series list
  async getSeries(): Promise<ApiResponse<SeriesItem[]>> {
    if (isDemoModeActive()) {
      return {
        status: 'success',
        data: SAMPLE_SERIES,
        info: { freshness: 'demo', isDemoData: true, cachedAt: new Date().toISOString() }
      };
    }

    try {
      const res = await fetch('/api/series');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status === 'apiKeyMissing') {
        return { status: 'apiKeyMissing', data: [] };
      }
      return data;
    } catch (err: any) {
      return { status: 'failure', data: [], info: { error: err.message } };
    }
  },

  // Fetch standings
  async getStandings(): Promise<ApiResponse<StandingsTournament>> {
    if (isDemoModeActive()) {
      return {
        status: 'success',
        data: SAMPLE_STANDINGS,
        info: { freshness: 'demo', isDemoData: true, cachedAt: new Date().toISOString() }
      };
    }

    try {
      const res = await fetch('/api/points-table');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status === 'apiKeyMissing') {
        return { status: 'apiKeyMissing', data: SAMPLE_STANDINGS };
      }
      return data;
    } catch (err: any) {
      return { status: 'failure', data: SAMPLE_STANDINGS, info: { error: err.message } };
    }
  }
};
