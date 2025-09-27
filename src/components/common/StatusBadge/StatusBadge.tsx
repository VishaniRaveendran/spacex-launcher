import React from "react";

type StatusBadgeProps<T extends string = string> = {
  status: T;
  colorMap?: Partial<Record<T, string>>;
  className?: string;
};

const defaultColors: Record<string, string> = {
  Success:
    "bg-gradient-to-r from-green-500 to-green-700 text-white border border-green-400",
  Failure:
    "bg-gradient-to-r from-red-500 to-red-700 text-white border border-red-400",
  Pending:
    "bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 border border-yellow-300",
};

function StatusBadge<T extends string = string>({
  status,
  colorMap,
  className = "",
}: StatusBadgeProps<T>) {
  const colorClass =
    (colorMap && colorMap[status]) ||
    defaultColors[status] ||
    "bg-gray-300 text-gray-800 border border-gray-400";
  return (
    <span
      className={`px-4 py-2 rounded-lg text-center font-bold shadow-lg tracking-wide text-sm ${colorClass} ${className}`.trim()}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
