"use client";

import MainBanner from "@/components/home/MainBanner";
import CategoryMenu from "@/components/home/CategoryMenu";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import NearEvents from "@/components/home/NearEvents";
import { useState } from "react";
import { useLocationStore } from "@/stores/locationStore";
import { useInitLocation } from "@/hooks/useInitLocation";
import { useWeatherData } from "@/hooks/queries/useWeatherData";
import { useLocationNameData } from "@/hooks/queries/useLocationNameData";
import { useAirPollutionData } from "@/hooks/queries/useAirPollutionData";
import { useRecommendTypeData } from "@/hooks/queries/useRecommendTypeData";
import { mapWeatherCard } from "@/utils/mapper";
import { PeriodFilter } from "@/types/common";
import { MOCK_EVENTS } from "@/mocks/events";

export default function Home() {
  useInitLocation();

  const { coords, isInitialized, isDefaultLocation } = useLocationStore();
  const { data: locationNameData } = useLocationNameData(coords, isInitialized);
  const { data: weatherData } = useWeatherData(coords, isInitialized);
  const { data: airPollutionData } = useAirPollutionData(coords, isInitialized);
  const { data: recommendTypeData, isLoading: isRecommendTypeLoading } =
    useRecommendTypeData(weatherData, airPollutionData);

  const [selectedPeriodTab, setSelectedPeriodTab] =
    useState<PeriodFilter>("전체");

  const isWeatherReady =
    !!locationNameData && !!weatherData && !!airPollutionData;
  const isWeatherLoading = !isWeatherReady;

  const weather = isWeatherReady
    ? mapWeatherCard(
        locationNameData,
        weatherData,
        airPollutionData,
        isDefaultLocation,
      )
    : null;

  const recommendType = recommendTypeData?.recommendType ?? null;

  return (
    <div className="flex flex-col gap-8">
      <MainBanner
        weather={weather}
        recommendType={recommendType}
        isWeatherCardLoading={isWeatherLoading}
        isRecommendCardLoading={isRecommendTypeLoading}
      />
      <CategoryMenu />
      <UpcomingEvents
        events={MOCK_EVENTS}
        period={selectedPeriodTab}
        onPeriodChange={setSelectedPeriodTab}
      />
      <NearEvents events={MOCK_EVENTS} />
    </div>
  );
}
