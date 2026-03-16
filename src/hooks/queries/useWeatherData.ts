"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/api/weather";
import { Coordinates } from "@/types/common";
import { QUERY_KEYS } from "@/lib/constants";

export function useWeatherData(coords: Coordinates, enabled: boolean) {
  const { latitude, longitude } = coords;

  return useQuery({
    queryKey: QUERY_KEYS.WEATHER(latitude, longitude),
    queryFn: () => fetchWeather(latitude, longitude),
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}
