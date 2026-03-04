"use client";

import { Button } from "@/components/ui/button";
import RecommendCard from "@/components/common/RecommendCard";
import EventCard from "@/components/common/EventCard";
import MoreCard from "@/components/common/MoreCard";
import WeatherCard from "@/components/common/WeatherCard";
import PeriodFilterTabs from "@/components/common/PeriodFilterTabs";
import { useState } from "react";
import { PeriodFilter } from "@/types/common";
import { MOCK_EVENTS } from "@/mocks/events";
import { MOCK_WEATHER } from "@/mocks/weathers";

export default function Home() {
  const [currentPeriodTab, setCurrentPeriodTab] =
    useState<PeriodFilter>("전체");

  return (
    <div className="p-4">
      <p>갈래말래</p>
      <p className="font-semibold">갈래말래 세미볼드</p>
      <p className="font-bold">갈래말래 볼드</p>

      <br />

      {/* Headings 클래스명 작성 X - 태그만 써도 됨 */}
      <h1>갈래말래 h1</h1>
      <h2>갈래말래 h2</h2>
      <h3>갈래말래 h3</h3>

      {/* Body 클래스명 작성 O  */}
      <p className="text-title1">갈래말래 타이틀1</p>
      <p className="text-title2">갈래말래 타이틀2</p>
      <p className="text-desc1">갈래말래 본문1</p>
      <p className="text-desc2">갈래말래 본문1</p>
      <p className="text-caption">갈래말래</p>

      <br />

      <div className="mb-4 flex gap-2">
        <Button className="bg-symbol-sky-sub text-symbol-sky">Go</Button>
        <Button className="bg-symbol-brown">Go</Button>
        <Button className="bg-festival-sub text-festival">축제</Button>
        <Button className="bg-performance-sub text-performance">공연</Button>
        <Button className="bg-exhibition-sub text-exhibition">전시</Button>
        <Button className="bg-etc-sub text-etc">기타</Button>
      </div>

      <div className="mb-4 flex flex-col gap-4">
        <RecommendCard recommendType="veryPositive" />
        <RecommendCard recommendType="positive" />
        <RecommendCard recommendType="neutral" />
        <RecommendCard recommendType="negative" />
      </div>

      <div className="mb-4 flex flex-col gap-4">
        {MOCK_EVENTS.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            location={event.location}
            startDate={event.startDate}
            endDate={event.endDate}
            category={event.category}
            isLiked={event.isLiked}
          />
        ))}
        <MoreCard />
      </div>

      <div className="mb-4 flex flex-col gap-4">
        {MOCK_WEATHER.map((weather, index) => (
          <WeatherCard key={index} {...weather} />
        ))}
      </div>

      <div>
        <PeriodFilterTabs
          value={currentPeriodTab}
          onChange={setCurrentPeriodTab}
        />
      </div>
    </div>
  );
}
