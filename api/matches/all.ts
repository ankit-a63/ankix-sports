import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchFromCricApi } from '../../src/server/cricApiProxy';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Fetch current and active matches first (contains live scores, real teams, and recent results)
  let result = await fetchFromCricApi('currentMatches', {}, 60000);

  // If currentMatches returns data, filter out any placeholder TBC vs TBC matches
  if (result.status === 'success' && Array.isArray(result.data)) {
    const validMatches = result.data.filter((m: any) => {
      const teams = m.teams || [];
      const isPlaceholder = teams.every((t: string) => /tbc|tbd/i.test(t));
      return !isPlaceholder;
    });

    if (validMatches.length > 0) {
      return res.status(200).json({ ...result, data: validMatches });
    }
  }

  // Fallback to general matches if currentMatches has no items
  result = await fetchFromCricApi('matches', {}, 60000);
  return res.status(200).json(result);
}
