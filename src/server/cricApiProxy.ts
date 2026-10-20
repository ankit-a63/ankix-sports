// ANKIX SPORTS - Server-side Cricket Data Proxy Handler
// Compatible with both Vercel Serverless Functions and Vite Dev Middleware

interface CacheEntry {
  data: any;
  timestamp: number;
  ttlMs: number;
}

const memoryCache = new Map<string, CacheEntry>();

function getCached(key: string): any | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > entry.ttlMs) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key: string, data: any, ttlMs: number): void {
  memoryCache.set(key, {
    data,
    timestamp: Date.now(),
    ttlMs
  });
}

const CRIC_API_BASE = 'https://api.cricapi.com/v1';

export async function fetchFromCricApi(endpoint: string, params: Record<string, string> = {}, cacheTtlMs: number = 60000): Promise<{ status: string; data: any; info?: any }> {
  const apiKey = process.env.CRICKET_API_KEY || 'a3836439-788f-4cd1-83b0-a56041c42906';

  const query = new URLSearchParams({
    apikey: apiKey,
    offset: '0',
    ...params
  });

  const cacheKey = `${endpoint}?${query.toString().replace(apiKey, 'REDACTED')}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return {
      ...cached,
      info: {
        ...cached.info,
        freshness: 'cached',
        cachedAt: new Date().toISOString()
      }
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const url = `${CRIC_API_BASE}/${endpoint}?${query.toString()}`;
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`CricAPI responded with HTTP status ${response.status}`);
    }

    const json: any = await response.json();

    if (json.status === 'failure') {
      return {
        status: 'failure',
        data: [],
        info: {
          error: json.reason || 'CricAPI error',
          hitsToday: json.info?.hitsToday,
          hitsLimit: json.info?.hitsLimit
        }
      };
    }

    const result = {
      status: 'success',
      data: json.data || [],
      info: {
        ...json.info,
        freshness: 'live',
        fetchedAt: new Date().toISOString()
      }
    };

    setCache(cacheKey, result, cacheTtlMs);
    return result;
  } catch (err: any) {
    clearTimeout(timeoutId);
    return {
      status: 'failure',
      data: [],
      info: {
        error: err.name === 'AbortError' ? 'API request timed out' : err.message || 'Network error'
      }
    };
  }
}

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

export function transformCricScoreToMatch(item: any): any {
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

