"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocationStore } from "@/stores/locationStore";
import { fetchAirPollution } from "@/lib/api/weather";

export function useAirPollutionData() {
  const { coords } = useLocationStore();

  const latitude = coords?.latitude;
  const longitude = coords?.longitude;

  return useQuery({
    queryKey: ["airPollution", latitude, longitude],
    queryFn: () => fetchAirPollution(latitude!, longitude!),
    enabled: !!coords,
    staleTime: 1000 * 60 * 10,
  });
}
