import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import type { Plugin } from 'vite';
import { fetchFromCricApi } from './src/server/cricApiProxy';
import { SAMPLE_STANDINGS } from './src/services/sampleCricketData';

function cricketApiDevPlugin(): Plugin {
  return {
    name: 'cricket-api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const urlStr = req.url || '';
        if (!urlStr.startsWith('/api/')) {
          return next();
        }

        const url = new URL(urlStr, `http://${req.headers.host || 'localhost'}`);
        const pathname = url.pathname;

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        try {
          if (pathname === '/api/matches/live') {
            const data = await fetchFromCricApi('currentMatches', {}, 60000);
            res.end(JSON.stringify(data));
            return;
          }

          if (pathname === '/api/matches/all') {
            let data = await fetchFromCricApi('currentMatches', {}, 60000);
            if (data.status === 'success' && Array.isArray(data.data)) {
              const valid = data.data.filter((m: any) => {
                const teams = m.teams || [];
                return !teams.every((t: string) => /tbc|tbd/i.test(t));
              });
              if (valid.length > 0) {
                res.end(JSON.stringify({ ...data, data: valid }));
                return;
              }
            }
            data = await fetchFromCricApi('matches', {}, 60000);
            res.end(JSON.stringify(data));
            return;
          }

          if (pathname === '/api/matches/upcoming') {
            const result = await fetchFromCricApi('matches', {}, 120000);
            if (result.status === 'success' && Array.isArray(result.data)) {
              const upcoming = result.data.filter((m: any) => !m.matchStarted && !m.matchEnded);
              res.end(JSON.stringify({ ...result, data: upcoming }));
              return;
            }
            res.end(JSON.stringify(result));
            return;
          }

          if (pathname === '/api/matches/results') {
            const currentResult = await fetchFromCricApi('currentMatches', {}, 60000);
            let completed: any[] = [];
            if (currentResult.status === 'success' && Array.isArray(currentResult.data)) {
              completed = currentResult.data.filter((m: any) => m.matchEnded || /won by|drawn|tied|no result/i.test(m.status || ''));
            }
            if (completed.length > 0) {
              res.end(JSON.stringify({ ...currentResult, data: completed }));
              return;
            }
            const result = await fetchFromCricApi('matches', {}, 180000);
            if (result.status === 'success' && Array.isArray(result.data)) {
              completed = result.data.filter((m: any) => m.matchEnded || /won by|drawn|tied|no result/i.test(m.status || ''));
              res.end(JSON.stringify({ ...result, data: completed }));
              return;
            }
            res.end(JSON.stringify(result));
            return;
          }

          if (pathname.startsWith('/api/matches/')) {
            const matchId = pathname.replace('/api/matches/', '').split('/')[0];
            const matchInfoResult = await fetchFromCricApi('match_info', { id: matchId }, 60000);
            if (matchInfoResult.status === 'success') {
              const matchData = { ...matchInfoResult.data };
              try {
                const scorecardResult = await fetchFromCricApi('match_scorecard', { id: matchId }, 60000);
                if (scorecardResult.status === 'success' && scorecardResult.data?.scorecard) {
                  matchData.scorecard = scorecardResult.data.scorecard;
                }
              } catch {
                // Ignore scorecard failure
              }
              res.end(JSON.stringify({ status: 'success', data: matchData, info: matchInfoResult.info }));
              return;
            }
            res.end(JSON.stringify(matchInfoResult));
            return;
          }

          if (pathname === '/api/series') {
            const search = url.searchParams.get('search');
            const params: Record<string, string> = {};
            if (search) params.search = search;
            const data = await fetchFromCricApi('series', params, 300000);
            res.end(JSON.stringify(data));
            return;
          }

          if (pathname.startsWith('/api/series/') && pathname.endsWith('/matches')) {
            const seriesId = pathname.replace('/api/series/', '').replace('/matches', '');
            const data = await fetchFromCricApi('series_info', { id: seriesId }, 300000);
            res.end(JSON.stringify(data));
            return;
          }

          if (pathname === '/api/points-table') {
            res.end(JSON.stringify({
              status: 'success',
              data: SAMPLE_STANDINGS,
              info: {
                freshness: 'cached',
                cachedAt: new Date().toISOString()
              }
            }));
            return;
          }

          res.statusCode = 404;
          res.end(JSON.stringify({ status: 'failure', message: 'API route not found' }));
        } catch (err: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ status: 'failure', message: err.message || 'Internal proxy error' }));
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.CRICKET_API_KEY) {
    process.env.CRICKET_API_KEY = env.CRICKET_API_KEY;
  }

  return {
    plugins: [react(), cricketApiDevPlugin()],
    server: {
      port: 5173,
      host: true,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three')) {
              return 'three';
            }
          },
        },
      },
    },
  };
});
