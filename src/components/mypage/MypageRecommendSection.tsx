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
  likedEvents,
  plannedEvents,
  onDetailClick,
}: MypageRecommendSectionProps) {
  const isLiked = useMemo(() => {
    if (!recommendEventData) return false;
    return (likedEvents ?? []).some(
      (event) => event.id === recommendEventData.id,
    );
  }, [likedEvents, recommendEventData]);

  const matchedPlan = useMemo(() => {
    if (!recommendEventData) return undefined;
    return (plannedEvents ?? []).find(
      (plan) => plan.event.id === recommendEventData.id,
    );
  }, [plannedEvents, recommendEventData]);

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
