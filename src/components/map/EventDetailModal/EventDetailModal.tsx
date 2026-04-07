"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EventDetailModalLeft from "@/components/map/EventDetailModal/EventDetailModalLeft/EventDetailModalLeft";
import EventDetailModalRight from "@/components/map/EventDetailModal/EventDetailModalRight/EventDetailModalRight";
import { X } from "lucide-react";
import { useEventsData } from "@/hooks/queries/useEventsData";
import { CategoryId } from "@/types/common";
import { CATEGORY_NAME_MAP } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EventDetailModalProps {
  eventId: string | null;
  open: boolean;
  onClose: () => void;
}

export default function EventDetailModal({
  eventId,
  open,
  onClose,
}: EventDetailModalProps) {
  const { data: eventsData } = useEventsData();

  const event = eventsData?.find((e) => e.id === eventId);

  if (!event) return null;

  const categories =
    (event.categories as CategoryId[]).length > 0
      ? (event.categories as CategoryId[])
      : (["etc"] as CategoryId[]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-6xl! overflow-hidden p-0">
        <ScrollArea className="max-h-[80vh] w-full p-6">
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  {categories.map((category) => {
                    const categoryName = CATEGORY_NAME_MAP[category];

                    return (
                      <Badge
                        key={category}
                        className="rounded-sm"
                        variant={categoryName}
                      >
                        {CATEGORY_NAME_MAP[category] ?? "기타"}
                      </Badge>
                    );
                  })}
                </div>
                <DialogTitle>
                  <div className="text-h2 md:text-h2 leading-tight wrap-break-word whitespace-normal">
                    {event.name}
                  </div>
                </DialogTitle>
              </div>

              <Button
                aria-label="닫기"
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="size-6"
              >
                <X />
              </Button>
            </div>

            <div className="flex w-full flex-col gap-8 md:flex-row">
              <div className="w-full md:w-80">
                <EventDetailModalLeft event={event} />
              </div>

              <div className="flex-1">
                <EventDetailModalRight event={event} />
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
