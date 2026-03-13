"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAirPollution } from "@/lib/api/weather";
import { Coordinates } from "@/types/common";

export function useAirPollutionData(coords: Coordinates, enabled: boolean) {
  const { latitude, longitude } = coords;

  return useQuery({
    queryKey: ["airPollution", latitude, longitude],
    queryFn: () => fetchAirPollution(latitude, longitude),
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}
