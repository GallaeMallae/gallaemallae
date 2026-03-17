import EventDetailModalLeft from "@/components/map/EventDetailModal/EventDetailModalLeft/EventDetailModalLeft";
import EventDetailModalRight from "@/components/map/EventDetailModal/EventDetailModalRight/EventDetailModalRight";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  event: EventData;
  onClose: () => void;
};

export default function EventDetailModal({ event, onClose }: Props) {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Badge variant="festival">{event.categories}</Badge>
          <p className="text-h2">{event.name}</p>
        </div>
        <Button onClick={onClose}>
          <X />
        </Button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <EventDetailModalLeft event={event} />
        <EventDetailModalRight event={event} />
      </div>
    </div>
  );
}
