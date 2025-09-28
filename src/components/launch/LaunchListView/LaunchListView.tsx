"use client";
import React from "react";
import Header from "@/components/common/Header/Header";
import { useState, useEffect } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/launch/SearchFilters/Search";
import { Typography } from "@/components/common/Typography/Typography";
import { LaunchCard } from "@/components/launch/LaunchCard/LaunchCard";
import { useLaunches } from "@/hooks/useLaunches";
import { useFavoritesContext } from "@/hooks/FavoritesContext";
import { Filters } from "@/components/common/Filters/Filters";
import { ListSkeleton } from "@/components/common/LoadingSkeleton/ListSkeleton";
import { CountMessage } from "@/components/launch/CountMessage/CountMessage";
import { Button } from "@/components/common/Button/Button";

export function LaunchListView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebouncedValue(search, 350);
  const [selectedYear, setSelectedYear] = useState<string>(
    searchParams.get("year") || "All Years"
  );
  const [selectedLaunch, setSelectedLaunch] = useState<string>(
    searchParams.get("launch") || "All Launches"
  );
  const [favouritesActive, setFavouritesActive] = useState(
    searchParams.get("favourites") === "true"
  );
  const [sortOption, setSortOption] = useState<string>(
    searchParams.get("sort") || "Newest → Oldest"
  );
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  // Effects
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedYear && selectedYear !== "All Years")
      params.set("year", selectedYear);
    if (selectedLaunch && selectedLaunch !== "All Launches")
      params.set("launch", selectedLaunch);
    if (favouritesActive) params.set("favourites", "true");
    if (sortOption && sortOption !== "Newest → Oldest")
      params.set("sort", sortOption);
    router.replace("?" + params.toString(), { scroll: false });
  }, [
    search,
    selectedYear,
    selectedLaunch,
    favouritesActive,
    sortOption,
    router,
  ]);

  useEffect(() => {
    setPage(1);
    setIsFetching(false);
  }, [
    debouncedSearch,
    selectedYear,
    selectedLaunch,
    favouritesActive,
    sortOption,
  ]);

  const pageSize = 15;
  const normalizedSort = sortOption.toLowerCase();
  const sortBy =
    normalizedSort.includes("oldest") && !normalizedSort.startsWith("newest")
      ? "oldest"
      : "newest";
  let successFilter = "all";
  if (selectedLaunch === "Success") successFilter = "success";
  else if (selectedLaunch === "Failed") successFilter = "failed";
  const yearFilter =
    selectedYear && selectedYear !== "All Years" ? selectedYear : "all";

  const {
    launches,
    loading,
    error,
    hasMore: launchesHasMore,
    allYears,
    totalCount,
    filteredCount,
  } = useLaunches({
    searchTerm: debouncedSearch,
    yearFilter,
    successFilter,
    sortBy,
    page,
    limit: pageSize,
  });

  const {
    favorites: favouriteIds,
    toggleFavorite,
    isFavorite,
  } = useFavoritesContext();

  useEffect(() => {
    if (isFetching && !loading) setIsFetching(false);
  }, [loading, isFetching]);

  let launchesToShow = [...launches];
  if (favouritesActive) {
    launchesToShow = launchesToShow.filter((l) => favouriteIds.includes(l.id));
  }

  return (
    <div className="min-h-dscreen">
      <Header
        title="SpaceX Launch Tracker"
        description="Explore SpaceX launches, rockets, and mission details"
      />
      <main>
        <SearchBar value={search} onChange={setSearch} />
        <section
          className="mx-auto lg:w-[80%] md:w-[90%] w-[90%] space-y-7"
          role="region"
          aria-labelledby="launch-list-section-title"
        >
          <h2 id="launch-list-section-title" className="sr-only">
            Launch List Section
          </h2>
          <Filters
            data-testid="filters"
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedLaunch={selectedLaunch}
            setSelectedLaunch={setSelectedLaunch}
            favouritesActive={favouritesActive}
            setFavouritesActive={setFavouritesActive}
            sortOption={sortOption}
            setSortOption={setSortOption}
            yearOptions={allYears}
            aria-label="Launch filters"
          />
          <Typography
            as="p"
            className="text-center md:text-start text-gray-500 pl-1"
            role="status"
            aria-live="polite"
          >
            <CountMessage
              data-testid="count-message"
              loading={loading}
              error={error}
              search={search}
              favouritesActive={favouritesActive}
              sortedLaunches={launchesToShow}
              filteredCount={filteredCount}
              totalCount={totalCount}
              selectedYear={selectedYear}
              selectedLaunch={selectedLaunch}
            />
          </Typography>
          {loading && page === 1 ? (
            <ListSkeleton data-testid="loading-skeleton" />
          ) : error ? null : (
            <>
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                role="list"
                aria-label="Launch list"
              >
                {launchesToShow.map((launch) => (
                  <LaunchCard
                    key={launch.id}
                    id={launch.id}
                    title={launch.name}
                    date={new Date(launch.date_utc).toLocaleDateString()}
                    time={new Date(launch.date_utc).toLocaleTimeString()}
                    rocket={launch.rocket}
                    launchpad={launch.launchpad}
                    status={
                      launch.success === true
                        ? "Success"
                        : launch.success === false
                        ? "Failure"
                        : "Pending"
                    }
                    link={
                      launch.links.webcast ||
                      launch.links.wikipedia ||
                      undefined
                    }
                    favourited={isFavorite(launch.id)}
                    onFavouriteToggle={() => toggleFavorite(launch.id)}
                    aria-label={`Launch: ${launch.name}`}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-6">
                {!favouritesActive && launchesHasMore ? (
                  <Button
                    onClick={() => {
                      if (!loading && !isFetching && launchesHasMore) {
                        setIsFetching(true);
                        setPage((p) => p + 1);
                      }
                    }}
                    disabled={
                      loading ||
                      isFetching ||
                      !launchesHasMore ||
                      (loading && page === 1)
                    }
                    aria-label="Load more launches"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        (e.key === "Enter" || e.key === " ") &&
                        !loading &&
                        !isFetching &&
                        launchesHasMore
                      ) {
                        setIsFetching(true);
                        setPage((p) => p + 1);
                      }
                    }}
                  >
                    {isFetching || (loading && page > 1)
                      ? "Loading..."
                      : "Load More"}
                  </Button>
                ) : favouritesActive && launchesToShow.length === 0 ? (
                  <Typography as="p" className="text-center text-cyan-400 mt-4">
                    No favourites found.
                  </Typography>
                ) : !launchesHasMore || favouritesActive ? (
                  <Typography as="p" className="text-center text-cyan-400 mt-4">
                    No more launches to load.
                  </Typography>
                ) : null}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
