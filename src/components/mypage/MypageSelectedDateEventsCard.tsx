import MypageAgendaCard from "@/components/mypage/MypageAgendaCard";
import { Card, CardContent } from "@/components/ui/card";
import { MypageDisplayEvent } from "@/types/common";
import { cn } from "@/lib/utils";
import { CALENDAR_CATEGORY_STYLES, CATEGORY_NAME_MAP } from "@/lib/constants";
import { formatDate } from "@/utils/date";

interface MypageSelectedDateEventsCardProps {
  selectedDate: Date | null;
  events: MypageDisplayEvent[];
}

export default function MypageSelectedDateEventsCard({
  events,
  selectedDate,
}: MypageSelectedDateEventsCardProps) {
  const formattedSelectedDate = formatDate(selectedDate);

  return (
    <div className="flex flex-col gap-4">
      {events.map((event, index) => {
        const categoryKey = event
          .categories[0] as keyof typeof CATEGORY_NAME_MAP;
        const koreanName = CATEGORY_NAME_MAP[categoryKey] || "기타";
        const style =
          CALENDAR_CATEGORY_STYLES[koreanName] ||
          CALENDAR_CATEGORY_STYLES["기타"];

        const dotColorClass = style.dot;

        return (
          <div key={index} className="flex gap-2">
            <div className={cn("mt-2 size-2 rounded-full", dotColorClass)} />
            <Card className="min-w-0 flex-1 rounded-2xl shadow-sm">
              <CardContent>
                <MypageAgendaCard
                  event={event}
                  selectedDate={formattedSelectedDate}
                />
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
