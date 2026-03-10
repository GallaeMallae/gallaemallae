import { useQuery } from "@tanstack/react-query";
import { useLocationStore } from "@/stores/locationStore";
import { fetchWeather } from "@/lib/api/weather";
import { mapWeatherType } from "@/utils/mapWeatherType";
import { WeatherCardItem } from "@/types/common";

export function useWeatherData() {
  const { coords } = useLocationStore();

  const latitude = coords?.latitude;
  const longitude = coords?.longitude;

  return useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: async (): Promise<WeatherCardItem> => {
      const weather = await fetchWeather(latitude!, longitude!);

      return {
        weatherType: mapWeatherType(weather.weather[0].main),
        location: weather.name,
        temperature: Math.round(weather.main.temp),
        // Todo: Air Pollution API
        fineDust: "좋음",
        ultrafineDust: "보통",
      };
    },
    enabled: !!coords,
    staleTime: 1000 * 60 * 10,
  });
}
