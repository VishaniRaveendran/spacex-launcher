import { BASE_URL } from "@/constants";
import axios, { AxiosError, AxiosResponse } from "axios";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export async function fetchAllLaunchYears(): Promise<string[]> {
  const res = await apiClient.get("/launches");
  const launches = res.data;
  const years = Array.from(
    new Set(
      launches
        .map((l: { date_utc: string }) => l.date_utc?.slice(0, 4))
        .filter(
          (y: string | undefined): y is string => !!y && !isNaN(Number(y))
        )
    )
  ).sort((a, b) => Number(a) - Number(b));
  return years as string[];
}

export async function fetchFilteredLaunchCount(
  year?: string,
  success?: boolean
): Promise<number> {
  const res = await apiClient.get("/launches");
  let launches = Array.isArray(res.data) ? res.data : [];
  if (year && year !== "All Years") {
    launches = launches.filter((l: { date_utc: string }) =>
      l.date_utc.startsWith(year)
    );
  }
  if (typeof success === "boolean") {
    launches = launches.filter(
      (l: { success: boolean }) => l.success === success
    );
  }
  return launches.length;
}

export async function fetchTotalLaunchCount(): Promise<number> {
  const res = await apiClient.get("/launches");
  return Array.isArray(res.data) ? res.data.length : 0;
}
