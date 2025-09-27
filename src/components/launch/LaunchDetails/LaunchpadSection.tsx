import React, { useMemo } from "react";
import { HiOutlineMapPin } from "react-icons/hi2";
import { Typography } from "@/components/common/Typography/Typography";
interface LaunchpadSectionProps {
  launchpad: {
    full_name: string;
    locality: string;
    region: string;
    status?: string;
    details?: string;
  };
}

export const LaunchpadSection: React.FC<LaunchpadSectionProps> = ({
  launchpad,
}) => {
  const statusColor = useMemo(
    () =>
      launchpad.status === "active"
        ? "bg-green-600/90 text-white border-green-400"
        : "bg-slate-600/80 text-slate-200 border-slate-400/40",
    [launchpad.status]
  );
  return (
    <div className="bg-gradient-to-br from-[#0B0D17] via-[#1B2A41] to-[#005288] rounded-2xl shadow-2xl p-8 border border-[#1B2A41] backdrop-blur-md transition-shadow duration-300">
      <Typography
        as="h2"
        className="flex items-center gap-2 text-2xl font-extrabold mb-4 text-blue-100 drop-shadow-lg"
        fontWeight="700"
      >
        <HiOutlineMapPin className="inline-block text-3xl animate-pulse" />{" "}
        Launchpad Information
      </Typography>
      <div className="mb-3 flex flex-col gap-2">
        <div>
          <Typography as="span" className="text-blue-200" fontWeight="700">
            Name:
          </Typography>{" "}
          <Typography
            as="span"
            className="text-slate-200 text-lg"
            fontWeight="700"
          >
            {launchpad.full_name}
          </Typography>
        </div>
        <div>
          <Typography as="span" className="text-blue-200" fontWeight="700">
            Location:
          </Typography>{" "}
          <Typography as="span" className="text-slate-200 text-lg font-medium">
            {launchpad.locality}, {launchpad.region}
          </Typography>
        </div>
        {launchpad.status && (
          <div>
            <Typography as="span" className="text-blue-200" fontWeight="700">
              Status:
            </Typography>{" "}
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColor} shadow-sm ml-1`}
            >
              {launchpad.status.charAt(0).toUpperCase() +
                launchpad.status.slice(1)}
            </span>
          </div>
        )}
        {launchpad.details && (
          <div>
            <Typography as="span" className="text-blue-200" fontWeight="700">
              Details:
            </Typography>{" "}
            <Typography as="span" className="text-slate-300 text-base italic">
              {launchpad.details}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
