import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchFromCricApi, transformCricScoreToMatch } from '../../src/server/cricApiProxy';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const cricScoreRes = await fetchFromCricApi('cricScore', {}, 30000);
  if (cricScoreRes.status === 'success' && Array.isArray(cricScoreRes.data)) {
    const liveOnly = cricScoreRes.data
      .filter((m: any) => m.ms === 'live')
      .map(transformCricScoreToMatch);
    return res.status(200).json({ ...cricScoreRes, data: liveOnly });
  }

  // Fallback to currentMatches filtering out completed
  const currentResult = await fetchFromCricApi('currentMatches', {}, 60000);
  if (currentResult.status === 'success' && Array.isArray(currentResult.data)) {
    const liveOnly = currentResult.data.filter((m: any) => m.matchStarted && !m.matchEnded && !/won by|drawn|tied|no result/i.test(m.status || ''));
    return res.status(200).json({ ...currentResult, data: liveOnly });
  }

  return res.status(200).json(currentResult);
}
