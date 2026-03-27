"use client";

import MainBanner from "@/components/home/MainBanner";
import CategoryMenu from "@/components/home/CategoryMenu";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import NearEvents from "@/components/home/NearEvents";
import EventDetailModal from "@/components/map/EventDetailModal/EventDetailModal";
import { useState } from "react";

export default function Home() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleEventClick = (id: string) => {
    setSelectedEventId(id);
  };

  return (
    <div className="flex flex-col gap-8">
      <MainBanner />
      <CategoryMenu />
      <UpcomingEvents onEventClick={handleEventClick} />
      <NearEvents onEventClick={handleEventClick} />

      {/* 이벤트 상세 모달 */}
      <EventDetailModal
        eventId={selectedEventId}
        open={!!selectedEventId}
        onClose={() => setSelectedEventId(null)}
      />
    </div>
  );
}
