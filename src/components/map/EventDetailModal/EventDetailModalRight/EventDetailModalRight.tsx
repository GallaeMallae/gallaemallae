"use client";

import EventDetailInfo from "@/components/map/EventDetailModal/EventDetailModalRight/EventDetailInfo";
import EventDetailModalButton from "@/components/map/EventDetailModal/EventDetailModalRight/EventDetailButton";
import { Tally1 } from "lucide-react";
import { Event } from "@/types/common";

export default function EventDetailModalRight({ event }: { event: Event }) {
  return (
    <div className="flex h-full flex-col gap-6 md:justify-between">
      <div className="flex flex-col gap-2">
        <p className="text-desc1 flex flex-row font-medium">
          <Tally1 className="text-symbol-sky" />
          축제 소개
        </p>
        <p className="text-caption text-etc font-medium">
          {event.description || "상세 정보가 등록되지 않았습니다."}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-desc1 flex font-medium">
          <Tally1 className="text-symbol-sky" />
          조직 및 운영 정보
        </p>
        <EventDetailInfo
          info={{
            organization: event.organization || "-",
            holdingCycle: event.holding_cycle || "-",
            firstHeldYear: event.first_held_year || "-",
            visitorCount: event.visitor_count || "-",
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-desc1 flex flex-row font-medium">
          <Tally1 className="text-symbol-sky" />
          관련 정보
        </p>
        <p className="text-caption">{event.related_info}</p>
      </div>

      <EventDetailModalButton event={event} />
    </div>
  );
}
