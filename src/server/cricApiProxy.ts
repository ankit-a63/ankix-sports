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
  const apiKey = process.env.CRICKET_API_KEY;

  if (!apiKey) {
    return {
      status: 'apiKeyMissing',
      data: [],
      info: {
        error: 'CRICKET_API_KEY is not set in environment or .env file.',
        setupGuide: 'Sign up at https://cricketdata.org to get your free API key, then add CRICKET_API_KEY=your_key in your .env file.'
      }
    };
  }

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
