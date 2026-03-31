"use client";

import { Button } from "@/components/ui/button";
import { useDeleteEventPlan } from "@/hooks/mutations/useDeleteEventPlan";
import { useEventLike } from "@/hooks/mutations/useEventLike";
import { useEventPlan } from "@/hooks/mutations/useEventPlan";
import { useLikedEventsData } from "@/hooks/queries/useLikedEventsData";
import { usePlannedEventsData } from "@/hooks/queries/usePlannedEventsData";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { cn } from "@/lib/utils";
import { ArrowRight, Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useOpenAlertModal } from "@/stores/alertModalStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Event } from "@/types/common";

type EventDetailModalButtonProps = {
  event: Event;
};

export default function EventDetailModalButton({
  event,
}: EventDetailModalButtonProps) {
  const { data: profile } = useProfileData();
  const { data: likedEvents = [] } = useLikedEventsData();
  const { data: plannedEvents = [] } = usePlannedEventsData();

  const { mutate: toggleLike } = useEventLike(event.id);
  const { mutate: addPlan, isPending: isPlanLoading } = useEventPlan();
  const { mutate: deletePlan, isPending: isDeletePlanLoading } =
    useDeleteEventPlan();

  const openAlert = useOpenAlertModal();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isLiked = likedEvents.some((e) => e.id === event.id);
  const matchedPlan = plannedEvents.find((plan) => plan.event.id === event.id);
  const isPlanned = !!matchedPlan;
  const planId = matchedPlan?.id;

  const handleNeedLogin = () => {
    const currentPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    openAlert({
      title: "로그인이 필요한 기능입니다.",
      description: "로그인 페이지로 이동하시겠습니까?",
      onAction: () => {
        router.push(`/login?next=${encodeURIComponent(currentPath)}`);
      },
    });
  };

  const handleLikeClick = () => {
    if (!profile?.id) {
      handleNeedLogin();
      return;
    }

    toggleLike(isLiked);
  };

  const handleAddPlan = () => {
    if (!profile?.id) {
      handleNeedLogin();
      return;
    }

    const startDate = event.start_date;
    const userId = profile.id;
    if (!startDate) {
      return toast.error("행사 시작일 정보가 없어 일정을 추가할 수 없습니다.");
    }

    openAlert({
      title: "나의 일정에 추가하기",
      description: `${event.name}를 일정에 추가하시겠습니까?`,
      onAction: () =>
        addPlan({
          userId: userId,
          eventId: event.id,
          visitDate: startDate,
        }),
    });
  };

  const handleDeletePlan = () => {
    if (!planId) return;

    openAlert({
      title: "일정에서 제거하기",
      description: `${event.name}를 일정에서 제거하시겠습니까?`,
      onAction: () => deletePlan(planId),
    });
  };

  return (
    <div className="flex items-center gap-4">
      {isPlanned ? (
        <Button
          className="bg-destructive hover:bg-destructive/80 flex h-10 flex-1 font-bold"
          onClick={handleDeletePlan}
          disabled={isDeletePlanLoading}
        >
          일정에서 제거하기
          <Trash2 size={20} className="ml-2" />
        </Button>
      ) : (
        <Button
          className="bg-symbol-sky hover:bg-symbol-sky/80 flex h-10 flex-1 font-bold text-white"
          onClick={handleAddPlan}
          disabled={isPlanLoading}
        >
          나의 일정에 추가하기
          <ArrowRight size={20} className="ml-2" />
        </Button>
      )}

      <Button
        variant="ghost"
        size="icon"
        aria-label="좋아요"
        aria-pressed={isLiked}
        className="size-8 p-0"
        onClick={handleLikeClick}
      >
        <Heart
          className={cn(
            "size-6 md:size-8",
            isLiked ? "fill-red-500 text-red-500" : "text-etc",
          )}
        />
      </Button>
    </div>
  );
}
