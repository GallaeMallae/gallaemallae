import { Badge } from "@/components/ui/badge";
import { EventCardItem } from "@/types/common";
import { calculateDDay, formatDate } from "@/utils/date";

interface MypageAgendaCardItem extends Omit<EventCardItem, "isLiked"> {
  onClick?: () => void;
  selectedDate?: string;
}

export default function MypageAgendaCard({
  title,
  location,
  startDate,
  endDate,
  selectedDate,
  category,
  onClick,
}: MypageAgendaCardItem) {
  // todo: 지금은 startDate로 보여주지만 나중에는 사용자가 지정한 날짜를 보여줘야함
  const formatStartDate = formatDate(startDate);
  const dDay = calculateDDay(startDate);

  return (
    <div
      className="hover:bg-muted cursor-pointer rounded-xl p-2"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <Badge className="rounded-sm" variant={category}>
          {category}
        </Badge>
        <div className="text-desc2 text-symbol-sky font-semibold">{dDay}</div>
      </div>

      <div className="text-desc2 truncate font-semibold">{title}</div>
      <div className="text-desc2 text-muted-foreground">
        {selectedDate ? selectedDate : formatStartDate}, {location}
      </div>
    </div>
  );
}
