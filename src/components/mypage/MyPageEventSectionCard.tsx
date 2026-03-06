"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import MypageEventListCard from "@/components/mypage/MypageEventListCard";
import { Bookmark, Heart, LucideIcon } from "lucide-react";
import { EventCardItem } from "@/types/common";
import { cn } from "@/lib/utils";

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
  const Icon = ICON_MAP[iconName];

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
      <CardContent className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {events.length > 0 ? (
          events.map((event, index) => (
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
