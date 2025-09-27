import React from "react";
import { useRouter } from "next/navigation";
import { DetailSkeleton } from "@/components/common/LoadingSkeleton/DetailSkeleton";
import Header from "@/components/common/Header/Header";

import { LaunchDetailsSection } from "@/components/launch/LaunchDetails/LaunchDetailsSection";
import { RocketSection } from "@/components/launch/LaunchDetails/RocketSection";
import { LaunchpadSection } from "@/components/launch/LaunchDetails/LaunchpadSection";
import { PayloadsSection } from "@/components/launch/LaunchDetails/PayloadsSection";

import { HiChevronLeft } from "react-icons/hi2";
import StatusBadge from "@/components/common/StatusBadge/StatusBadge";
import { Button } from "@/components/common/Button/Button";

import type { Launch } from "@/types/types";
type LaunchDetails = Launch & {
  rocket_details?: import("@/types/types").Rocket & {
    height?: { meters: number; feet: number };
    mass?: { kg: number };
  };
  launchpad_details?: import("@/types/types").Launchpad & { status?: string };
  payload_details?: import("@/types/types").Payload[];
};

interface LaunchDetailsViewProps {
  launch: LaunchDetails | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function LaunchDetailsView({
  launch,
  loading,
  error,
  retry,
}: LaunchDetailsViewProps) {
  const router = useRouter();

  // Date formatting helper
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date
        .toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(" at ", " • ");
    } catch {
      return "Date unavailable";
    }
  };

  const getSuccessBadge = () => {
    if (!launch) return null;
    let status: "Success" | "Failure" | "Pending";
    if (launch.success === true) status = "Success";
    else if (launch.success === false) status = "Failure";
    else status = "Pending";
    return <StatusBadge status={status} className="ml-2" />;
  };

  if (loading || !launch) {
    return <DetailSkeleton />;
  }

  if (!loading && error) {
    return (
      <div className="py-10 max-w-[2xl] mx-auto text-center">
        <Button className="mb-6" onClick={() => router.back()}>
          ← Back to Launches
        </Button>
        <div className="text-red-500 mb-4">{error || "Launch not found"}</div>
        <Button onClick={retry}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br text-white">
      <Header
        title={launch.name}
        description={launch.details || "SpaceX Launch Details"}
      />
      <main className="mx-auto w-full md:max-w-[80%] max-w-[90%] py-12 px-4 flex flex-col items-center">
        {/* Back Button */}
        <div className="w-full flex items-center justify-start mb-8">
          <Button
            className="inline-flex items-center gap-2 rounded-full font-bold shadow-xl transition-all duration-200 border-2 border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-blue-950 group"
            onClick={() => router.back()}
            aria-label="Back to Launches"
          >
            <HiChevronLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="tracking-wide">Back to Launches</span>
          </Button>
        </div>

        <div className="w-full">
          <LaunchDetailsSection
            launch={launch}
            formatDate={formatDate}
            getSuccessBadge={getSuccessBadge}
          />
        </div>

        {/* Details Grid */}
        <div className="w-full grid gap-8 md:grid-cols-2">
          {launch.rocket_details && (
            <RocketSection rocket={launch.rocket_details} />
          )}
          {launch.launchpad_details && (
            <LaunchpadSection launchpad={launch.launchpad_details} />
          )}
        </div>

        {/* Payloads */}
        {launch.payload_details && launch.payload_details.length > 0 && (
          <div className="w-full">
            <PayloadsSection payloads={launch.payload_details} />
          </div>
        )}
      </main>
    </div>
  );
}
