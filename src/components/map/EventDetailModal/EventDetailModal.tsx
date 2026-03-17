"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import EventDetailModalLeft from "@/components/map/EventDetailModal/EventDetailModalLeft/EventDetailModalLeft";
import EventDetailModalRight from "@/components/map/EventDetailModal/EventDetailModalRight/EventDetailModalRight";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/common";
import { CATEGORY_LABELS } from "@/types/common";

interface EventData {
  categories: string[];
  created_at: string | null;
  data_reference_date: string | null;
  description: string | null;
  end_date: string;
  homepage_url: string | null;
  host: string | null;
  id: string;
  latitude: number | null;
  longitude: number | null;
  lot_address: string | null;
  name: string;
  organizer: string | null;
  phone: string | null;
  provider: string | null;
  related_info: string | null;
  road_address: string | null;
  sponsor: string | null;
  start_date: string;
  updated_at: string | null;
  venue: string | null;
}

type Props = {
  event: EventData | null;
  open: boolean;
  onClose: () => void;
};

export default function EventDetailModal({ event, open, onClose }: Props) {
  if (!event) return null;

  const categoryKey = (event.categories?.[0] as Category) || "other";

  const categoryLabel =
    CATEGORY_LABELS[categoryKey] || CATEGORY_LABELS["other"];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-6xl! overflow-y-auto p-0">
        <div className="flex flex-col gap-6 p-8 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <Badge variant={categoryKey}>{categoryLabel}</Badge>
              <p className="text-h2">{event.name}</p>
            </div>

            <Button variant="ghost" size="icon" onClick={onClose}>
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
