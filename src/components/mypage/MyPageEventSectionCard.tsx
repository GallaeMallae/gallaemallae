"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import MypageAgendaCard from "@/components/mypage/MypageAgendaCard";
import MypageLikedCard from "@/components/mypage/MypageLikedCard";
import { Bookmark, Heart, LucideIcon } from "lucide-react";
import { EventCardItem } from "@/types/common";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  events: EventCardItem[];
  onEventClick: (date: string) => void;
}

export default function MypageEventSectionCard({
  title,
  iconName,
  iconClassName,
  events,
  onEventClick,
}: MypageEventSectionCardProps) {
  // todo: 작동 확인하려고 useState 사용했지만 추후에는 Tanstack Query 사용하는 방식으로 변경 필요
  const [visibleCount, setVisibleCount] = useState(3);

  const Icon = ICON_MAP[iconName];
  const SelectedCard = EVENT_CARD_COMPONENTS[iconName];

  const slicedEvents = events.slice(0, visibleCount);

  const handleSeeMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisibleCount((prev) => prev + 3);
  };

  const hasMore = visibleCount < events.length;

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl">
      <CardHeader className="shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon className={cn("h-4 w-4", iconClassName)} />}
            <span className="font-bold">{title}</span>
          </div>
        </div>
      </CardHeader>
      {/* todo: Tanstack Query 적용되면 데스크탑 버전에서는 무한 스크롤 방식 적용하기 */}
      <CardContent className="flex min-h-0 flex-1 flex-col gap-2 lg:overflow-y-auto">
        {events.length > 0 ? (
          <>
            {slicedEvents.map((event, index) => (
              <SelectedCard
                key={index}
                {...event}
                onClick={() => onEventClick(event.startDate)}
              />
            ))}

            {hasMore && (
              <div className="pt-2 lg:hidden" onClick={handleSeeMore}>
                <Card className="hover:bg-accent/50 cursor-pointer rounded-2xl border-2 border-dashed transition-colors">
                  <CardContent className="flex items-center justify-center py-3">
                    <span className="text-caption text-symbol-sky font-bold">
                      더보기
                    </span>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        ) : (
          <div className="text-muted-foreground py-4 text-center text-sm">
            행사를 추가해 보아요
          </div>
        )}
      </CardContent>
    </Card>
  );
}
