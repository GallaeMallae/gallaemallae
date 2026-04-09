import MypageAgendaCard from "@/components/mypage/MypageAgendaCard";
import { Card, CardContent } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { CategoryId, MypageDisplayEvent } from "@/types/common";
import { cn } from "@/lib/utils";
import { CALENDAR_CATEGORY_STYLES, CATEGORY_NAME_MAP } from "@/lib/constants";
import MypageLikedCard from "@/components/mypage/MypageLikedCard";

interface MypageSelectedDateEventsCardProps {
  events: MypageDisplayEvent[];
  viewMode: "plan" | "like";
  onDetailClick?: (eventId: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function MypageSelectedDateEventsCard({
  events,
  viewMode,
  onDetailClick,
}: MypageSelectedDateEventsCardProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      {events.map((event) => {
        const categoryId = (event.categories?.[0] || "etc") as CategoryId;
        const koreanName = CATEGORY_NAME_MAP[categoryId] || "기타";
        const dotColorClass = (
          CALENDAR_CATEGORY_STYLES[koreanName] ||
          CALENDAR_CATEGORY_STYLES["기타"]
        ).dot;

        return (
          <motion.div
            key={event.id}
            variants={itemVariants}
            layout
            className="flex gap-2"
          >
            <div className={cn("mt-2 size-2 rounded-full", dotColorClass)} />
            <Card className="min-w-0 flex-1 rounded-2xl shadow-sm">
              <CardContent>
                {viewMode === "plan" ? (
                  <MypageAgendaCard
                    event={event}
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
          </motion.div>
        );
      })}
    </motion.div>
  );
}
