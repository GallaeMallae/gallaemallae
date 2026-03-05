"use client";

import MainBanner from "@/components/home/MainBanner";
import CategoryMenu from "@/components/home/CategoryMenu";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import { useState } from "react";
import { WeatherCardItem, RecommendType, PeriodFilter } from "@/types/common";
import { MOCK_EVENTS } from "@/mocks/events";

export default function Home() {
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

  return (
    <div className="flex flex-col gap-8">
      <MainBanner weather={weatherData} recommendType={recommendType} />
      <CategoryMenu />
      <UpcomingEvents
        events={MOCK_EVENTS}
        period={selectedPeriodTab}
        onPeriodChange={setSelectedPeriodTab}
      />
    </div>
  );
}
