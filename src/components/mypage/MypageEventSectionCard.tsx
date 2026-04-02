"use client";

import MypageAgendaCard from "@/components/mypage/MypageAgendaCard";
import MypageLikedCard from "@/components/mypage/MypageLikedCard";
import MypageEventCardSkeleton from "@/components/common/skeleton/MypageEventCardSkeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Bookmark, Heart, LucideIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Event, EventPlanWithEvent, MypageDisplayEvent } from "@/types/common";
import { parseSafeDate } from "@/utils/date";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const ICON_MAP: Record<string, LucideIcon> = {
  bookmark: Bookmark,
  heart: Heart,
};
const LIST_NUMBER = 4;
const EVENT_CARD_COMPONENTS = {
  bookmark: MypageAgendaCard,
  heart: MypageLikedCard,
};

interface MypageEventSectionCardProps {
  title: string;
  iconName: "bookmark" | "heart";
  iconClassName?: string;
  isLoading: boolean;
  events?: (Event | EventPlanWithEvent)[];
}

export default function MypageEventSectionCard({
  title,
  iconName,
  iconClassName,
  isLoading,
  events = [],
}: MypageEventSectionCardProps) {
  const [visibleCount, setVisibleCount] = useState(LIST_NUMBER);
  const observerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const isDesktop = useIsDesktop();

  const Icon = ICON_MAP[iconName];
  const SelectedCard = EVENT_CARD_COMPONENTS[iconName];

  const formattedEvents: MypageDisplayEvent[] = events.map((item) => {
    if ("event" in item) {
      return {
        ...item.event,
        plan_id: item.id,
        visit_date: item.visit_date ?? undefined,
      };
    }
    return item as MypageDisplayEvent;
  });

  const slicedEvents = formattedEvents.slice(0, visibleCount);

  const hasMore = visibleCount < formattedEvents.length;

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      setVisibleCount((prev) => prev + LIST_NUMBER);
    }
  }, [hasMore]);

  // 일정, 관심 목록에서 행사 클릭시 달력에서 해당 날짜 선택하는 함수
  const handleEventClick = (dateString: string) => {
    const newDate = parseSafeDate(dateString);
    if (newDate) {
      const monthString = format(newDate, "yyyy-MM");
      router.push(`?date=${dateString}&month=${monthString}`, {
        scroll: false,
      });
    }
  };

  useEffect(() => {
    if (!isDesktop || !hasMore) return;

    const viewport = scrollAreaRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]',
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: viewport, // 브라우저가 아닌 ScrollArea를 기준으로 감지
        threshold: 0.5,
        rootMargin: "20px",
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isDesktop, hasMore, handleLoadMore, visibleCount]);

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
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <Card className="flex h-full flex-col gap-2 rounded-2xl">
      <CardHeader className="shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon className={cn("h-4 w-4", iconClassName)} />}
            <span className="font-bold">{title}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        <ScrollArea ref={scrollAreaRef} className="min-h-0 w-full flex-1 px-4">
          <div className="flex w-full flex-col gap-1">
            {isLoading ? (
              <div className="flex flex-col gap-1 py-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <MypageEventCardSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex w-full flex-col gap-1 pb-4"
              >
                {events.length > 0 ? (
                  <AnimatePresence mode="popLayout">
                    {slicedEvents.map((event) => (
                      <motion.div
                        key={event.plan_id || event.id}
                        variants={itemVariants}
                        layout
                      >
                        <SelectedCard
                          event={event}
                          onClick={() =>
                            handleEventClick(
                              event.visit_date || event.start_date,
                            )
                          }
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="text-etc text-desc2 py-4 text-center">
                    행사를 추가해 보아요
                  </div>
                )}
                <div ref={observerRef} className="w-full">
                  {hasMore && !isDesktop && (
                    <motion.div variants={itemVariants} className="pt-2">
                      <button
                        type="button"
                        className="w-full pt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLoadMore();
                        }}
                      >
                        <Card className="hover:bg-accent/50 cursor-pointer rounded-2xl border-2 border-dashed transition-colors">
                          <CardContent className="flex items-center justify-center py-3">
                            <span className="text-caption text-symbol-sky font-bold">
                              더보기
                            </span>
                          </CardContent>
                        </Card>
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
