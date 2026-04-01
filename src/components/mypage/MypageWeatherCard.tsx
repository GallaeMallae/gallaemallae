"use client";

import { EmptyStateCard } from "@/components/common/EmptyStateCard";
import WeatherCardSkeleton from "@/components/common/skeleton/WeatherCardSkeleton";
import WeatherCard from "@/components/common/WeatherCard";
import { useAirPollutionData } from "@/hooks/queries/useAirPollutionData";
import { useLocationNameData } from "@/hooks/queries/useLocationNameData";
import { useWeatherData } from "@/hooks/queries/useWeatherData";
import { useLocationStore } from "@/stores/locationStore";
import { mapWeatherCard } from "@/utils/mapper";
import { CloudOff } from "lucide-react";
import { useMemo } from "react";

export default function MypageWeatherCard() {
  const { coords, isInitialized, isDefaultLocation } = useLocationStore();
  const { data: locationNameData, isError: isLocationError } =
    useLocationNameData(coords, isInitialized);
  const { data: weatherData, isError: isWeatherError } = useWeatherData(
    coords,
    isInitialized,
  );
  const { data: airPollutionData, isError: isAirError } = useAirPollutionData(
    coords,
    isInitialized,
  );

  const isWeatherReady =
    !!locationNameData && !!weatherData && !!airPollutionData;
  const hasError = isLocationError || isWeatherError || isAirError;

  const weather = useMemo(() => {
    if (!isWeatherReady) return null;
    return mapWeatherCard(
      locationNameData,
      weatherData,
      airPollutionData,
      isDefaultLocation,
    );
  }, [
    locationNameData,
    weatherData,
    airPollutionData,
    isDefaultLocation,
    isWeatherReady,
  ]);

  if (hasError) {
    return (
      <EmptyStateCard
        icon={CloudOff}
        title={"날씨 정보를 불러올 수 없습니다."}
        description={"위치 권한이나 네트워크 상태를 확인해 주세요."}
      />
    );
  }

  if (!weather) return <WeatherCardSkeleton />;

  return <WeatherCard {...weather} />;
}
