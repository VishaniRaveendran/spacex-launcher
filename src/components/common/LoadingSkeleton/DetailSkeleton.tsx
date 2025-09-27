import React from "react";

export const Skeleton: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div className={`animate-pulse bg-gray-700/40 rounded ${className}`}></div>
);

export const DetailSkeleton: React.FC = () => (
  <div className="min-h-screen text-white">
    {/* Header skeleton */}
    <div className="w-full bg-gradient-to-br from-[#0B0D17] via-[#1B2A41] to-[#005288] shadow-lg px-0 py-6 mb-2 border-b border-[#1B2A41]">
      <div className="mx-auto w-full md:max-w-[80%] max-w-[90%] flex flex-col gap-2 px-4">
        <Skeleton className="h-10 w-1/2 mb-2 rounded" />
        <Skeleton className="h-6 w-1/3 rounded" />
      </div>
    </div>
    <div className="w-full">
      <div className="mx-auto w-full md:max-w-[80%] max-w-[90%] py-12 px-4 flex flex-col items-center">
        {/* Back Button skeleton */}
        <div className="w-full flex items-center justify-start mb-8">
          <Skeleton className="h-10 w-44 rounded-full" />
        </div>
        {/* Main details skeleton */}
        <div className="w-full mb-8">
          <div className="space-y-6 mx-auto bg-gradient-to-br from-[#0B0D17] via-[#1B2A41] to-[#005288] rounded-2xl shadow-2xl p-4 sm:p-6 mb-6 sm:mb-10 border border-[#1B2A41] backdrop-blur-md w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Skeleton className="h-28 w-28 rounded-full mx-auto sm:mx-0" />
              <div className="flex-1 text-center w-full space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full">
                  <Skeleton className="h-10 w-2/3 mx-auto sm:mx-0" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <div className="flex flex-col items-center sm:items-start gap-1 mt-2 sm:mt-3 w-full">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-6 w-32 mt-2" />
                </div>
              </div>
            </div>
            <Skeleton className="h-6 w-3/4 mt-4" />
            <div className="flex gap-2 mt-3">
              <Skeleton className="h-10 w-32 rounded" />
              <Skeleton className="h-10 w-32 rounded" />
            </div>
          </div>
        </div>
        {/* Details Grid skeleton */}
        <div className="w-full grid gap-8 md:grid-cols-2 mb-8">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/4 mb-2" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/4 mb-2" />
          </div>
        </div>
        {/* Payloads skeleton */}
        <div className="w-full mt-10">
          <Skeleton className="h-10 w-40 mb-4" />
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="flex gap-4 mb-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
              </div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 mb-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
