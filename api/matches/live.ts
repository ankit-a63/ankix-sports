import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchFromCricApi } from '../../src/server/cricApiProxy';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const result = await fetchFromCricApi('currentMatches', {}, 60000);
  return res.status(200).json(result);
}
