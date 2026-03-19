import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateRange } from "@/utils/date";
import { Event } from "@/types/common";
import { CATEGORY_NAME_MAP } from "@/lib/constants";
import { useEventLike } from "@/hooks/mutations/useEventLike";
import { useEventPlan } from "@/hooks/mutations/useEventPlan";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { toast } from "sonner";
import { useDeleteEventPlan } from "@/hooks/mutations/useDeleteEventPlan";

interface MyPageEventRecommendCardProps {
  event: Event;
  isLiked: boolean;
  isPlanned: boolean;
  planId?: string;
}

export default function MyPageEventRecommendCard({
  event,
  isLiked,
  isPlanned,
  planId,
}: MyPageEventRecommendCardProps) {
  const { data: profile } = useProfileData();

  const { mutate: toggleLike } = useEventLike(event.id);
  const { mutate: addPlan, isPending: isPlanLoading } = useEventPlan();
  const { mutate: deletePlan, isPending: isDeletePlanLoading } =
    useDeleteEventPlan();

  const handleLikeClick = () => {
    // 현재 좋아요 상태를 넘겨주면 훅 내부 로직에 따라 delete/insert 처리
    toggleLike(isLiked);
  };

  const handleAddPlanClick = () => {
    if (!profile?.id) return toast.error("로그인이 필요합니다.");

    addPlan({
      userId: profile.id,
      eventId: event.id,
      visitDate: event.start_date, // 현재 단계에서는 기본값으로 행사 시작일 설정
    });
  };

  const handleDeletePlanClick = () => {
    if (!profile?.id) return toast.error("로그인이 필요합니다.");
    if (!planId) return;

    deletePlan(planId);
  };

  return (
    <Card className="relative flex-1 rounded-2xl border">
      <CardContent>
        <Button
          className="absolute top-4 right-4 hover:bg-transparent"
          variant="ghost"
          size="icon"
          aria-label="좋아요"
          aria-pressed={isLiked}
          onClick={() => handleLikeClick()}
        >
          <Heart
            className={cn(
              "h-5 w-5",
              isLiked ? "fill-red-500 text-red-500" : "text-etc",
            )}
          />
        </Button>

        <div className="mb-2 flex items-center">
          <p className="text-symbol-sky text-desc1 font-semibold">
            이런 행사는 어때요?
          </p>
        </div>

        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-title2 font-bold">{event.name}</h3>
          <div className="flex items-center gap-1">
            {event.categories.map((category) => (
              <Badge
                key={category}
                className="rounded-sm"
                variant={
                  CATEGORY_NAME_MAP[
                    category as keyof typeof CATEGORY_NAME_MAP
                  ] || category
                }
              >
                {CATEGORY_NAME_MAP[
                  category as keyof typeof CATEGORY_NAME_MAP
                ] || category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-desc2 text-etc mb-2 flex flex-col">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="text-desc2 truncate whitespace-nowrap">
              {formatDateRange(event.start_date, event.end_date)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.venue}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {isPlanned ? (
            <Button
              size={"sm"}
              className="hover:bg-symbol-sky"
              onClick={() => handleDeletePlanClick()}
              disabled={isDeletePlanLoading}
            >
              일정에서 제거
            </Button>
          ) : (
            <Button
              size={"sm"}
              className="hover:bg-symbol-sky"
              onClick={() => handleAddPlanClick()}
              disabled={isPlanLoading}
            >
              일정에 추가
            </Button>
          )}

          <Button size={"sm"} variant={"outline"}>
            행사 정보
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
