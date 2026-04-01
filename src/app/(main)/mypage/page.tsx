"use client";

import MypageEventRecommendCard from "@/components/mypage/MypageEventRecommendCard";
import MypageProfileCard from "@/components/mypage/MypageProfileCard";
import MypageEventSectionCard from "@/components/mypage/MypageEventSectionCard";
import EventDetailModal from "@/components/map/EventDetailModal/EventDetailModal";
import RecommendEventCardSkeleton from "@/components/common/skeleton/RecommendEventCardSkeleton";
import MypageCalendarSection from "@/components/mypage/MypageCalendarSection";
import { useState } from "react";
import { parseSafeDate } from "@/utils/date";
import { useLikedEventsData } from "@/hooks/queries/useLikedEventsData";
import { usePlannedEventsData } from "@/hooks/queries/usePlannedEventsData";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { useMypageRecommendEventData } from "@/hooks/queries/useMypageRecommendEventData";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import MypageWeatherCard from "@/components/mypage/MypageWeatherCard";
import { useLocationNameData } from "@/hooks/queries/useLocationNameData";
import { useLocationStore } from "@/stores/locationStore";

export default function Mypage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { data: profile } = useProfileData();
  const { coords, isInitialized, isDefaultLocation } = useLocationStore();
  const { data: locationNameData } = useLocationNameData(coords, isInitialized);

  const { data: recommendEventData, isLoading: isRecommendEventCardLoading } =
    useMypageRecommendEventData(locationNameData);
  const { data: likedEvents, isLoading: isLikedEventLoading } =
    useLikedEventsData();
  const { data: plannedEvents, isLoading: isPlannedEventLoading } =
    usePlannedEventsData();

  const router = useRouter();

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

  // 일정 목록 데이터 가공
  const formattedPlannedEvents = (plannedEvents ?? []).map((plan) => ({
    ...plan.event,
    display_date: plan.visit_date || plan.event.start_date,
    plan_id: plan.id,
  }));

  // 추천받은 행사를 일정에 추가했을 경우 planId를 props로 보내주기 위함
  const matchedPlan = formattedPlannedEvents.find(
    (plan) => plan.id === recommendEventData?.id,
  );
  const matchedPlanId = matchedPlan?.plan_id;

  // 행사 추천 카드 관심/일정 체크용
  const isLiked = (likedEvents ?? []).some(
    (event) => event.id === recommendEventData?.id,
  );
  const isPlanned = (plannedEvents ?? []).some(
    (plan) => plan.event.id === recommendEventData?.id,
  );

  const isPreparing = !locationNameData || !profile?.id;
  const showRecommendEventCardSkeleton =
    isPreparing || isRecommendEventCardLoading;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <MypageProfileCard />
        </div>

        <div className="grid grid-cols-1 gap-6 md:col-span-3 md:grid-cols-2">
          <MypageWeatherCard />
          <div className="flex h-full flex-col">
            {showRecommendEventCardSkeleton ? (
              <RecommendEventCardSkeleton />
            ) : recommendEventData ? (
              <MypageEventRecommendCard
                event={recommendEventData}
                isLiked={isLiked}
                isPlanned={isPlanned}
                planId={matchedPlanId}
                onDetailClick={handleDetailClick}
              />
            ) : (
              // 정말로 180일치 다 뒤졌는데 결과가 null일 때만 이게 나옴
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border bg-white p-6 shadow-sm">
                <p className="text-title1 text-etc font-bold">
                  새로운 추천 행사가 없습니다.
                </p>
                <p className="text-desc2 text-etc mt-1">
                  모든 행사를 확인하셨거나 조건에 맞는 행사가 없어요.
                </p>
              </div>
            )}
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
