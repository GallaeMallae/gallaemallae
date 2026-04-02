"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchEventVisitRecommend } from "@/lib/api/recommend";
import {
  FetchForecastResponse,
  FetchAirPollutionResponse,
} from "@/types/apiResponse";
import { QUERY_KEYS } from "@/lib/constants";

interface EventWeatherData {
  forecast: FetchForecastResponse["list"][number];
  airPollution: FetchAirPollutionResponse["list"][number];
}

export function useEventVisitRecommendData(
  eventWeatherData?: EventWeatherData,
) {
  const weatherType = eventWeatherData?.forecast.weather[0].main;
  const temp = eventWeatherData
    ? Math.round(eventWeatherData.forecast.main.temp)
    : undefined;
  const wind = eventWeatherData
    ? Math.round(eventWeatherData.forecast.wind.speed)
    : undefined;
  const wet = eventWeatherData?.forecast.main.humidity;
  const pm10 = eventWeatherData?.airPollution.components.pm10;

  const enabled =
    weatherType !== undefined &&
    temp !== undefined &&
    pm10 !== undefined &&
    wind !== undefined &&
    wet !== undefined;

  return useQuery({
    queryKey: QUERY_KEYS.EVENT_VISIT_RECOMMEND(
      weatherType,
      temp,
      pm10,
      wind,
      wet,
    ),
    queryFn: () => {
      if (
        !weatherType ||
        temp == null ||
        pm10 == null ||
        wind == null ||
        wet == null
      ) {
        throw new Error("[OpenAI API] : 유효하지 않은 파라미터");
      }

      return fetchEventVisitRecommend(weatherType, temp, pm10, wind, wet);
    },
    enabled,
    staleTime: 1000 * 60 * 30,
    retry: false,
  });
}
