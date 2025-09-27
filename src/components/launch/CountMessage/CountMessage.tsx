import { Launch } from "@/types/types";
import { HiOutlineRocketLaunch } from "react-icons/hi2";

export function CountMessage({
  loading,
  error,
  search,
  favouritesActive,
  sortedLaunches,
  filteredCount,
  totalCount,
  selectedYear,
  selectedLaunch,
}: {
  loading: boolean;
  error: string | null;
  search: string;
  favouritesActive: boolean;
  sortedLaunches: Launch[];
  filteredCount: number | null;
  totalCount: number | null;
  selectedYear: string;
  selectedLaunch: string;
}) {
  if (loading) {
    return (
      <span className="inline-flex items-center gap-2 animate-pulse text-lg font-medium text-gray-400">
        <HiOutlineRocketLaunch className="text-lg text-gradient-to-r from-sky-400 to-cyan-600" />
        Loading launches...
      </span>
    );
  } else if (error) {
    return (
      <span className="text-red-500">
        {error}
        <button
          className="ml-4 px-3 py-1 bg-blue-700 text-white rounded shadow"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </span>
    );
  }

  // Helper for standard count text
  const CountText = ({
    current,
    total,
    showTotal = true,
  }: {
    current: number;
    total?: number;
    showTotal?: boolean;
  }) => (
    <span className="inline-flex items-center md:items-start gap-2 text-lg font-medium text-cyan-400 drop-shadow-sm">
      <HiOutlineRocketLaunch className="text-lg text-cyan-400 drop-shadow" />
      {showTotal && total !== undefined ? (
        <>
          Showing <span className="font-medium">{current}</span> of{" "}
          <span className="font-medium">{total}</span> launches
        </>
      ) : (
        <>
          Showing <span className="font-medium">{current}</span> launches
        </>
      )}
    </span>
  );

  if (search) {
    return (
      <CountText current={sortedLaunches.length} total={filteredCount ?? 0} />
    );
  } else if (favouritesActive) {
    return (
      <CountText current={sortedLaunches.length} total={filteredCount ?? 0} />
    );
  } else if (
    filteredCount !== null &&
    totalCount !== null &&
    (selectedYear !== "All Years" || selectedLaunch !== "All Launches")
  ) {
    return <CountText current={filteredCount} total={totalCount} />;
  } else if (totalCount !== null) {
    return <CountText current={totalCount} showTotal={false} />;
  } else {
    return <CountText current={sortedLaunches.length} showTotal={false} />;
  }
}
