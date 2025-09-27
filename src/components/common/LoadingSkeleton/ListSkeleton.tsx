import React from "react";

export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse bg-slate-900 rounded-xl shadow-xl p-6 h-[340px] flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-2/3 bg-slate-700/80 rounded" />
            <div className="h-6 w-6 bg-blue-800/70 rounded-full" />
          </div>
          <div className="flex gap-2 mb-2">
            <div className="h-4 w-1/3 bg-slate-700/60 rounded" />
            <div className="h-4 w-1/4 bg-slate-700/60 rounded" />
          </div>
          <div className="h-4 w-1/2 bg-blue-900/60 rounded mb-2" />
          <div className="h-4 w-1/2 bg-blue-900/60 rounded mb-2" />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="h-8 w-20 bg-blue-800/60 rounded" />
        </div>
      </div>
    ))}
  </div>
);
