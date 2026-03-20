"use client";

import EventDetailOrganization from "@/components/map/EventDetailModal/EventDetailModalRight/EventDetailOrganization";
import EventDetailModalButton from "@/components/map/EventDetailModal/EventDetailModalRight/EventDetailButton";
import { Tally1 } from "lucide-react";
import { BaseEvent } from "@/types/event";

type Props = {
  event: BaseEvent;
};

export default function EventDetailModalRightTest({ event }: Props) {
  return (
    <div className="flex h-full flex-col gap-6 md:justify-between">
      <div className="flex flex-col gap-2">
        <p className="text-desc1 flex flex-row font-medium">
          <Tally1 className="text-symbol-sky" />
          축제 소개
        </p>
        <p className="text-caption text-etc font-medium">
          {event.description ||
            event.fstvlCo ||
            "상세 정보가 등록되지 않았습니다."}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-desc1 flex font-medium">
          <Tally1 className="text-symbol-sky" />
          조직 및 운영
        </p>
        <EventDetailOrganization
          organization={{
            host: event.host || event.auspcInsttNm || "-", // 주최기관
            organizer: event.organizer || event.mnnstNm || "-", // 주관기관
            sponsor: event.sponsor || event.suprtInsttNm || "-",
            provider: event.provider || event.insttNm || "-", // 제공기관
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-desc1 flex flex-row font-medium">
          <Tally1 className="text-symbol-sky" />
          관련 정보
        </p>
        <p className="text-caption text-slate-400">준비 중입니다.</p>
      </div>

      <EventDetailModalButton />
    </div>
  );
}
