import React from "react";
import { FaRocket } from "react-icons/fa";
import { Typography } from "@/components/common/Typography/Typography";
interface RocketSectionProps {
  rocket: {
    name: string;
    type: string;
    description?: string;
    height?: { meters: number; feet: number };
    mass?: { kg: number };
  };
}

export const RocketSection: React.FC<RocketSectionProps> = ({ rocket }) => {
  return (
    <div className="bg-gradient-to-br from-[#0B0D17] via-[#1B2A41] to-[#005288] rounded-2xl shadow-2xl p-8 border border-[#1B2A41] backdrop-blur-md transition-shadow duration-300">
      <Typography
        as="h2"
        className="flex items-center gap-2 text-2xl font-extrabold mb-4 text-blue-100 drop-shadow-lg"
        fontWeight="700"
      >
        <FaRocket className="text-3xl animate-pulse" /> Rocket Information
      </Typography>
      <div className="mb-3 flex flex-col gap-2">
        <div>
          <Typography
            as="span"
            className="font-semibold text-blue-200 py-1 rounded mr-2"
            fontWeight="700"
          >
            Name:
          </Typography>
          <Typography
            as="span"
            className="text-slate-200 text-lg font-medium align-middle"
          >
            {rocket.name}
          </Typography>
        </div>
        <div>
          <Typography
            as="span"
            className="font-semibold text-blue-200 py-1 rounded mr-2"
            fontWeight="700"
          >
            Type:
          </Typography>
          <Typography
            as="span"
            className="text-slate-200 text-lg font-medium align-middle"
          >
            {rocket.type}
          </Typography>
        </div>
        {rocket.description && (
          <div>
            <Typography
              as="span"
              className="font-semibold text-blue-200 py-1 rounded mr-2"
              fontWeight="700"
            >
              Description:
            </Typography>
            <Typography
              as="span"
              className="text-slate-300 text-base italic align-middle"
            >
              {rocket.description}
            </Typography>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-6 pt-4">
        {rocket.height && (
          <div className="flex flex-col items-start">
            <Typography
              as="span"
              className="text-blue-200 py-1 rounded mb-1"
              fontWeight="700"
            >
              Height:
            </Typography>
            <Typography
              as="span"
              className="text-slate-200 text-lg align-middle"
            >
              {rocket.height.meters}m <span>({rocket.height.feet}ft)</span>
            </Typography>
          </div>
        )}
        {rocket.mass && (
          <div className="flex flex-col items-start">
            <Typography
              as="span"
              className="font-semibold text-blue-200 py-1 rounded mb-1"
              fontWeight="700"
            >
              Mass:
            </Typography>
            <Typography
              as="span"
              className="text-slate-200 text-lg align-middle"
            >
              {rocket.mass.kg.toLocaleString()}kg
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
