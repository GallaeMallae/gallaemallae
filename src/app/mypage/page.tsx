"use client";

import { useState } from "react";
import { MypageCalendar } from "@/components/mypage/MypageCalendar";
import { MOCK_WEATHER } from "@/mocks/weathers";
import { MOCK_EVENTS } from "@/mocks/events";
import WeatherCard from "@/components/common/WeatherCard";
import MyPageEventRecommendCard from "@/components/mypage/MyPageEventRecommendCard";
import MypageProfileCard from "@/components/mypage/MypageProfileCard";
import MypageEventSectionCard from "@/components/mypage/MyPageEventSectionCard";
import MypageSelectedDateEventsCard from "@/components/mypage/MypageSelectedDateEventsCard";

export default function Mypage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [month, setMonth] = useState<Date>(new Date());

  const handleEventClick = (dateString: string) => {
    const newDate = new Date(dateString);
    setSelectedDate(newDate);
    setMonth(newDate);
  };

  const selectedDateString = selectedDate
    ? selectedDate.toLocaleDateString("en-CA")
    : "";

  const dailyEvents = MOCK_EVENTS.filter(
    (event) => event.startDate === selectedDateString,
  );

  const weatherData = MOCK_WEATHER[1];
  const eventData = MOCK_EVENTS[1];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MypageProfileCard />
        <WeatherCard {...weatherData} />
        <div className="hidden md:block">
          <MyPageEventRecommendCard {...eventData} />
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">
        <div className="flex flex-col gap-6 lg:col-span-1">
          <MypageEventSectionCard
            title="나의 일정 목록"
            iconName="bookmark"
            iconClassName="text-symbol-sky"
            events={MOCK_EVENTS}
            onEventClick={handleEventClick}
          />
          <MypageEventSectionCard
            title="나의 관심 목록"
            iconName="heart"
            iconClassName="text-red-500"
            events={MOCK_EVENTS}
            onEventClick={handleEventClick}
          />
        </div>

        <div className="rounded-xl bg-white p-6 shadow lg:col-span-3">
          <MypageCalendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            month={month}
            onMonthChange={setMonth}
          />
        </div>
        {dailyEvents.length > 0 && (
          <MypageSelectedDateEventsCard
            selectedDate={selectedDate}
            events={dailyEvents}
          />
        )}
      </div>
    </div>
  );
}
