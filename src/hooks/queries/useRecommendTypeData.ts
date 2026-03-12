import { useQuery } from "@tanstack/react-query";
import { fetchRecommendType } from "@/lib/api/recommend";
import {
  FetchWeatherResponse,
  FetchAirPollutionResponse,
} from "@/types/apiResponse";

export function useRecommendTypeData(
  weatherData?: FetchWeatherResponse,
  airPollutionData?: FetchAirPollutionResponse,
) {
  const weatherType = weatherData?.weather[0].main;
  const temp = weatherData?.main.temp;
  const pm10 = airPollutionData?.list[0].components.pm10;
  const pm25 = airPollutionData?.list[0].components.pm2_5;

  return useQuery({
    queryKey: ["recommendType", weatherType, temp, pm10, pm25],
    queryFn: () => {
      if (!weatherType || temp == null || pm10 == null || pm25 == null) {
        throw new Error("[OpenAI API] : 유효하지 않은 파라미터");
      }

      return fetchRecommendType(weatherType, temp, pm10, pm25);
    },
    enabled: !!weatherData && !!airPollutionData,
    staleTime: 1000 * 60 * 30,
    retry: false,
  });
}
