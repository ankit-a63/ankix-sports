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
    const results = cricScoreRes.data
      .filter((m: any) => m.ms === 'result')
      .map(transformCricScoreToMatch);
    if (results.length > 0) {
      return res.status(200).json({ ...cricScoreRes, data: results });
    }
  }

  const currentResult = await fetchFromCricApi('currentMatches', {}, 60000);
  let completed: any[] = [];
  if (currentResult.status === 'success' && Array.isArray(currentResult.data)) {
    completed = currentResult.data.filter((m: any) => m.matchEnded || /won by|drawn|tied|no result/i.test(m.status || ''));
  }

  return res.status(200).json({ ...currentResult, data: completed });
}
