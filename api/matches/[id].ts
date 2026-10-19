import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchFromCricApi } from '../../src/server/cricApiProxy';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const matchId = (req.query.id as string) || '';
  if (!matchId) {
    return res.status(400).json({ status: 'failure', data: null, info: { error: 'Missing match ID parameter' } });
  }

  // Fetch basic match details
  const matchInfoResult = await fetchFromCricApi('match_info', { id: matchId }, 60000);
  if (matchInfoResult.status !== 'success') {
    return res.status(200).json(matchInfoResult);
  }

  const matchData = { ...matchInfoResult.data };

  // Attempt scorecard if fantasy enabled or supported
  try {
    const scorecardResult = await fetchFromCricApi('match_scorecard', { id: matchId }, 60000);
    if (scorecardResult.status === 'success' && scorecardResult.data?.scorecard) {
      matchData.scorecard = scorecardResult.data.scorecard;
    }
  } catch {
    // Scorecard not available under current tier, retain base match data
  }

  return res.status(200).json({
    status: 'success',
    data: matchData,
    info: matchInfoResult.info
  });
}
