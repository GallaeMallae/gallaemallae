import { Badge } from "@/components/ui/badge";
import { EventCardItem } from "@/types/common";
import { calculateDDay, formatDateRange } from "@/utils/date";
import { Calendar } from "lucide-react";

interface MypageEventCardItem extends Omit<EventCardItem, "isLiked"> {
  onClick?: () => void;
}

export default function MypageLikedCard({
  title,
  location,
  startDate,
  endDate,
  category,
  onClick,
}: MypageEventCardItem) {
  const dDay = calculateDDay(startDate);

  return (
    <div
      className="hover:bg-muted flex cursor-pointer flex-col gap-1 rounded-xl p-2"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <Badge className="rounded-sm" variant={category}>
          {category}
        </Badge>
        <div className="text-desc2 text-symbol-sky font-semibold">{dDay}</div>
      </div>
      <div>
        <div className="text-desc2 truncate font-semibold">{title}</div>
        <div className="text-desc2 text-muted-foreground flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0" />
          <span className="truncate leading-none">
            {formatDateRange(startDate, endDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
