import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'spacex-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      if (saved) {
        const favoriteIds = JSON.parse(saved) as string[];
        setFavorites(new Set(favoriteIds));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((launchId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(launchId)) {
        newFavorites.delete(launchId);
      } else {
        newFavorites.add(launchId);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((launchId: string) => {
    return favorites.has(launchId);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
  }, []);

  return {
    favorites: Array.from(favorites),
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
}