"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchLocationName } from "@/lib/api/location";
import { Coordinates } from "@/types/common";

export function useLocationNameData(coords: Coordinates, enabled: boolean) {
  const { latitude, longitude } = coords;

  return useQuery({
    queryKey: ["locationName", latitude, longitude],
    queryFn: () => fetchLocationName(latitude, longitude),
    enabled,
    staleTime: Infinity,
  });
}
