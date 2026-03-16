"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAirPollution } from "@/lib/api/weather";
import { Coordinates } from "@/types/common";
import { QUERY_KEYS } from "@/lib/constants";

export function useAirPollutionData(coords: Coordinates, enabled: boolean) {
  const { latitude, longitude } = coords;

  return useQuery({
    queryKey: QUERY_KEYS.AIR_POLLUTION(latitude, longitude),
    queryFn: () => fetchAirPollution(latitude, longitude),
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}
