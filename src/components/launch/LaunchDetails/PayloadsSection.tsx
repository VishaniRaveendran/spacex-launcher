import React from "react";
import { Payload } from "@/types/types";
import { Typography } from "@/components/common/Typography/Typography";
import { FaSatellite } from "react-icons/fa";

interface PayloadsSectionProps {
  payloads: Payload[];
}

export const PayloadsSection: React.FC<PayloadsSectionProps> = ({
  payloads,
}) => (
  <div className="bg-gradient-to-br from-[#0B0D17] via-[#1B2A41] to-[#005288] rounded-2xl shadow-2xl p-8 mt-10 border border-[#1B2A41] backdrop-blur-md transition-shadow duration-300">
    <Typography
      as="h2"
      className="text-3xl font-extrabold mb-6 text-blue-100 flex items-center gap-2 drop-shadow-lg"
      fontWeight="700"
    >
      <FaSatellite className="text-3xl animate-pulse" /> Payloads
    </Typography>
    <div className="overflow-x-auto">
      <table className="min-w-full text-base">
        <thead>
          <tr className="bg-blue-900/80">
            <th className="px-4 py-3 text-left">
              <Typography as="span" className="text-blue-200 font-semibold">
                Name
              </Typography>
            </th>
            <th className="px-4 py-3 text-left">
              <Typography as="span" className="text-blue-200 font-semibold">
                Type
              </Typography>
            </th>
            <th className="px-4 py-3 text-left">
              <Typography as="span" className="text-blue-200 font-semibold">
                Orbit
              </Typography>
            </th>
            <th className="px-4 py-3 text-left">
              <Typography as="span" className="text-blue-200 font-semibold">
                Mass
              </Typography>
            </th>
            <th className="px-4 py-3 text-left">
              <Typography as="span" className="text-blue-200 font-semibold">
                Customers
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {payloads.map((payload) => (
            <tr
              key={payload.id}
              className="border-b border-blue-800/60 hover:bg-blue-900/30 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-slate-100">
                <Typography as="span" className="text-slate-100 font-medium">
                  {payload.name}
                </Typography>
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded bg-blue-800/80 text-xs font-bold text-blue-200 shadow-sm border border-blue-700">
                  {payload.type}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-200">
                <Typography as="span" className="text-slate-200">
                  {payload.orbit || "N/A"}
                </Typography>
              </td>
              <td className="px-4 py-3 text-slate-200">
                {payload.mass_kg ? (
                  <Typography as="span" className="font-semibold">
                    {payload.mass_kg.toLocaleString()}kg
                  </Typography>
                ) : (
                  <Typography as="span" className="text-slate-400">
                    N/A
                  </Typography>
                )}
              </td>
              <td className="px-4 py-3 text-slate-200">
                {payload.customers.length > 0 ? (
                  <Typography as="span" className="italic">
                    {payload.customers.join(", ")}
                  </Typography>
                ) : (
                  <Typography as="span" className="text-slate-400">
                    N/A
                  </Typography>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
