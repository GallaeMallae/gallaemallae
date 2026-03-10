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
import { useInitLocation } from "@/hooks/useInitLocation";
import { useWeatherData } from "@/hooks/queries/useWeatherData";
import { MOCK_EVENTS } from "@/mocks/events";

export default function Home() {
  useInitLocation();
  const router = useRouter();
  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
  } = useWeatherData();

  const [selectedPeriodTab, setSelectedPeriodTab] =
    useState<PeriodFilter>("전체");

  const recommendType: RecommendType = "positive";

  const handleMapClick = (mode: MapMode) => {
    router.push(`/map?mode=${mode}`);
  };

  const handleCategoryClick = (categoryId: CategoryId) => {
    router.push(`/map?category=${categoryId}`);
  };

  if (isWeatherLoading || !weatherData) {
    return <div>날씨 정보 불러오는 중...</div>;
  }
  if (isWeatherError) {
    return <div>날씨 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <MainBanner
        weather={weatherData}
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
