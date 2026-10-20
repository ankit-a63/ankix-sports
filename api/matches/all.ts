import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchFromCricApi, transformCricScoreToMatch } from '../../src/server/cricApiProxy';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Fetch cricScore first: contains live matches, fixtures, and results
  const cricScoreRes = await fetchFromCricApi('cricScore', {}, 45000);
  if (cricScoreRes.status === 'success' && Array.isArray(cricScoreRes.data)) {
    const transformed = cricScoreRes.data.map(transformCricScoreToMatch);
    return res.status(200).json({ ...cricScoreRes, data: transformed });
  }

  // Fallback to currentMatches
  const result = await fetchFromCricApi('currentMatches', {}, 60000);
  return res.status(200).json(result);
}
