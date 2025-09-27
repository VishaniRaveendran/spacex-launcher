import { Launch, Rocket, Launchpad, Payload } from "@/types/types";
import {
  LAUNCHES_API,
  ROCKET_API_BASE,
  LAUNCHPAD_API_BASE,
  PAYLOAD_API_BASE,
} from "@/constants";
import { useState, useEffect, useCallback } from "react";

type LaunchDetails = Launch & {
  rocket_details?: Rocket & {
    height?: { meters: number; feet: number };
    mass?: { kg: number };
  };
  launchpad_details?: Launchpad & { status?: string };
  payload_details?: Payload[];
};

export function useLaunchDetails(launchId: string | undefined) {
  const [launch, setLaunch] = useState<LaunchDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLaunchDetails = useCallback(
    async (abortSignal?: AbortSignal) => {
      setLoading(true);
      if (!launchId) {
        setLaunch(null);
        setLoading(false);
        return;
      }

      try {
        setError(null);

        // Fetch launch details
        const launchResponse = await fetch(`${LAUNCHES_API}/${launchId}`, {
          signal: abortSignal,
        });

        if (!launchResponse.ok) {
          throw new Error("Failed to fetch launch details");
        }

        const launchData: Launch = await launchResponse.json();

        // Fetch related data in parallel
        const [rocketResponse, launchpadResponse, ...payloadResponses] =
          await Promise.all([
            fetch(`${ROCKET_API_BASE}${launchData.rocket}`, {
              signal: abortSignal,
            }),
            fetch(`${LAUNCHPAD_API_BASE}${launchData.launchpad}`, {
              signal: abortSignal,
            }),
            ...launchData.payloads.map((payloadId: string) =>
              fetch(`${PAYLOAD_API_BASE}${payloadId}`, {
                signal: abortSignal,
              })
            ),
          ]);

        // Ensure all required fields are present for type compatibility
        const rocketRaw = await rocketResponse.json();
        // Merge Rocket API type with extra fields for UI compatibility
        const rocket: Rocket & {
          height?: { meters: number; feet: number };
          mass?: { kg: number };
        } = {
          ...rocketRaw,
          height: rocketRaw.height || { meters: 0, feet: 0 },
          mass: rocketRaw.mass || { kg: 0 },
        };

        const launchpadRaw = await launchpadResponse.json();
        // Merge Launchpad API type with status for UI compatibility
        const launchpad: Launchpad & { status?: string } = {
          ...launchpadRaw,
          status: (launchpadRaw.status as string) || "unknown",
        };

        const payloadsRaw = await Promise.all(
          (payloadResponses as Response[]).map((response) => response.json())
        );
        const payloads: Payload[] = payloadsRaw.map((p) => ({
          name: p.name ?? "",
          type: p.type ?? "",
          launch: p.launch ?? "",
          customers: p.customers ?? [],
          mass_kg: p.mass_kg ?? null,
          orbit: p.orbit ?? "",
          id: p.id ?? "",
        }));

        setLaunch({
          ...launchData,
          rocket_details: rocket,
          launchpad_details: launchpad,
          payload_details: payloads,
        });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [launchId]
  );

  const retry = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchLaunchDetails();
  }, [fetchLaunchDetails]);

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    fetchLaunchDetails(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetchLaunchDetails]);

  return {
    launch,
    loading,
    error,
    retry,
  };
}
