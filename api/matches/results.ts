import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchFromCricApi } from '../../src/server/cricApiProxy';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate=600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Check currentMatches first as finished matches today have rich innings scores
  const currentResult = await fetchFromCricApi('currentMatches', {}, 60000);
  let completed: any[] = [];

  if (currentResult.status === 'success' && Array.isArray(currentResult.data)) {
    completed = currentResult.data.filter((m: any) => m.matchEnded || /won by|drawn|tied|no result/i.test(m.status || ''));
  }

  if (completed.length > 0) {
    return res.status(200).json({ ...currentResult, data: completed });
  }

  const result = await fetchFromCricApi('matches', {}, 180000);
  if (result.status === 'success' && Array.isArray(result.data)) {
    completed = result.data.filter((m: any) => m.matchEnded || /won by|drawn|tied|no result/i.test(m.status || ''));
    return res.status(200).json({ ...result, data: completed });
  }

  return res.status(200).json(result);
}
