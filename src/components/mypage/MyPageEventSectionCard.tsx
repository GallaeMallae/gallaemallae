"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import MypageEventListCard from "@/components/mypage/MypageEventListCard";
import { Bookmark, Heart, LucideIcon } from "lucide-react";
import { EventCardItem } from "@/types/common";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ICON_MAP: Record<string, LucideIcon> = {
  bookmark: Bookmark,
  heart: Heart,
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
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedEvents = isExpanded ? events : events.slice(0, 3);

  const Icon = ICON_MAP[iconName];

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon className={cn("h-4 w-4", iconClassName)} />}
            <span className="font-bold">{title}</span>
          </div>
          {events.length > 3 && (
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-symbol-sky text-caption cursor-pointer font-bold"
            >
              {isExpanded ? "접기" : "더보기"}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {events.length > 0 ? (
          displayedEvents.map((event, index) => (
            <MypageEventListCard
              key={index}
              {...event}
              onClick={() => onEventClick(event.startDate)}
            />
          ))
        ) : (
          <div className="text-muted-foreground py-4 text-center text-sm">
            행사를 추가해 보아요
          </div>
        )}
      </CardContent>
    </Card>
  );
}
