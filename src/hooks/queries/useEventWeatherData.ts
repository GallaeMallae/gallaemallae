"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchForecast, fetchAirPollution } from "@/lib/api/weather";
import { QUERY_KEYS } from "@/lib/constants";
import { isForecastAvailable, getClosestForecast } from "@/utils/forecast";

export function useEventWeatherData(
  lat: number | null,
  lng: number | null,
  date: string,
) {
  // 예보 가능 범위(5일) 여부 판단
  const canFetch = isForecastAvailable(date);

  return useQuery({
    queryKey: QUERY_KEYS.EVENT_WEATHER(lat, lng, date),
    queryFn: async () => {
      if (!lat || !lng || !date) {
        throw new Error("[OpenWeather API] : 유효하지 않은 파라미터");
      }

      const [forecast, airPollution] = await Promise.all([
        fetchForecast(lat, lng),
        fetchAirPollution(lat, lng),
      ]);

      // 행사 시작일과 가장 근접한 예보 데이터 선택
      const target = getClosestForecast(forecast.list, date);

      return {
        forecast: target,
        airPollution: airPollution.list[0],
      };
    },
    enabled: !!lat && !!lng && !!date && canFetch,
    staleTime: 1000 * 60 * 10,
  });
}
