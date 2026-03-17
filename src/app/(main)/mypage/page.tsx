"use client";

import { MypageCalendar } from "@/components/mypage/MypageCalendar";
import WeatherCard from "@/components/common/WeatherCard";
import MyPageEventRecommendCard from "@/components/mypage/MyPageEventRecommendCard";
import MypageProfileCard from "@/components/mypage/MypageProfileCard";
import MypageEventSectionCard from "@/components/mypage/MyPageEventSectionCard";
import MypageSelectedDateEventsCard from "@/components/mypage/MypageSelectedDateEventsCard";
import { toast } from "sonner";
import { useState } from "react";
import { MOCK_WEATHER } from "@/mocks/weathers";
import { MOCK_EVENTS } from "@/mocks/events";
import { parseSafeDate } from "@/utils/date";
import { isWithinInterval, parseISO, startOfDay } from "date-fns";
import { useLikedEventsData } from "@/hooks/queries/useLikedEventsData";
import { usePlannedEventsData } from "@/hooks/queries/usePlannedEventsData";

export default function Mypage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [month, setMonth] = useState<Date>(new Date());

  const handleEventClick = (dateString: string) => {
    const newDate = parseSafeDate(dateString);

    if (newDate) {
      setSelectedDate(newDate);
      setMonth(newDate);
    } else {
      console.error("Invalid date string provided:", dateString);
      toast.error("유효하지 않은 날짜 형식입니다.");
    }
  };

  const { data: likedEvents = [] } = useLikedEventsData();
  const { data: plannedEvents = [] } = usePlannedEventsData();

  // 관심 목록 데이터 가공
  const formattedLikedEvents = likedEvents.map((event) => ({
    ...event,
    display_date: event.start_date,
  }));
  // 일정 목록 데이터 가공
  const formattedPlannedEvents = plannedEvents.map((plan) => ({
    ...plan.event,
    display_date: plan.visit_date || plan.event.start_date,
    plan_id: plan.id,
  }));

  const dailyEvents = formattedPlannedEvents.filter((event) => {
    if (!selectedDate) return false;

    const targetDate = startOfDay(selectedDate);
    const startDate = parseISO(event.start_date);
    const endDate = parseISO(event.end_date);

    // 선택일이 행사 시작일과 종료일 사이에 있는지 확인
    return isWithinInterval(targetDate, { start: startDate, end: endDate });
  });

  const weatherData = MOCK_WEATHER[1];
  const eventData = MOCK_EVENTS[1];

  return (
    <div className="flex flex-col gap-6">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:items-stretch">
        <div className="order-2 flex flex-col gap-6 md:order-1 md:col-span-1 md:h-0 md:min-h-full">
          <div className="min-h-0 md:flex-1">
            <MypageEventSectionCard
              title="나의 일정 목록"
              iconName="bookmark"
              iconClassName="text-symbol-sky fill-symbol-sky"
              events={formattedPlannedEvents}
              onEventClick={handleEventClick}
            />
          </div>
          <div className="min-h-0 md:flex-1">
            <MypageEventSectionCard
              title="나의 관심 목록"
              iconName="heart"
              iconClassName="text-red-500 fill-red-500"
              events={formattedLikedEvents}
              onEventClick={handleEventClick}
            />
          </div>
        </div>

        <div className="order-1 flex flex-col gap-6 md:order-2 md:col-span-3">
          <div className="flex-1 rounded-2xl border bg-white p-6 shadow-sm">
            <MypageCalendar
              plannedEvents={formattedPlannedEvents}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              month={month}
              onMonthChange={setMonth}
            />
          </div>

          {selectedDate && dailyEvents.length > 0 && (
            <MypageSelectedDateEventsCard
              selectedDate={selectedDate}
              events={dailyEvents}
              displayMode="mobile"
            />
          )}
        </div>
      </div>
    </div>
  );
}
