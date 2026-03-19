"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAirPollution } from "@/lib/api/weather";
import { Coordinates } from "@/types/common";
import { QUERY_KEYS } from "@/lib/constants";

export function useAirPollutionData(coords: Coordinates, enabled: boolean) {
  const { lat, lng } = coords;

  return useQuery({
    queryKey: QUERY_KEYS.AIR_POLLUTION(lat, lng),
    queryFn: () => fetchAirPollution(lat, lng),
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}
