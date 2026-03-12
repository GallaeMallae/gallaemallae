import { Card, CardContent } from "@/components/ui/card";
import EventDetailOrganization from "@/components/map/EventDetailModal/EventDetailModalRight/EventDetailOrganization";
import EventDetailModalButton from "@/components/map/EventDetailModal/EventDetailModalRight/EventDetailButton";
import { Check, Tally1 } from "lucide-react";
import { MOCK_DETAIL } from "@/mocks/events";

export default function EventDetailModalRight() {
  const config = MOCK_DETAIL;

  return (
    <div className="flex h-full flex-col gap-6 md:justify-between">
      <div className="flex flex-col gap-2">
        <p className="text-desc1 flex flex-row font-medium">
          <Tally1 className="text-symbol-sky" />
          축제 소개
        </p>
        <p className="text-caption text-etc font-medium">
          {config.description}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-desc1 flex font-medium">
          <Tally1 className="text-symbol-sky" />
          조직 및 운영
        </p>
        <EventDetailOrganization organization={config.organization} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-desc1 flex flex-row font-medium">
          <Tally1 className="text-symbol-sky" />
          참고 사항
        </p>
        {config.information.map((info, index) => (
          <Card
            key={index}
            className="border border-slate-100 bg-slate-50/50 p-1"
          >
            <CardContent className="text-etc text-caption flex items-center gap-2 p-2">
              <Check size={14} className="text-symbol-sky" />
              {info}
            </CardContent>
          </Card>
        ))}
      </div>
      <EventDetailModalButton />
    </div>
  );
}
