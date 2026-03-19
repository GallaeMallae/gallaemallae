"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import MypageAgendaCard from "@/components/mypage/MypageAgendaCard";
import MypageLikedCard from "@/components/mypage/MypageLikedCard";
import { Bookmark, Heart, LucideIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MypageDisplayEvent } from "@/types/common";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";

const ICON_MAP: Record<string, LucideIcon> = {
  bookmark: Bookmark,
  heart: Heart,
};

const EVENT_CARD_COMPONENTS = {
  bookmark: MypageAgendaCard,
  heart: MypageLikedCard,
};

interface MypageEventSectionCardProps {
  title: string;
  iconName: "bookmark" | "heart";
  iconClassName?: string;
  events: MypageDisplayEvent[];
  onEventClick: (date: string) => void;
}

export default function MypageEventSectionCard({
  title,
  iconName,
  iconClassName,
  events,
  onEventClick,
}: MypageEventSectionCardProps) {
  const [visibleCount, setVisibleCount] = useState(3);
  const isDesktop = useIsDesktop();
  const observerRef = useRef<HTMLDivElement>(null);

  const Icon = ICON_MAP[iconName];
  const SelectedCard = EVENT_CARD_COMPONENTS[iconName];

  const slicedEvents = events.slice(0, visibleCount);

  const hasMore = visibleCount < events.length;

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      setVisibleCount((prev) => prev + 3);
    }
  }, [hasMore]);

  useEffect(() => {
    if (!isDesktop || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isDesktop, hasMore, handleLoadMore, visibleCount]);

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
        <ScrollArea className="min-h-0 w-full flex-1 px-4">
          <div className="flex w-full flex-col gap-1">
            {events.length > 0 ? (
              <>
                {slicedEvents.map((event) => (
                  <SelectedCard
                    key={event.plan_id || event.id}
                    event={event}
                    onClick={() => onEventClick(event.display_date)}
                  />
                ))}

                <div ref={observerRef} className="w-full">
                  {hasMore && (
                    <button
                      className={cn(
                        "w-full pt-2",
                        isDesktop ? "pointer-events-none opacity-0" : "block",
                      )}
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
                  )}
                </div>
              </>
            ) : (
              <div className="text-etc text-desc2 py-4 text-center">
                행사를 추가해 보아요
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
