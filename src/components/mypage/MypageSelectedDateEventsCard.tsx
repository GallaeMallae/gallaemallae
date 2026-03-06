import MypageEventListCard from "@/components/mypage/MypageAgendaCard";
import { Card, CardContent } from "@/components/ui/card";
import { EventCardItem } from "@/types/common";
import { cn } from "@/lib/utils";

const CATEGORY_DOT_COLORS: Record<string, string> = {
  축제: "bg-festival",
  공연: "bg-performance",
  전시: "bg-exhibition",
};

interface MypageDailyAgendaCardProps {
  selectedDate: Date | undefined;
  events: EventCardItem[];
}

export default function MypageSelectedDateEventsCard({
  events,
}: MypageDailyAgendaCardProps) {
  return (
    <div className="flex flex-col gap-4 md:hidden">
      {events.map((event, index) => {
        const dotColorClass = CATEGORY_DOT_COLORS[event.category] || "bg-etc";

        return (
          <div key={index} className="flex items-start gap-2">
            <div className={cn("mt-2 size-2 rounded-full", dotColorClass)} />

            <Card className="flex-1 rounded-2xl shadow-sm">
              <CardContent>
                <MypageEventListCard {...event} />
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
