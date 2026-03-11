"use client";

import MainBanner from "@/components/home/MainBanner";
import CategoryMenu from "@/components/home/CategoryMenu";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import NearEvents from "@/components/home/NearEvents";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MapMode,
  CategoryId,
  RecommendType,
  PeriodFilter,
} from "@/types/common";
import { useLocationStore } from "@/stores/locationStore";
import { useInitLocation } from "@/hooks/useInitLocation";
import { useWeatherData } from "@/hooks/queries/useWeatherData";
import { useLocationNameData } from "@/hooks/queries/useLocationNameData";
import { useAirPollutionData } from "@/hooks/queries/useAirPollutionData";
import { mapWeatherCard } from "@/utils/mapper";
import { MOCK_EVENTS } from "@/mocks/events";

export default function Home() {
  useInitLocation();

  const router = useRouter();
  const { isDefaultLocation } = useLocationStore();
  const { data: locationNameData } = useLocationNameData();
  const { data: weatherData } = useWeatherData();
  const { data: airPollutionData } = useAirPollutionData();

  const [selectedPeriodTab, setSelectedPeriodTab] =
    useState<PeriodFilter>("전체");

  const recommendType: RecommendType = "positive";

  const handleMapClick = (mode: MapMode) => {
    router.push(`/map?mode=${mode}`);
  };

  const handleCategoryClick = (categoryId: CategoryId) => {
    router.push(`/map?category=${categoryId}`);
  };

  if (!weatherData || !locationNameData || !airPollutionData) {
    return <div>날씨 정보 불러오는 중...</div>;
  }

  const weather = mapWeatherCard(
    locationNameData,
    weatherData,
    airPollutionData,
    isDefaultLocation,
  );

  return (
    <div className="flex flex-col gap-8">
      <MainBanner
        weather={weather}
        recommendType={recommendType}
        onMapAllClick={() => handleMapClick("all")}
        onMapNearClick={() => handleMapClick("near")}
      />
      <CategoryMenu onSelectCategory={handleCategoryClick} />
      <UpcomingEvents
        events={MOCK_EVENTS}
        period={selectedPeriodTab}
        onPeriodChange={setSelectedPeriodTab}
      />
      <NearEvents events={MOCK_EVENTS} />
    </div>
  );
}
