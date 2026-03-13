"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocationStore } from "@/stores/locationStore";
import { fetchWeather } from "@/lib/api/weather";

export function useWeatherData() {
  const { coords } = useLocationStore();

  const latitude = coords?.latitude;
  const longitude = coords?.longitude;

  return useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => fetchWeather(latitude!, longitude!),
    enabled: !!coords,
    staleTime: 1000 * 60 * 10,
  });
}
