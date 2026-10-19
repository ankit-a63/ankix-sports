import { useState, useEffect } from 'react';

const FAVORITES_STORAGE_KEY = 'ankix_favorite_matches';
const FAVORITE_TEAMS_STORAGE_KEY = 'ankix_favorite_teams';

export function useFavorites() {
  const [favoriteMatches, setFavoriteMatches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [favoriteTeams, setFavoriteTeams] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITE_TEAMS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleFavoriteMatch = (matchId: string) => {
    setFavoriteMatches(prev => {
      const next = prev.includes(matchId) ? prev.filter(id => id !== matchId) : [...prev, matchId];
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isMatchFavorite = (matchId: string): boolean => {
    return favoriteMatches.includes(matchId);
  };

  const toggleFavoriteTeam = (teamName: string) => {
    setFavoriteTeams(prev => {
      const next = prev.includes(teamName) ? prev.filter(t => t !== teamName) : [...prev, teamName];
      localStorage.setItem(FAVORITE_TEAMS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isTeamFavorite = (teamName: string): boolean => {
    return favoriteTeams.includes(teamName);
  };

  return {
    favoriteMatches,
    favoriteTeams,
    toggleFavoriteMatch,
    isMatchFavorite,
    toggleFavoriteTeam,
    isTeamFavorite,
  };
}
