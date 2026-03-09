import MypageAgendaCard from "@/components/mypage/MypageAgendaCard";
import { Card, CardContent } from "@/components/ui/card";
import { EventCardItem } from "@/types/common";
import { cn } from "@/lib/utils";
import { CATEGORY_STYLES } from "@/lib/constants";
import { formatDate } from "@/utils/date";

interface MypageDailyAgendaCardProps {
  selectedDate: Date;
  events: EventCardItem[];
}

export default function MypageSelectedDateEventsCard({
  events,
  selectedDate,
}: MypageDailyAgendaCardProps) {
  const formattedSelectedDate = formatDate(
    selectedDate.toLocaleDateString("en-CA"),
  );

  const selectedDateEvents = events.map((event) => ({
    ...event,
    selectedDate: formattedSelectedDate,
  }));

  return (
    <div className="flex flex-col gap-4 md:hidden">
      {selectedDateEvents.map((event, index) => {
        const dotColorClass = CATEGORY_STYLES[event.category]?.dot || "bg-etc";

        return (
          <div key={index} className="flex gap-2">
            <div className={cn("mt-2 size-2 rounded-full", dotColorClass)} />

            <Card className="min-w-0 flex-1 rounded-2xl shadow-sm">
              <CardContent>
                <MypageAgendaCard {...event} />
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
