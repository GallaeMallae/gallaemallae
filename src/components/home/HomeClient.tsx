"use client";

import MainBanner from "@/components/home/MainBanner";
import CategoryMenu from "@/components/home/CategoryMenu";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import NearEvents from "@/components/home/NearEvents";
import EventDetailModal from "@/components/map/EventDetailModal/EventDetailModal";
import { useState } from "react";

export default function HomeClient() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <MainBanner />
      <CategoryMenu />
      <UpcomingEvents onEventClick={setSelectedEventId} />
      <NearEvents onEventClick={setSelectedEventId} />

      {/* 이벤트 상세 모달 */}
      <EventDetailModal
        eventId={selectedEventId}
        open={!!selectedEventId}
        onClose={() => setSelectedEventId(null)}
      />
    </div>
  );
}
