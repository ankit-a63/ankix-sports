import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Preloader } from './components/brand/Preloader';
import { ApiStatusModal } from './components/common/ApiStatusModal';
import { SearchModal } from './components/layout/SearchModal';
import { MatchCardSkeleton } from './components/match/MatchCardSkeleton';
import { cricketApi } from './services/api';
import { CricketMatch } from './types/cricket';

// Route-level code splitting & lazy loading
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const LiveMatchesPage = lazy(() => import('./pages/LiveMatchesPage').then(m => ({ default: m.LiveMatchesPage })));
const UpcomingPage = lazy(() => import('./pages/UpcomingPage').then(m => ({ default: m.UpcomingPage })));
const ResultsPage = lazy(() => import('./pages/ResultsPage').then(m => ({ default: m.ResultsPage })));
const SeriesPage = lazy(() => import('./pages/SeriesPage').then(m => ({ default: m.SeriesPage })));
const PointsTablePage = lazy(() => import('./pages/PointsTablePage').then(m => ({ default: m.PointsTablePage })));
const MatchDetailPage = lazy(() => import('./pages/MatchDetailPage').then(m => ({ default: m.MatchDetailPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageSuspenseFallback() {
  return (
    <div className="min-h-[60vh] container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <MatchCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function MainLayout() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [apiStatusOpen, setApiStatusOpen] = useState(false);

  // Global live count poll for navbar badge
  const { data: allMatchesResponse } = useQuery({
    queryKey: ['matches', 'all'],
    queryFn: () => cricketApi.getAllMatches(),
    refetchInterval: 60000,
  });

  const matches: CricketMatch[] = allMatchesResponse?.data || [];
  const liveCount = matches.filter(m => m.isLive).length;

  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col selection:bg-brand-emerald selection:text-brand-bg">
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      <Navbar
        liveCount={liveCount}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="flex-1">
        <ScrollToTop />
        <Suspense fallback={<PageSuspenseFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/live" element={<LiveMatchesPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/points-table" element={<PointsTablePage />} />
            <Route path="/match/:matchId" element={<MatchDetailPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      {/* Global Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        matches={matches}
      />

      <ApiStatusModal
        isOpen={apiStatusOpen}
        onClose={() => setApiStatusOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
