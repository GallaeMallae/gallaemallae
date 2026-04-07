import MypageAgendaCard from "@/components/mypage/MypageAgendaCard";
import { Card, CardContent } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { MypageDisplayEvent } from "@/types/common";
import { cn } from "@/lib/utils";
import { CALENDAR_CATEGORY_STYLES, CATEGORY_NAME_MAP } from "@/lib/constants";
import { formatDate } from "@/utils/date";
import MypageLikedCard from "@/components/mypage/MypageLikedCard";

interface MypageSelectedDateEventsCardProps {
  selectedDate: Date | null | undefined;
  events: MypageDisplayEvent[];
  viewMode: "plan" | "like";
  onDetailClick?: (eventId: string) => void;
}

export default function MypageSelectedDateEventsCard({
  events,
  selectedDate,
  viewMode,
  onDetailClick,
}: MypageSelectedDateEventsCardProps) {
  const formattedSelectedDate = formatDate(selectedDate);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      {events.map((event, index) => {
        const categoryKey = event
          .categories[0] as keyof typeof CATEGORY_NAME_MAP;
        const koreanName = CATEGORY_NAME_MAP[categoryKey] || "기타";
        const style =
          CALENDAR_CATEGORY_STYLES[koreanName] ||
          CALENDAR_CATEGORY_STYLES["기타"];

        const dotColorClass = style.dot;

        return (
          <motion.div key={event.id} variants={itemVariants} layout>
            <div key={index} className="flex gap-2">
              <div className={cn("mt-2 size-2 rounded-full", dotColorClass)} />
              <Card className="min-w-0 flex-1 rounded-2xl shadow-sm">
                <CardContent>
                  {viewMode === "plan" ? (
                    <MypageAgendaCard
                      event={event}
                      selectedDate={formattedSelectedDate}
                      onDetailClick={onDetailClick}
                    />
                  ) : (
                    <MypageLikedCard
                      event={event}
                      onDetailClick={onDetailClick}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
