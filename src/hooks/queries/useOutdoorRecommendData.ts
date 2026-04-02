"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchOutdoorRecommend } from "@/lib/api/recommend";
import {
  FetchWeatherResponse,
  FetchAirPollutionResponse,
} from "@/types/apiResponse";
import { QUERY_KEYS } from "@/lib/constants";

export function useOutdoorRecommendData(
  weatherData?: FetchWeatherResponse,
  airPollutionData?: FetchAirPollutionResponse,
) {
  const weatherType = weatherData?.weather[0].main;
  const temp = weatherData?.main.temp;
  const pm10 = airPollutionData?.list[0].components.pm10;
  const pm25 = airPollutionData?.list[0].components.pm2_5;

  const enabled =
    weatherType !== undefined &&
    temp !== undefined &&
    pm10 !== undefined &&
    pm25 !== undefined;

  return useQuery({
    queryKey: QUERY_KEYS.OUTDOOR_RECOMMEND(weatherType, temp, pm10, pm25),
    queryFn: () => {
      if (!weatherType || temp == null || pm10 == null || pm25 == null) {
        throw new Error("[OpenAI API] : 유효하지 않은 파라미터");
      }

      return fetchOutdoorRecommend(weatherType, temp, pm10, pm25);
    },
    enabled,
    staleTime: 1000 * 60 * 30,
    retry: false,
  });
}
