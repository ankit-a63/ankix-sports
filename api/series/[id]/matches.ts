import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchFromCricApi } from '../../../src/server/cricApiProxy';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const seriesId = (req.query.id as string) || '';
  if (!seriesId) {
    return res.status(400).json({ status: 'failure', data: null, info: { error: 'Missing series ID parameter' } });
  }

  const result = await fetchFromCricApi('series_info', { id: seriesId }, 300000);
  return res.status(200).json(result);
}
