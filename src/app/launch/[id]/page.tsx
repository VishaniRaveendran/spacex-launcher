"use client";
import { useParams } from "next/navigation";
import { useLaunchDetails } from "@/hooks/useLaunchDetails";
import { LaunchDetailsView } from "@/components/launch/LaunchDetailsView/LaunchDetailsView";

export default function LaunchDetailsPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : undefined;
  const { launch, loading, error, retry } = useLaunchDetails(id);
  return (
    <LaunchDetailsView
      launch={launch}
      loading={loading}
      error={error}
      retry={retry}
    />
  );
}
