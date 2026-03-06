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

  const dailyEvents = MOCK_EVENTS.filter((event) => {
    return (
      selectedDateString >= event.startDate &&
      selectedDateString <= event.endDate
    );
  });

  const weatherData = MOCK_WEATHER[1];
  const eventData = MOCK_EVENTS[1];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <MypageProfileCard />
        </div>

        <div className="grid grid-cols-1 gap-6 md:col-span-3 md:grid-cols-2">
          <WeatherCard {...weatherData} />
          <div className="hidden md:block">
            <MyPageEventRecommendCard {...eventData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:items-stretch">
        <div className="order-2 flex flex-col gap-6 lg:order-1 lg:col-span-1 lg:h-0 lg:min-h-full">
          <div className="min-h-0 lg:flex-1">
            <MypageEventSectionCard
              title="나의 일정 목록"
              iconName="bookmark"
              iconClassName="text-symbol-sky fill-symbol-sky"
              events={MOCK_EVENTS}
              onEventClick={handleEventClick}
            />
          </div>
          <div className="min-h-0 lg:flex-1">
            <MypageEventSectionCard
              title="나의 관심 목록"
              iconName="heart"
              iconClassName="text-red-500 fill-red-500"
              events={MOCK_EVENTS}
              onEventClick={handleEventClick}
            />
          </div>
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-2 lg:col-span-3">
          <div className="flex-1 rounded-2xl border bg-white p-6 shadow-sm">
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
    </div>
  );
}
