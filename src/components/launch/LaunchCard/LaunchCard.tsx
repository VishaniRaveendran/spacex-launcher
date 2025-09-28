export interface LaunchCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  rocket: string;
  launchpad: string;
  status: "Success" | "Failure" | "Pending";
  link?: string;
  favourited?: boolean;
  onFavouriteToggle?: () => void;
}

import React from "react";
import { useRouter } from "next/navigation";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import { HiOutlineCalendar, HiOutlineClock } from "react-icons/hi";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Typography } from "@/components/common/Typography/Typography";
import StatusBadge from "@/components/common/StatusBadge/StatusBadge";

export const LaunchCard: React.FC<LaunchCardProps> = ({
  id,
  title,
  date,
  time,
  rocket,
  launchpad,
  status,
  favourited = false,
  onFavouriteToggle,
}) => {
  const router = useRouter();
  const handleFavouriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onFavouriteToggle?.();
  };
  const handleCardClick = () => {
    router.push(`/launch/${id}`, { scroll: false });
  };

  // Prefetch detail page for smoother navigation
  const handleMouseEnter = () => {
    router.prefetch(`/launch/${id}`);
  };
  return (
    <div
      data-testid="launch-card"
      className="max-w-sm bg-gradient-to-br from-[#0B0D17] via-[#1B2A41] to-[#005288] rounded-2xl shadow-2xl p-6 text-white relative cursor-pointer border border-[#1B2A41] hover:scale-[1.025] transition-transform duration-200 group"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      role="listitem"
      aria-label={`Launch card for ${title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick();
        }
      }}
    >
      {/* Title and Star */}
      <div className="flex justify-between items-center mb-6">
        <Typography
          as="h2"
          fontWeight="700"
          useClamp={true}
          minSize={20}
          maxSize={28}
          className="font-orbitron text-2xl tracking-wide group-hover:text-cyan-300 transition-colors duration-200 mb-0"
        >
          {title}
        </Typography>
        <button
          aria-label={favourited ? "Unfavourite" : "Favourite"}
          onClick={handleFavouriteClick}
          type="button"
          tabIndex={0}
          className={
            `icon-btn-fav text-2xl rounded-full p-2 transition-colors duration-150 focus:ring-yellow-400` +
            (favourited
              ? "bg-yellow-400/10 hover:bg-yellow-400/20"
              : "bg-cyan-900/10 hover:bg-cyan-400/10")
          }
        >
          {favourited ? (
            <HiStar
              className="text-yellow-400 drop-shadow-sm"
              aria-hidden="true"
            />
          ) : (
            <HiOutlineStar
              className="text-cyan-200 group-hover:text-yellow-300"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <span className="bg-[#11213A] rounded-full p-2 flex items-center justify-center">
            <HiOutlineCalendar
              className="text-cyan-300 text-xl"
              aria-hidden="true"
            />
          </span>
          <span>
            <Typography
              as="span"
              fontWeight="600"
              className="text-cyan-200 text-base"
            >
              Date
            </Typography>
            <Typography as="div" className="text-sm text-cyan-100">
              {date}
            </Typography>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-[#11213A] rounded-full p-2 flex items-center justify-center">
            <HiOutlineClock
              className="text-cyan-300 text-xl"
              aria-hidden="true"
            />
          </span>
          <span>
            <Typography
              as="span"
              fontWeight="600"
              className="text-cyan-200 text-base"
            >
              Time
            </Typography>
            <Typography as="div" className="text-sm text-cyan-100">
              {time}
            </Typography>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-[#11213A] rounded-full p-2 flex items-center justify-center">
            <HiOutlineRocketLaunch
              className="text-cyan-300 text-xl"
              aria-hidden="true"
            />
          </span>
          <span>
            <Typography
              as="span"
              fontWeight="600"
              className="text-cyan-200 text-base"
            >
              Rocket
            </Typography>
            <Typography as="div" className="text-xs break-all text-cyan-100">
              {rocket}
            </Typography>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-[#11213A] rounded-full p-2 flex items-center justify-center">
            <HiOutlineLocationMarker
              className="text-cyan-300 text-xl"
              aria-hidden="true"
            />
          </span>
          <span>
            <Typography
              as="span"
              fontWeight="600"
              className="text-cyan-200 text-base"
            >
              Launchpad
            </Typography>
            <Typography as="div" className="text-xs break-all text-cyan-100">
              {launchpad}
            </Typography>
          </span>
        </div>
      </div>

      {/* Status Button */}
      <div className="flex justify-between items-center mt-2">
        <StatusBadge status={status} />
      </div>
    </div>
  );
};
