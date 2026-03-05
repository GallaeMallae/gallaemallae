import { Badge } from "@/components/ui/badge";
import { EventCardItem } from "@/types/common";
import { calculateDDay, formatToKoreanMonthDay } from "@/utils/date";

type MypageEventCardItem = Omit<EventCardItem, "isLiked">;

export default function MypageEventListCard({
  title,
  location,
  startDate,
  endDate,
  category,
}: MypageEventCardItem) {
  const formatStartDate = formatToKoreanMonthDay(startDate);
  const dDay = calculateDDay(startDate);

  return (
    <div className="hover:bg-muted cursor-pointer rounded-xl p-2">
      <div className="flex items-center justify-between">
        <Badge className="rounded-sm" variant={category}>
          {category}
        </Badge>
        <div className="text-desc2 text-symbol-sky font-semibold">{dDay}</div>
      </div>

      <div className="text-desc2 font-semibold">{title}</div>
      <div className="text-desc2 text-muted-foreground">
        {formatStartDate}, {location}
      </div>
    </div>
  );
}
