import { Badge } from "@/components/ui/badge";
import { Trash2Icon } from "lucide-react";
import { useDeleteEventPlan } from "@/hooks/mutations/useDeleteEventPlan";
import { CATEGORY_NAME_MAP } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useOpenAlertModal } from "@/stores/alertModalStore";
import { MypageDisplayEvent } from "@/types/common";
import { calculateDDay } from "@/utils/date";

interface MypageAgendaCardProps {
  event: MypageDisplayEvent;
  selectedDate?: string;
  onClick?: () => void;
  onDetailClick?: (eventId: string) => void;
}

export type CategoryKey = keyof typeof CATEGORY_NAME_MAP;

export default function MypageAgendaCard({
  event,
  onClick,
  onDetailClick,
}: MypageAgendaCardProps) {
  const { mutate: deletePlan, isPending: isDeletePlanLoading } =
    useDeleteEventPlan();
  const openAlert = useOpenAlertModal();
  const dDay = calculateDDay(event.start_date);

  const handleCardClick = () => {
    if (onDetailClick) {
      onDetailClick(event.id);
    } else if (onClick) {
      onClick();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (event.plan_id) {
      const planId = event.plan_id;

      openAlert({
        title: "일정에서 제거하기",
        description: `${event.name}를 일정에서 제거하시겠습니까?`,
        onAction: () => deletePlan(planId),
      });
    }
  };

  return (
    <div
      className="hover:bg-muted flex cursor-pointer flex-col gap-1 rounded-xl p-2"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {event.categories?.map((category) => {
            const categoryLabel =
              CATEGORY_NAME_MAP[category as CategoryKey] || "기타";

            return (
              <Badge
                key={category}
                className="shrink-0 rounded-sm"
                variant={categoryLabel}
              >
                {CATEGORY_NAME_MAP[category as CategoryKey] || "기타"}
              </Badge>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-desc2 text-symbol-sky font-semibold">{dDay}</div>
          <Trash2Icon
            size={18}
            className={cn(
              "hover:text-destructive cursor-pointer transition-all duration-300",
              isDeletePlanLoading &&
                "pointer-events-none cursor-not-allowed opacity-30",
            )}
            onClick={handleDeleteClick}
          ></Trash2Icon>
        </div>
      </div>
      <div>
        <div className="text-desc2 truncate font-semibold">{event.name}</div>
        <div className="text-desc2 text-etc space-x-2 truncate">
          <span>{event.start_date}</span>
          <span>{event.venue}</span>
        </div>
      </div>
    </div>
  );
}
