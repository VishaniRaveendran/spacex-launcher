import { ListSkeleton } from "@/components/common/LoadingSkeleton/ListSkeleton";
import LaunchListViewClient from "@/components/launch/LaunchListView/LaunchListViewClient";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <LaunchListViewClient />
    </Suspense>
  );
}
