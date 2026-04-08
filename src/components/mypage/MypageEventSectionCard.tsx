"use client";

import MypageAgendaCard from "@/components/mypage/MypageAgendaCard";
import MypageLikedCard from "@/components/mypage/MypageLikedCard";
import MypageEventCardSkeleton from "@/components/common/skeleton/MypageEventCardSkeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Bookmark, Heart, LucideIcon, PlusCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Event, EventPlanWithEvent, MypageDisplayEvent } from "@/types/common";
import { parseSafeDate } from "@/utils/date";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

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

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const formatToMypageEvent = (
  item: Event | EventPlanWithEvent,
): MypageDisplayEvent => {
  if ("event" in item) {
    return {
      ...item.event,
      plan_id: item.id,
      visit_date: item.visit_date ?? undefined,
    };
  }
  return item as MypageDisplayEvent;
};

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
  const searchParams = useSearchParams();

  const router = useRouter();
  const isDesktop = useIsDesktop();

  const Icon = ICON_MAP[iconName];
  const SelectedCard = EVENT_CARD_COMPONENTS[iconName];

  const formattedEvents = useMemo(
    () => events.map(formatToMypageEvent),
    [events],
  );

  const slicedEvents = useMemo(
    () => formattedEvents.slice(0, visibleCount),
    [formattedEvents, visibleCount],
  );

  const hasMore = visibleCount < formattedEvents.length;

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => {
      if (prev >= formattedEvents.length) return prev;
      return prev + LIST_NUMBER;
    });
  }, [formattedEvents.length]);

  // 일정, 관심 목록에서 행사 클릭시 달력에서 해당 날짜 선택하는 함수
  const handleEventClick = (dateString: string) => {
    const newDate = parseSafeDate(dateString);
    if (newDate) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("date", dateString);
      params.set("month", format(newDate, "yyyy-MM"));
      params.set("mode", iconName === "bookmark" ? "plan" : "like");

      router.push(`?${params.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    if (!isDesktop || !hasMore) return;

    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: viewport, // 브라우저가 아닌 ScrollArea를 기준으로 감지
        threshold: 0.1,
        rootMargin: "20px",
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isDesktop, hasMore, handleLoadMore]);

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
    <Card className="flex flex-col gap-2 rounded-2xl md:h-full md:min-h-0 md:flex-1">
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
                {Array.from({ length: LIST_NUMBER }).map((_, i) => (
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
                  <EmptyStateView
                    icon={iconName === "bookmark" ? Bookmark : Heart}
                    title={
                      iconName === "bookmark"
                        ? "아직 확정된 일정이 없어요"
                        : "관심 목록이 비어있어요"
                    }
                    description={
                      iconName === "bookmark"
                        ? "가고 싶은 행사를 일정에 추가해 보세요."
                        : "관심이 가는 행사를 찜해 보세요."
                    }
                    actionLabel="행사 찾으러 가기"
                    onAction={() => router.push("/map")}
                  />
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

function EmptyStateView({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="bg-muted mb-4 flex size-12 items-center justify-center rounded-full">
        <Icon className="text-etc size-6" strokeWidth={1.5} />
      </div>
      <div className="text-desc1 mb-1 font-bold break-keep">{title}</div>
      <p className="text-etc text-caption mb-6 leading-relaxed break-keep">
        {description}
      </p>
      {actionLabel && (
        <Button
          variant="outline"
          size="sm"
          className="rounded-2xl border-dashed px-6"
          onClick={onAction}
        >
          <PlusCircle className="mr-2 size-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
