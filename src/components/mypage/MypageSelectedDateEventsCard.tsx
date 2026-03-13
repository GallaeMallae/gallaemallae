import MypageAgendaCard from "@/components/mypage/MypageAgendaCard";
import { Card, CardContent } from "@/components/ui/card";
import { MypageDisplayEvent } from "@/types/common";
import { cn } from "@/lib/utils";
import { CALENDAR_CATEGORY_STYLES } from "@/lib/constants";
import { formatDate } from "@/utils/date";

interface MypageSelectedDateEventsCardProps {
  selectedDate: Date | null;
  events: MypageDisplayEvent[];
  displayMode?: "mobile" | "desktop" | "all";
}

export default function MypageSelectedDateEventsCard({
  events,
  selectedDate,
  displayMode = "all",
}: MypageSelectedDateEventsCardProps) {
  const modeClasses = {
    mobile: "md:hidden",
    desktop: "hidden md:flex",
    all: "",
  };

  const formattedSelectedDate = formatDate(selectedDate);

  return (
    <div className={cn("flex flex-col gap-4", modeClasses[displayMode])}>
      {events.map((event, index) => {
        const dotColorClass =
          CALENDAR_CATEGORY_STYLES[event.categories[0]]?.dot || "bg-etc";

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
