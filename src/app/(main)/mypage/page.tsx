"use client";

import MypageProfileCard from "@/components/mypage/MypageProfileCard";
import MypageEventSectionCard from "@/components/mypage/MypageEventSectionCard";
import EventDetailModal from "@/components/map/EventDetailModal/EventDetailModal";
import MypageCalendarSection from "@/components/mypage/MypageCalendarSection";
import MypageWeatherCard from "@/components/mypage/MypageWeatherCard";
import MypageRecommendSection from "@/components/mypage/MypageRecommendSection";
import { useState } from "react";
import { parseSafeDate } from "@/utils/date";
import { useLikedEventsData } from "@/hooks/queries/useLikedEventsData";
import { usePlannedEventsData } from "@/hooks/queries/usePlannedEventsData";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { useMypageRecommendEventData } from "@/hooks/queries/useMypageRecommendEventData";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useLocationNameData } from "@/hooks/queries/useLocationNameData";
import { useLocationStore } from "@/stores/locationStore";

export default function Mypage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { data: profile } = useProfileData();
  const { coords, isInitialized } = useLocationStore();
  const { data: locationNameData } = useLocationNameData(coords, isInitialized);
  const { data: recommendEventData, isLoading: isRecommendEventCardLoading } =
    useMypageRecommendEventData(locationNameData);
  const { data: likedEvents, isLoading: isLikedEventLoading } =
    useLikedEventsData();
  const { data: plannedEvents, isLoading: isPlannedEventLoading } =
    usePlannedEventsData();

  const router = useRouter();

  const isPreparing = !locationNameData || !profile?.id;

  const handleDetailClick = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleEventClick = (dateString: string) => {
    const newDate = parseSafeDate(dateString);
    if (newDate) {
      const monthString = format(newDate, "yyyy-MM");
      router.push(`?date=${dateString}&month=${monthString}`, {
        scroll: false,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <MypageProfileCard />
        </div>

        <div className="grid grid-cols-1 gap-6 md:col-span-3 md:grid-cols-2">
          <MypageWeatherCard />
          <div className="flex h-full flex-col">
            <MypageRecommendSection
              recommendEventData={recommendEventData}
              isLoading={isPreparing || isRecommendEventCardLoading}
              likedEvents={likedEvents}
              plannedEvents={plannedEvents}
              onDetailClick={handleDetailClick}
            />
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
              isLoading={isPlannedEventLoading}
              events={plannedEvents ?? []}
              onEventClick={handleEventClick}
            />
          </div>
          <div className="min-h-0 md:flex-1">
            <MypageEventSectionCard
              title="나의 관심 목록"
              iconName="heart"
              iconClassName="text-red-500 fill-red-500"
              isLoading={isLikedEventLoading}
              events={likedEvents ?? []}
              onEventClick={handleEventClick}
            />
          </div>
        </div>
        <MypageCalendarSection
          plannedEvents={plannedEvents ?? []}
          profile={profile ?? undefined}
          onDetailClick={handleDetailClick}
        />
      </div>

      {selectedEventId && (
        <EventDetailModal
          eventId={selectedEventId ?? null}
          open={!!selectedEventId}
          onClose={() => setSelectedEventId(null)}
        />
      )}
    </div>
  );
}
