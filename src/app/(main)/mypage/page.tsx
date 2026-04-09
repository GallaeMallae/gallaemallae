"use client";

import MypageProfileCard from "@/components/mypage/MypageProfileCard";
import MypageEventSectionCard from "@/components/mypage/MypageEventSectionCard";
import EventDetailModal from "@/components/map/EventDetailModal/EventDetailModal";
import MypageCalendarSection from "@/components/mypage/MypageCalendarSection";
import MypageWeatherSection from "@/components/mypage/MypageWeatherSection";
import MypageRecommendSection from "@/components/mypage/MypageRecommendSection";
import MypageEventCardSkeleton from "@/components/common/skeleton/MypageEventCardSkeleton";
import { Suspense, useState } from "react";
import { useLikedEventsData } from "@/hooks/queries/useLikedEventsData";
import { usePlannedEventsData } from "@/hooks/queries/usePlannedEventsData";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { useMypageRecommendEventData } from "@/hooks/queries/useMypageRecommendEventData";
import { useLocationNameData } from "@/hooks/queries/useLocationNameData";
import { useLocationStore } from "@/stores/locationStore";
import { useRouter } from "next/navigation";

export default function Mypage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { data: profile } = useProfileData();
  const { coords, isInitialized, isDefaultLocation } = useLocationStore();
  const {
    data: locationNameData,
    isError: isLocationError,
    isLoading: isLocationLoading,
  } = useLocationNameData(coords, isInitialized);
  const { data: recommendEventData, isLoading: isRecommendEventCardLoading } =
    useMypageRecommendEventData(locationNameData);
  const { data: likedEvents, isLoading: isLikedEventLoading } =
    useLikedEventsData();
  const { data: plannedEvents, isLoading: isPlannedEventLoading } =
    usePlannedEventsData();

  const router = useRouter();

  const weatherLocationInfo = {
    coords,
    isInitialized,
    locationNameData,
    isLocationError,
    isLoading: isLocationLoading,
    isDefaultLocation,
  };

  const isRecommendSectionLoading =
    !profile?.id ||
    !locationNameData ||
    isRecommendEventCardLoading ||
    isLikedEventLoading ||
    isPlannedEventLoading;

  const handleDetailClick = (eventId: string) => {
    setSelectedEventId(eventId);

    const params = new URLSearchParams(window.location.search);
    params.delete("date");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <MypageProfileCard />
        </div>
        <div className="grid grid-cols-1 gap-6 md:col-span-3 md:grid-cols-2">
          <MypageWeatherSection {...weatherLocationInfo} />
          <MypageRecommendSection
            recommendEventData={recommendEventData}
            isLoading={isRecommendSectionLoading}
            likedEvents={likedEvents}
            plannedEvents={plannedEvents}
            onDetailClick={handleDetailClick}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-4 md:items-stretch">
        <aside className="order-2 flex flex-col gap-6 md:order-1 md:col-span-1 md:h-0 md:min-h-full">
          <Suspense
            fallback={
              <div className="bg-muted min-h-100 w-full animate-pulse rounded-2xl" />
            }
          >
            <MypageEventSectionCard
              title="일정 목록"
              iconName="bookmark"
              iconClassName="text-symbol-sky fill-symbol-sky"
              isLoading={isPlannedEventLoading}
              events={plannedEvents ?? []}
            />
            <MypageEventSectionCard
              title="관심 목록"
              iconName="heart"
              iconClassName="text-red-500 fill-red-500"
              isLoading={isLikedEventLoading}
              events={likedEvents ?? []}
            />
          </Suspense>
        </aside>
        <div className="order-1 md:order-2 md:col-span-3">
          <MypageCalendarSection
            plannedEvents={plannedEvents ?? []}
            likedEvents={likedEvents ?? []}
            profile={profile ?? undefined}
            onDetailClick={handleDetailClick}
          />
        </div>
      </section>

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
