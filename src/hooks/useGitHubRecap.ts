import { useState, useCallback } from 'react';
import { GitHubRecap, mockRecapData } from '@/lib/mockData';
import { fetchGitHubRecap, clearRecapCache, checkRateLimit } from '@/lib/githubApi';
import { getSettings, saveRecap, getRecapByYear } from '@/lib/recapStorage';

interface UseGitHubRecapResult {
  data: GitHubRecap | null;
  isLoading: boolean;
  error: string | null;
  fromCache: boolean;
  useMock: boolean;
  fetchRecap: (forceRefresh?: boolean) => Promise<void>;
  clearCache: () => void;
  rateLimit: { remaining: number; reset: Date } | null;
}

export function useGitHubRecap(
  year: number = new Date().getFullYear()
): UseGitHubRecapResult {
  const [data, setData] = useState<GitHubRecap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [useMock, setUseMock] = useState(false);
  const [rateLimit, setRateLimit] = useState<{ remaining: number; reset: Date } | null>(null);

  const fetchRecap = useCallback(async (forceRefresh: boolean = false) => {
    setIsLoading(true);
    setError(null);
    setUseMock(false);

    try {
      // Check rate limit first
      const limit = await checkRateLimit();
      setRateLimit(limit);

      if (limit.remaining < 10) {
        // Check for stored recap first
        const stored = getRecapByYear(year);
        if (stored) {
          setData(stored.data);
          setFromCache(true);
          setError('Rate limit low. Using stored data.');
          setIsLoading(false);
          return;
        }
        
        // Fall back to mock
        console.warn('Rate limit low, using mock data');
        setData({ ...mockRecapData, year });
        setUseMock(true);
        setError('GitHub API rate limit reached. Showing sample data.');
        setIsLoading(false);
        return;
      }

      const settings = getSettings();
      const result = await fetchGitHubRecap(settings.username, year, forceRefresh);
      
      setData(result.data);
      setFromCache(result.fromCache);
      
      if (result.error) {
        setError(result.error);
      }

      // Save to storage for persistence
      saveRecap(result.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch recap';
      setError(message);
      
      // Try stored data first
      const stored = getRecapByYear(year);
      if (stored) {
        setData(stored.data);
        setFromCache(true);
      } else {
        // Fall back to mock data
        setData({ ...mockRecapData, year });
        setUseMock(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [year]);

  const clearCache = useCallback(() => {
    clearRecapCache();
    setFromCache(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    fromCache,
    useMock,
    fetchRecap,
    clearCache,
    rateLimit,
  };
}
