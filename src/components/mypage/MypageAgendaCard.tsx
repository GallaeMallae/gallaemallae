import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteEventPlan } from "@/hooks/mutations/useDeleteEventPlan";
import { CATEGORY_NAME_MAP } from "@/lib/constants";
import { MypageDisplayEvent } from "@/types/common";
import { calculateDDay, formatDate } from "@/utils/date";
import { MoreVertical, Pencil, Trash } from "lucide-react";

interface MypageAgendaCardProps {
  event: MypageDisplayEvent;
  selectedDate?: string;
  onClick?: () => void;
}

export type CategoryKey = keyof typeof CATEGORY_NAME_MAP;

export default function MypageAgendaCard({
  event,
  onClick,
}: MypageAgendaCardProps) {
  const { mutate: deletePlan, isPending: isDeletePlanLoading } =
    useDeleteEventPlan();
  const formatVisitDate = formatDate(event.display_date);
  const dDay = calculateDDay(event.display_date);

  return (
    <div
      className="hover:bg-muted flex cursor-pointer flex-col gap-1 rounded-xl p-2"
      onClick={onClick}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Pencil />
                  일정 수정
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => event.plan_id && deletePlan(event.plan_id)}
              >
                <Trash />
                일정 삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        <div className="text-desc2 truncate font-semibold">{event.name}</div>
        <div className="text-desc2 text-etc space-x-2 truncate">
          <span>{formatVisitDate}</span>
          <span>{event.venue}</span>
        </div>
      </div>
    </div>
  );
}
