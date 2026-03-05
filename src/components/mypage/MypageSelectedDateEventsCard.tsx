import MypageEventListCard from "@/components/mypage/MypageEventListCard";
import { Card, CardContent } from "@/components/ui/card";
import { EventCardItem } from "@/types/common";

interface MypageDailyAgendaCardProps {
  selectedDate: Date | undefined;
  events: EventCardItem[];
}

export default function MypageSelectedDateEventsCard({
  selectedDate,
  events,
}: MypageDailyAgendaCardProps) {
  return (
    <Card className="md:hidden">
      <CardContent className="flex flex-col gap-4">
        <div className="font-bold">
          {selectedDate?.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          의 행사
        </div>
        <div className="space-y-2">
          {events.map((event, index) => (
            <MypageEventListCard key={index} {...event} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
