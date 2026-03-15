"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchLocationName } from "@/lib/api/location";
import { Coordinates } from "@/types/common";
import { QUERY_KEYS } from "@/lib/constants";

export function useLocationNameData(coords: Coordinates, enabled: boolean) {
  const { latitude, longitude } = coords;

  return useQuery({
    queryKey: QUERY_KEYS.LOCATION_NAME(latitude, longitude),
    queryFn: () => fetchLocationName(latitude, longitude),
    enabled,
    staleTime: Infinity,
  });
}
