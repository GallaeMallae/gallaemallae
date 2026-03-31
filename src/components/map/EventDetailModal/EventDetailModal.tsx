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

type EventDetailModalProps = {
  eventId: string | null;
  open: boolean;
  onClose: () => void;
};

export default function EventDetailModal({
  eventId,
  open,
  onClose,
}: EventDetailModalProps) {
  const { data: eventsData } = useEventsData();

  const event = eventsData?.find((e) => e.id === eventId);

  if (!event) return null;

  const categoryId = ((event.categories as string[])[0] as CategoryId) || "etc";
  const category = CATEGORY_NAME_MAP[categoryId] ?? "기타";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-6xl! overflow-y-auto p-0">
        <div className="flex flex-col gap-6 p-8 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <Badge variant={category}>{category}</Badge>
              <DialogTitle>
                <p className="text-h2"> {event.name}</p>
              </DialogTitle>
            </div>

            <Button
              aria-label="닫기"
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X />
            </Button>
          </div>

          <div className="flex flex-col gap-8 md:flex-row">
            <div className="w-full shrink-0 md:w-[320px]">
              <EventDetailModalLeft event={event} />
            </div>

            <div className="flex-1">
              <EventDetailModalRight event={event} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
