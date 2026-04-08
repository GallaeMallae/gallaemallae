"use client";

import { EmptyStateCard } from "@/components/common/EmptyStateCard";
import RecommendEventCardSkeleton from "@/components/common/skeleton/RecommendEventCardSkeleton";
import MypageEventRecommendCard from "@/components/mypage/MypageEventRecommendCard";
import { Event, EventPlanWithEvent } from "@/types/common";
import { TicketX } from "lucide-react";
import { useMemo } from "react";

interface MypageRecommendSectionProps {
  recommendEventData?: Event | null;
  isLoading: boolean;
  likedEvents?: Event[];
  plannedEvents?: EventPlanWithEvent[];
  onDetailClick: (id: string) => void;
}

export default function MypageRecommendSection({
  recommendEventData,
  isLoading,
  likedEvents = [],
  plannedEvents = [],
  onDetailClick,
}: MypageRecommendSectionProps) {
  const likedEventIds = useMemo(
    () => new Set(likedEvents.map((e) => e.id)),
    [likedEvents],
  );
  const planMap = useMemo(
    () => new Map(plannedEvents.map((p) => [p.event.id, p])),
    [plannedEvents],
  );

  const { isLiked, matchedPlan } = useMemo(() => {
    if (!recommendEventData) return { isLiked: false, matchedPlan: undefined };

    return {
      isLiked: likedEventIds.has(recommendEventData.id),
      matchedPlan: planMap.get(recommendEventData.id),
    };
  }, [recommendEventData, likedEventIds, planMap]);

  const isPlanned = !!matchedPlan;
  const matchedPlanId = matchedPlan?.id;

  if (isLoading || recommendEventData === undefined) {
    return <RecommendEventCardSkeleton />;
  }

  if (recommendEventData === null) {
    return (
      <EmptyStateCard
        icon={TicketX}
        title="새로운 추천 행사가 없습니다."
        description="모든 행사를 확인하셨거나 조건에 맞는 행사가 없어요."
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <MypageEventRecommendCard
        event={recommendEventData}
        isLiked={isLiked}
        isPlanned={isPlanned}
        planId={matchedPlanId}
        onDetailClick={onDetailClick}
      />
    </div>
  );
}
