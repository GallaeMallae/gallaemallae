import { Badge } from "@/components/ui/badge";
import { CATEGORY_NAME_MAP } from "@/lib/constants";
import { MypageDisplayEvent } from "@/types/common";
import { calculateDDay, formatDateRange } from "@/utils/date";
import { Calendar } from "lucide-react";

interface MypageLikedCardProps {
  event: MypageDisplayEvent;
  onClick?: () => void;
}

export type CategoryKey = keyof typeof CATEGORY_NAME_MAP;

export default function MypageLikedCard({
  event,
  onClick,
}: MypageLikedCardProps) {
  const dDay = calculateDDay(event.start_date);

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

        <div className="text-desc2 text-symbol-sky font-semibold">{dDay}</div>
      </div>
      <div>
        <div className="text-desc2 truncate font-semibold">{event.name}</div>
        <div className="text-desc2 text-etc flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0" />
          <span className="truncate leading-none">
            {formatDateRange(event.start_date, event.end_date)}
          </span>
        </div>
      </div>
    </div>
  );
}
