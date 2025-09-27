import React from "react";
import { FaRocket } from "react-icons/fa";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { Typography } from "@/components/common/Typography/Typography";
import Image from "next/image";

import { Button } from "@/components/common/Button/Button";
import type { Launch, Rocket, Launchpad, Payload } from "@/types/types";

export type LaunchDetails = Launch & {
  rocket_details?: Rocket & {
    height?: { meters: number; feet: number };
    mass?: { kg: number };
  };
  launchpad_details?: Launchpad & { status?: string };
  payload_details?: Payload[];
};

interface LaunchDetailsSectionProps {
  launch: LaunchDetails;
  formatDate: (dateString: string) => string;
  getSuccessBadge: () => React.ReactNode;
}

export const LaunchDetailsSection: React.FC<LaunchDetailsSectionProps> = ({
  launch,
  formatDate,
  getSuccessBadge,
}) => (
  <section
    className="space-y-6 mx-auto bg-gradient-to-br from-[#0B0D17] via-[#1B2A41] to-[#005288] rounded-2xl shadow-2xl p-4 sm:p-6 mb-6 sm:mb-10 border border-[#1B2A41] backdrop-blur-md w-full"
    role="region"
    aria-labelledby="launch-details-title"
    tabIndex={-1}
  >
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      {launch.links?.patch?.large ? (
        <Image
          src={launch.links.patch.large}
          alt={`${launch.name} mission patch`}
          width={104}
          height={104}
          className="h-28 w-28 object-contain mx-auto sm:mx-0 rounded-full border-4 border-blue-700 bg-blue-900 shadow-lg"
          priority
        />
      ) : (
        <div className="h-28 w-28 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-800 to-blue-600 border-4 border-blue-700 shadow-lg mx-auto sm:mx-0">
          <FaRocket
            className="text-6xl text-blue-300 animate-pulse"
            aria-hidden="true"
          />
        </div>
      )}
      <div className="flex-1 text-center w-full space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full">
          <Typography
            as="h1"
            id="launch-details-title"
            className="text-center md:text-left text-white drop-shadow-lg w-full"
            useClamp={true}
            minSize={22}
            maxSize={40}
          >
            {launch.name}
          </Typography>
          {getSuccessBadge()}
        </div>
        <div className="flex flex-col items-center sm:items-start gap-1 mt-2 sm:mt-3 w-full">
          <Typography
            as="div"
            className="flex items-center gap-2 text-blue-200"
            fontWeight="600"
            useClamp={true}
            minSize={15}
            maxSize={20}
          >
            <FaRegCalendarAlt className="text-xl" aria-hidden="true" />
            <Typography
              as="span"
              fontWeight="600"
              useClamp={true}
              minSize={15}
              maxSize={20}
            >
              {formatDate(launch.date_utc)}
            </Typography>
          </Typography>
          <Typography
            as="div"
            className="flex items-center gap-2 text-blue-200 pt-2"
            fontWeight="500"
            useClamp={true}
            minSize={13}
            maxSize={18}
          >
            <FaRegClock className="text-lg" aria-hidden="true" />
            <Typography
              as="span"
              fontWeight="500"
              useClamp={true}
              minSize={13}
              maxSize={18}
            >
              {new Date(launch.date_utc).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Typography>
          </Typography>
        </div>
      </div>
    </div>
    {launch.details && (
      <p className="text-blue-200 leading-relaxed mt-2 sm:mt-3 text-base sm:text-lg italic border-l-4 border-blue-700 pl-2 sm:pl-4 bg-blue-900/40 py-2">
        {launch.details}
      </p>
    )}
    {/* External Links */}
    <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4 w-full">
      {launch.links?.webcast && (
        <a
          href={launch.links.webcast}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch launch webcast for ${launch.name}`}
        >
          <Button type="button">
            <span aria-hidden="true" role="img">
              🎥
            </span>{" "}
            Watch Launch
          </Button>
        </a>
      )}
      {launch.links?.wikipedia && (
        <a
          href={launch.links.wikipedia}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read Wikipedia article for ${launch.name}`}
        >
          <Button type="button">
            <span aria-hidden="true" role="img">
              🌐
            </span>{" "}
            Wikipedia
          </Button>
        </a>
      )}
    </div>
  </section>
);
