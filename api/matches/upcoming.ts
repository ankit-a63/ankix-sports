import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchFromCricApi, transformCricScoreToMatch } from '../../src/server/cricApiProxy';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=300');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const cricScoreRes = await fetchFromCricApi('cricScore', {}, 60000);
  if (cricScoreRes.status === 'success' && Array.isArray(cricScoreRes.data)) {
    const upcoming = cricScoreRes.data
      .filter((m: any) => m.ms === 'fixture')
      .map(transformCricScoreToMatch);
    if (upcoming.length > 0) {
      return res.status(200).json({ ...cricScoreRes, data: upcoming });
    }
  }

  const result = await fetchFromCricApi('matches', {}, 120000);
  if (result.status === 'success' && Array.isArray(result.data)) {
    const upcoming = result.data.filter((m: any) => !m.matchStarted && !m.matchEnded);
    return res.status(200).json({ ...result, data: upcoming });
  }

  return res.status(200).json(result);
}
