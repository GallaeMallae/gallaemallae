import { Badge } from "@/components/ui/badge";
import { EventCardItem } from "@/types/common";
import { calculateDDay, formatDate } from "@/utils/date";

// todo: selectedDate는 일정 추가 기능 넣을때 내려올 예정이므로 그때까진 startDate로 표시
// todo: 지금 당장은 selectedDate는 달력에서 선택한 날짜임! 사용자가 일정 언제 갈지 선택한 날짜 아님!!
interface MypageAgendaCardProps extends Omit<EventCardItem, "isLiked"> {
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
}: MypageAgendaCardProps) {
  // todo: 지금은 startDate로 보여주지만 기능 붙이면서부터는 사용자가 지정한 날짜를 보여줘야함
  const formatStartDate = formatDate(startDate);
  const dDay = calculateDDay(startDate);
  // const dDay = selectedDate
  //   ? calculateDDay(selectedDate)
  //   : calculateDDay(startDate);

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
        <div className="text-desc2 text-muted-foreground flex gap-2 truncate">
          {/* {selectedDate ? formatDate(selectedDate) : formatStartDate},{" "} */}
          <span>{formatStartDate}</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
