import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Trash2Icon } from "lucide-react";
import { useDeleteEventPlan } from "@/hooks/mutations/useDeleteEventPlan";
import { CATEGORY_NAME_MAP } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useOpenAlertModal } from "@/stores/alertModalStore";
import { CategoryId, MypageDisplayEvent } from "@/types/common";
import { calculateDDay } from "@/utils/date";

interface MypageAgendaCardProps {
  event: MypageDisplayEvent;
  onClick?: () => void;
  onDetailClick?: (eventId: string) => void;
}

export default function MypageAgendaCard({
  event,
  onClick,
  onDetailClick,
}: MypageAgendaCardProps) {
  const { mutate: deletePlan, isPending: isDeletePlanLoading } =
    useDeleteEventPlan();

  const openAlert = useOpenAlertModal();

  const displayDate = event.visit_date || event.start_date;
  const dDay = calculateDDay(displayDate);

  const handleCardClick = () => {
    if (onDetailClick) return onDetailClick(event.id);
    onClick?.();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (event.plan_id) {
      openAlert({
        title: "일정에서 제거하기",
        description: `${event.name}를 일정에서 제거하시겠습니까?`,
        onAction: () => deletePlan(event.plan_id!),
      });
    }
  };

  return (
    <div
      role="button"
      className="hover:bg-muted flex cursor-pointer flex-col gap-1 rounded-xl p-2"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {event.categories?.map((category, index) => {
            const label = CATEGORY_NAME_MAP[category as CategoryId] || "기타";

            return (
              <Badge
                key={`${category}-${index}`}
                className="shrink-0 rounded-sm"
                variant={label}
              >
                {label}
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
        <div className="text-desc2 text-etc flex items-center gap-2 truncate">
          <CalendarCheck className="size-4 shrink-0 -translate-y-px" />
          <span className="truncate">
            {displayDate} / {event.venue}
          </span>
        </div>
      </div>
    </div>
  );
}
