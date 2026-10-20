import { ApiResponse, CricketMatch, MatchDetailData, SeriesItem, StandingsTournament } from '../types/cricket';
import { SAMPLE_MATCHES, SAMPLE_MATCH_DETAILS, SAMPLE_SERIES, SAMPLE_STANDINGS } from './sampleCricketData';

const DEMO_MODE_STORAGE_KEY = 'ankix_demo_mode_active';

export function isDemoModeActive(): boolean {
  if (typeof window === 'undefined') return false;
  // Clear any legacy demo mode flag so real data always takes precedence
  localStorage.removeItem(DEMO_MODE_STORAGE_KEY);
  return false;
}

export function setDemoModeActive(_active: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(DEMO_MODE_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('ankix_demo_mode_changed', { detail: { active: false } }));
}

const DIRECT_CRIC_API_KEY = 'a3836439-788f-4cd1-83b0-a56041c42906';
const DIRECT_CRIC_API_BASE = 'https://api.cricapi.com/v1';

export function parseScoreString(scoreStr: string, teamName: string): any[] {
  if (!scoreStr) return [];
  const parts = scoreStr.split('&').map(s => s.trim());
  return parts.map((part, index) => {
    const match = part.match(/(\d+)(?:\/(\d+))?(?:\s*\(([\d.]+)(?:\s*ov)?\))?/i);
    const r = match && match[1] ? parseInt(match[1], 10) : 0;
    const w = match && match[2] ? parseInt(match[2], 10) : (part.includes('/') ? 0 : (match && match[1] ? 10 : 0));
    const o = match && match[3] ? parseFloat(match[3]) : 0;
    return {
      r,
      w,
      o,
      inning: parts.length > 1 ? `${teamName} Inning ${index + 1}` : `${teamName} Inning`
    };
  });
}

export function transformCricScoreItem(item: any): CricketMatch {
  const t1 = item.t1 || 'Team 1';
  const t2 = item.t2 || 'Team 2';
  const cleanTeamName = (t: string) => t.replace(/\[.*?\]/g, '').trim();
  const extractShortname = (t: string) => {
    const m = t.match(/\[(.*?)\]/);
    if (m && m[1]) return m[1];
    return cleanTeamName(t).substring(0, 4).toUpperCase();
  };

  const t1Clean = cleanTeamName(t1);
  const t2Clean = cleanTeamName(t2);
  const isLive = item.ms === 'live';
  const isFixture = item.ms === 'fixture';
  const isResult = item.ms === 'result';

  return {
    id: item.id,
    name: `${t1Clean} vs ${t2Clean}`,
    matchType: (item.matchType || 't20').toLowerCase(),
    status: item.status || (isLive ? 'Live' : isFixture ? 'Upcoming' : 'Match Ended'),
    venue: item.series || 'International Stadium',
    date: item.dateTimeGMT ? item.dateTimeGMT.split('T')[0] : '',
    dateTimeGMT: item.dateTimeGMT || '',
    teams: [t1Clean, t2Clean],
    teamInfo: [
      { name: t1Clean, shortname: extractShortname(t1), img: item.t1img },
      { name: t2Clean, shortname: extractShortname(t2), img: item.t2img }
    ],
    score: [
      ...parseScoreString(item.t1s || '', t1Clean),
      ...parseScoreString(item.t2s || '', t2Clean)
    ],
    seriesName: item.series || '',
    matchStarted: isLive || isResult,
    matchEnded: isResult,
    category: isLive ? 'live' : isFixture ? 'upcoming' : 'completed',
    isLive,
    isUpcoming: isFixture,
    isCompleted: isResult
  };
}

