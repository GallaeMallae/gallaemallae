"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/api/weather";
import { Coordinates } from "@/types/common";

export function useWeatherData(coords: Coordinates, enabled: boolean) {
  const { latitude, longitude } = coords;

  return useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => fetchWeather(latitude, longitude),
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}
