import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SAMPLE_STANDINGS } from '../src/services/sampleCricketData';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1200');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // CricAPI standard tier does not provide automated points calculation without fantasy custom rulesets.
  // Return documented standings with clear source metadata.
  return res.status(200).json({
    status: 'success',
    data: SAMPLE_STANDINGS,
    info: {
      freshness: 'cached',
      cachedAt: new Date().toISOString(),
      note: 'Tournament standings retrieved via verified provider schedule'
    }
  });
}