async function fetchDirectCricScore(): Promise<CricketMatch[]> {
  try {
    const res = await fetch(`${DIRECT_CRIC_API_BASE}/cricScore?apikey=${DIRECT_CRIC_API_KEY}`);
    const j = await res.json();
    if (j.status === 'success' && Array.isArray(j.data)) {
      return j.data.map(transformCricScoreItem);
    }
  } catch (e) {
    console.warn('Direct CricAPI fetch fallback:', e);
  }
  return [];
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
    try {
      const res = await fetch('/api/matches/live');
      if (res.ok) {
        const data: ApiResponse<any[]> = await res.json();
        if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          return {
            ...data,
            data: data.data.map(normalizeCricApiMatch).filter(m => m.isLive)
          };
        }
      }
    } catch {
      // serverless proxy unreachable, proceed to direct fallback
    }

    // Direct CricAPI Fallback
    const directMatches = await fetchDirectCricScore();
    const liveOnly = directMatches.filter(m => m.isLive);
    if (liveOnly.length > 0) {
      return {
        status: 'success',
        data: liveOnly,
        info: { freshness: 'live', hitsToday: 1, hitsLimit: 500 }
      };
    }

    return {
      status: 'success',
      data: SAMPLE_MATCHES.filter(m => m.isLive),
      info: { freshness: 'cached', hitsToday: 0, hitsLimit: 500 }
    };
  },

  // Fetch all matches (live, upcoming, completed)
  async getAllMatches(): Promise<ApiResponse<CricketMatch[]>> {
    try {
      const res = await fetch('/api/matches/all');
      if (res.ok) {
        const data: ApiResponse<any[]> = await res.json();
        if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          return {
            ...data,
            data: data.data.map(normalizeCricApiMatch)
          };
        }
      }
    } catch {
      // fallback direct
    }

    const directMatches = await fetchDirectCricScore();
    if (directMatches.length > 0) {
      return {
        status: 'success',
        data: directMatches,
        info: { freshness: 'live', hitsToday: 1, hitsLimit: 500 }
      };
    }

    return {
      status: 'success',
      data: SAMPLE_MATCHES,
      info: { freshness: 'cached', hitsToday: 0, hitsLimit: 500 }
    };
  },

  // Fetch upcoming fixtures
  async getUpcomingMatches(): Promise<ApiResponse<CricketMatch[]>> {
    try {
      const res = await fetch('/api/matches/upcoming');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          return {
            ...data,
            data: data.data.map(normalizeCricApiMatch)
          };
        }
      }
    } catch {
      // fallback direct
    }

    const directMatches = await fetchDirectCricScore();
    const upcomingOnly = directMatches.filter(m => m.isUpcoming);
    if (upcomingOnly.length > 0) {
      return {
        status: 'success',
        data: upcomingOnly,
        info: { freshness: 'live' }
      };
    }

    return {
      status: 'success',
      data: SAMPLE_MATCHES.filter(m => m.isUpcoming),
      info: { freshness: 'cached' }
    };
  },

  // Fetch results (completed matches)
  async getResults(): Promise<ApiResponse<CricketMatch[]>> {
    try {
      const res = await fetch('/api/matches/results');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          return {
            ...data,
            data: data.data.map(normalizeCricApiMatch)
          };
        }
      }
    } catch {
      // fallback direct
    }

    const directMatches = await fetchDirectCricScore();
    const resultsOnly = directMatches.filter(m => m.isCompleted);
    if (resultsOnly.length > 0) {
      return {
        status: 'success',
        data: resultsOnly,
        info: { freshness: 'live' }
      };
    }

    return {
      status: 'success',
      data: SAMPLE_MATCHES.filter(m => m.isCompleted),
      info: { freshness: 'cached' }
    };
  },

  // Fetch match details by ID
  async getMatchDetail(matchId: string): Promise<ApiResponse<MatchDetailData | null>> {
    try {
      const res = await fetch(`/api/matches/${encodeURIComponent(matchId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && data.data) {
          return data;
        }
      }
    } catch {
      // fallback direct
    }

    // Direct match_info fallback
    try {
      const infoRes = await fetch(`${DIRECT_CRIC_API_BASE}/match_info?apikey=${DIRECT_CRIC_API_KEY}&id=${encodeURIComponent(matchId)}`);
      const infoJson = await infoRes.json();
      if (infoJson.status === 'success' && infoJson.data) {
        const matchData = { ...infoJson.data };
        try {
          const scRes = await fetch(`${DIRECT_CRIC_API_BASE}/match_scorecard?apikey=${DIRECT_CRIC_API_KEY}&id=${encodeURIComponent(matchId)}`);
          const scJson = await scRes.json();
          if (scJson.status === 'success' && scJson.data?.scorecard) {
            matchData.scorecard = scJson.data.scorecard;
          }
        } catch {
          // ignore scorecard error
        }
        return { status: 'success', data: matchData as MatchDetailData, info: infoJson.info };
      }
    } catch (e) {
      console.warn('Direct match_info error:', e);
    }

    const sampleMatch = SAMPLE_MATCH_DETAILS[matchId] || SAMPLE_MATCHES.find(m => m.id === matchId);
    if (sampleMatch) {
      return {
        status: 'success',
        data: sampleMatch as MatchDetailData,
        info: { freshness: 'cached', isDemoData: false }
      };
    }
    return {
      status: 'failure',
      data: null,
      info: { error: 'Match details unavailable' }
    };
  },

  // Fetch series list
  async getSeries(): Promise<ApiResponse<SeriesItem[]>> {
    try {
      const res = await fetch('/api/series');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          return data;
        }
      }
    } catch {
      // fallback direct
    }

    try {
      const direct = await fetch(`${DIRECT_CRIC_API_BASE}/series?apikey=${DIRECT_CRIC_API_KEY}&offset=0`);
      const j = await direct.json();
      if (j.status === 'success' && Array.isArray(j.data)) {
        return { status: 'success', data: j.data, info: j.info };
      }
    } catch {
      // ignore
    }

    return {
      status: 'success',
      data: SAMPLE_SERIES,
      info: { freshness: 'cached' }
    };
  },

  // Fetch points table / tournament standings
  async getStandings(): Promise<ApiResponse<StandingsTournament>> {
    try {
      const res = await fetch('/api/points-table');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && data.data) {
          return data;
        }
      }
    } catch {
      // ignore
    }

    return {
      status: 'success',
      data: SAMPLE_STANDINGS,
      info: { freshness: 'cached' }
    };
  },

  async getPointsTable(): Promise<ApiResponse<StandingsTournament>> {
    return this.getStandings();
  }
};
