import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateRange } from "@/utils/date";
import { Event } from "@/types/common";
import { CATEGORY_NAME_MAP } from "@/lib/constants";
import { useEventLike } from "@/hooks/mutations/useEventLike";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { toast } from "sonner";
import { useDeleteEventPlan } from "@/hooks/mutations/useDeleteEventPlan";
import { useOpenAlertModal } from "@/stores/alertModalStore";
import { useOpenVisitDateModal } from "@/stores/visitDateModalStore";

interface MypageEventRecommendCardProps {
  event: Event;
  isLiked: boolean;
  isPlanned: boolean;
  planId?: string;
  onDetailClick: (eventId: string) => void;
}

export default function MypageEventRecommendCard({
  event,
  isLiked,
  isPlanned,
  planId,
  onDetailClick,
}: MypageEventRecommendCardProps) {
  const { data: profile } = useProfileData();

  const { mutate: toggleLike, isPending: isLikePending } = useEventLike(
    event.id,
  );
  const { mutate: deletePlan, isPending: isDeletePlanPending } =
    useDeleteEventPlan();

  const openAlert = useOpenAlertModal();
  const openVisitDateModal = useOpenVisitDateModal();

  const checkProfile = () => {
    if (!profile?.id) {
      toast.error("프로필 정보가 없습니다.");
      return false;
    }
    return true;
  };

  const handleLikeClick = () => {
    if (isLikePending) return;
    toggleLike(isLiked);
  };

  const handleAddPlanClick = () => {
    if (!checkProfile()) return;
    openVisitDateModal({
      event: event,
    });
  };

  const handleDeletePlanClick = () => {
    if (!checkProfile() || !planId) return;

    openAlert({
      title: "일정에서 제거하기",
      description: `${event.name}를 일정에서 제거하시겠습니까?`,
      onAction: () => deletePlan(planId),
    });
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
          disabled={isLikePending}
          onClick={() => handleLikeClick()}
        >
          <Heart
            className={cn(
              "size-5",
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
            {event.categories.map((category) => {
              const label =
                CATEGORY_NAME_MAP[category as keyof typeof CATEGORY_NAME_MAP] ||
                "기타";

              return (
                <Badge key={category} className="rounded-sm" variant={label}>
                  {label}
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="text-desc2 text-etc mb-2 flex flex-col">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 shrink-0" />
            <span className="text-desc2 truncate whitespace-nowrap">
              {formatDateRange(event.start_date, event.end_date)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span>{event.venue}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {isPlanned ? (
            <Button
              size={"sm"}
              className="bg-destructive hover:bg-destructive/80"
              onClick={() => handleDeletePlanClick()}
              disabled={isDeletePlanPending}
            >
              일정에서 제거
            </Button>
          ) : (
            <Button
              size={"sm"}
              className="bg-symbol-sky hover:bg-symbol-sky/80 text-white"
              onClick={() => handleAddPlanClick()}
            >
              나의 일정에 추가
            </Button>
          )}

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => onDetailClick(event.id)}
          >
            행사 정보
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
