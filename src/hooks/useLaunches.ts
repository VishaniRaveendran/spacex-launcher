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
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Launch[]>("/launches", {
        signal: abortSignal,
      });
      setLaunches(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (
        axiosError.name === "CanceledError" ||
        axiosError.name === "AbortError"
      ) {
        return;
      }
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredAndSortedLaunches = useMemo(() => {
    let filtered = launches;
    if (options.searchTerm) {
      const search = options.searchTerm.toLowerCase();
      filtered = filtered.filter((launch) =>
        launch.name.toLowerCase().includes(search)
      );
    }
    if (options.yearFilter && options.yearFilter !== "all") {
      filtered = filtered.filter((launch) => {
        const year = new Date(launch.date_utc).getFullYear().toString();
        return year === options.yearFilter;
      });
    }
    if (options.successFilter !== "all") {
      filtered = filtered.filter((launch) =>
        options.successFilter === "success"
          ? launch.success === true
          : options.successFilter === "failed"
          ? launch.success === false
          : true
      );
    }
    return filtered.slice().sort((a, b) => {
      const dateA = new Date(a.date_utc).getTime();
      const dateB = new Date(b.date_utc).getTime();
      return options.sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [launches, options]);

  const paginatedLaunches = useMemo(() => {
    const endIndex = options.page * options.limit;
    return filteredAndSortedLaunches.slice(0, endIndex);
  }, [filteredAndSortedLaunches, options.page, options.limit]);

  // Update hasMore separately using useEffect
  useEffect(() => {
    setHasMore(options.page * options.limit < filteredAndSortedLaunches.length);
  }, [filteredAndSortedLaunches.length, options.page, options.limit]);

  const retry = useCallback(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    fetchLaunches(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [
    fetchLaunches,
    options.searchTerm,
    options.yearFilter,
    options.successFilter,
    options.sortBy,
    options.page,
    options.limit,
  ]);

  const allYears = useMemo(() => {
    const years = Array.from(
      new Set(
        launches
          .map((l) => l.date_utc?.slice(0, 4))
          .filter((y): y is string => !!y && !isNaN(Number(y)))
      )
    ).sort((a, b) => Number(b) - Number(a));
    return ["All years", ...years];
  }, [launches]);

  return {
    launches: paginatedLaunches,
    loading,
    error,
    hasMore,
    retry,
    totalCount: launches.length,
    filteredCount: filteredAndSortedLaunches.length,
    allYears,
  };
}
