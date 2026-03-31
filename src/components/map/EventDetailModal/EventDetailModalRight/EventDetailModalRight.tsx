"use client";

import EventDetailInfo from "@/components/map/EventDetailModal/EventDetailModalRight/EventDetailInfo";
import EventDetailModalButton from "@/components/map/EventDetailModal/EventDetailModalRight/EventDetailButton";
import { Event } from "@/types/common";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <span className="bg-symbol-sky h-5 w-1" />
    {children}
  </div>
);

export default function EventDetailModalRight({ event }: { event: Event }) {
  const fullAddress = [event.sido, event.sigungu, event.eupmyeondong]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex h-full flex-col gap-6 md:justify-between">
      <div className="flex flex-col gap-2">
        <div className="text-title2 flex flex-row font-semibold">
          <SectionTitle>축제 소개</SectionTitle>
        </div>
        <div className="text-desc2 font-medium">
          {event.description || "상세 정보가 등록되지 않았습니다."}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-title2 flex font-semibold">
          <SectionTitle>조직 및 운영 정보</SectionTitle>
        </div>
        <div className="flex flex-col gap-2">
          <EventDetailInfo
            info={{
              organization: event.organization || "-",
              holdingCycle: event.holding_cycle || "-",
              firstHeldYear: event.first_held_year || "-",
              visitorCount: event.visitor_count || "-",
              fullAddress: fullAddress || "-",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-title2 flex flex-row font-semibold">
          <SectionTitle>행사 관련 정보</SectionTitle>
        </div>
        <div className="text-desc2 font-medium">{event.related_info}</div>
      </div>

      <EventDetailModalButton event={event} />
    </div>
  );
}
