"use client";

import WeatherCard from "@/components/common/WeatherCard";
import MyPageEventRecommendCard from "@/components/mypage/MyPageEventRecommendCard";
import MypageProfileCard from "@/components/mypage/MypageProfileCard";
import MypageEventSectionCard from "@/components/mypage/MyPageEventSectionCard";
import MypageSelectedDateEventsCard from "@/components/mypage/MypageSelectedDateEventsCard";
import WeatherCardSkeleton from "@/components/common/skeleton/WeatherCardSkeleton";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useState } from "react";
import { MOCK_EVENTS } from "@/mocks/events";
import { parseSafeDate } from "@/utils/date";
import { isWithinInterval, parseISO, startOfDay } from "date-fns";
import { useLocationStore } from "@/stores/locationStore";
import { useLocationNameData } from "@/hooks/queries/useLocationNameData";
import { useWeatherData } from "@/hooks/queries/useWeatherData";
import { useAirPollutionData } from "@/hooks/queries/useAirPollutionData";
import { mapWeatherCard } from "@/utils/mapper";
import { useLikedEventsData } from "@/hooks/queries/useLikedEventsData";
import { usePlannedEventsData } from "@/hooks/queries/usePlannedEventsData";
import { useProfileData } from "@/hooks/queries/useProfileData";

export default function Mypage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [month, setMonth] = useState<Date>(new Date());

  const { coords, isInitialized, isDefaultLocation } = useLocationStore();
  const { data: locationNameData } = useLocationNameData(coords, isInitialized);
  const { data: weatherData } = useWeatherData(coords, isInitialized);
  const { data: airPollutionData } = useAirPollutionData(coords, isInitialized);

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

  const { data: profile } = useProfileData();

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

  const eventData = MOCK_EVENTS[1];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <MypageProfileCard />
        </div>

        <div className="grid grid-cols-1 gap-6 md:col-span-3 md:grid-cols-2">
          {isWeatherLoading || !weather ? (
            <WeatherCardSkeleton />
          ) : (
            <WeatherCard {...weather} />
          )}
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
          <div className="xs:p-6 flex-1 rounded-2xl border bg-white p-4 shadow-sm">
            <Calendar
              mode="single"
              selected={selectedDate}
              month={month}
              onSelect={setSelectedDate}
              onMonthChange={setMonth}
              nickname={profile?.nickname ?? undefined}
              captionLayout="dropdown"
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
