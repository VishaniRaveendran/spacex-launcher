import { useState, useEffect, useCallback, useMemo } from "react";
import type { Launch } from "@/types/types";
import { apiClient } from "@/lib/api/client";
import type { AxiosError } from "axios";

interface UseLaunchesOptions {
  searchTerm: string;
  yearFilter: string;
  successFilter: string;
  sortBy: "newest" | "oldest";
  page: number;
  limit: number;
}

export function useLaunches(options: UseLaunchesOptions) {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchLaunches = useCallback(async (abortSignal?: AbortSignal) => {
    try {
      setError(null);
      const response = await apiClient.get<Launch[]>("/launches", {
        signal: abortSignal,
      });
      setLaunches(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (
        axiosError.name !== "CanceledError" &&
        axiosError.name !== "AbortError"
      ) {
        setError(axiosError.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredAndSortedLaunches = useMemo(() => {
    let filtered = [...launches];

    // Search filter
    if (options.searchTerm) {
      filtered = filtered.filter((launch) =>
        launch.name.toLowerCase().includes(options.searchTerm.toLowerCase())
      );
    }

    // Year filter
    if (options.yearFilter && options.yearFilter !== "all") {
      filtered = filtered.filter((launch) => {
        const year = new Date(launch.date_utc).getFullYear().toString();
        return year === options.yearFilter;
      });
    }

    // Success filter
    if (options.successFilter !== "all") {
      filtered = filtered.filter((launch) => {
        if (options.successFilter === "success") return launch.success === true;
        if (options.successFilter === "failed") return launch.success === false;
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.date_utc).getTime();
      const dateB = new Date(b.date_utc).getTime();
      return options.sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [launches, options]);

  const paginatedLaunches = useMemo(() => {
    const startIndex = (options.page - 1) * options.limit;
    const endIndex = startIndex + options.limit;
    return filteredAndSortedLaunches.slice(0, endIndex);
  }, [filteredAndSortedLaunches, options.page, options.limit]);

  // Update hasMore separately using useEffect
  useEffect(() => {
    const startIndex = (options.page - 1) * options.limit;
    const endIndex = startIndex + options.limit;
    setHasMore(endIndex < filteredAndSortedLaunches.length);
  }, [filteredAndSortedLaunches.length, options.page, options.limit]);

  const retry = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchLaunches();
  }, [fetchLaunches]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchLaunches(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetchLaunches]);

  return {
    launches: paginatedLaunches,
    loading,
    error,
    hasMore,
    retry,
    totalCount: filteredAndSortedLaunches.length,
  };
}
