import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchFromCricApi } from '../../src/server/cricApiProxy';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const search = req.query.search as string;
  const params: Record<string, string> = {};
  if (search) params.search = search;

  const result = await fetchFromCricApi('series', params, 300000);
  return res.status(200).json(result);
}
