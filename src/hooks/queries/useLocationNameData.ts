"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocationStore } from "@/stores/locationStore";
import { fetchLocationName } from "@/lib/api/location";

export function useLocationNameData() {
  const { coords } = useLocationStore();

  const latitude = coords?.latitude;
  const longitude = coords?.longitude;

  return useQuery({
    queryKey: ["locationName", latitude, longitude],
    queryFn: () => fetchLocationName(latitude!, longitude!),
    enabled: !!coords,
    staleTime: Infinity,
  });
}
