import EventDetailModalLeft from "@/components/map/EventDetailModal/EventDetailModalLeft/EventDetailModalLeft";
import EventDetailModalRight from "@/components/map/EventDetailModal/EventDetailModalRight/EventDetailModalRight";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventDetailModal() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Badge variant="축제">축제</Badge>
          <p className="text-h2">서울 국제 불꽃 축제</p>
        </div>
        <Button>
          <X />
        </Button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <EventDetailModalLeft />
        <EventDetailModalRight />
      </div>
    </div>
  );
}
