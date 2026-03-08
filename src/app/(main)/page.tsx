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
  WeatherCardItem,
  RecommendType,
  PeriodFilter,
} from "@/types/common";
import { MOCK_EVENTS } from "@/mocks/events";

export default function Home() {
  const router = useRouter();

  const [selectedPeriodTab, setSelectedPeriodTab] =
    useState<PeriodFilter>("전체");

  const weatherData: WeatherCardItem = {
    weatherType: "cloudy",
    location: "수원시 권선구",
    temperature: 4,
    fineDust: "좋음",
    ultrafineDust: "보통",
  };

  const recommendType: RecommendType = "positive";

  const handleMapClick = (mode: MapMode) => {
    router.push(`/map?mode=${mode}`);
  };

  const handleCategoryClick = (categoryId: CategoryId) => {
    router.push(`/map?category=${categoryId}`);
  };

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
