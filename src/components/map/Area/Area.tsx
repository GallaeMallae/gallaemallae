"use client";

import { Button } from "@/components/ui/button";
import MapView from "@/components/map/Area/MapView";
import EventCarousel from "@/components/map/Area/EventCarousel";
import { LocateFixed } from "lucide-react";
import { useState } from "react";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useEvents } from "@/hooks/queries/useEvents";
import { filterEventsByCategory } from "@/app/map/filter/category";
import { Category } from "@/types/common";

export default function Area({
  radius,
  category,
}: {
  radius: number | null;
  category: Category;
}) {
  const { position, moveCurrentLocation } = useCurrentLocation();
  const [locate, setLocate] = useState<kakao.maps.Map | null>(null);
  const [loading, kakaoError] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY!,
  });
  const { data: events = [], isLoading, error: queryError } = useEvents();

  const filteredEvents = filterEventsByCategory(events, category);

  const markers = events
    .filter((event) => event.latitude !== null && event.longitude !== null)
    .map((event) => ({
      id: event.id,
      lat: event.latitude!,
      lng: event.longitude!,
    }));

  if (loading || isLoading) {
    return <div>지도를 불러오는 중</div>;
  }

  if (queryError || kakaoError) {
    return <div>지도 로드 실패</div>;
  }

  return (
    <div className="relative h-[calc(100vh-57px)] overflow-hidden">
      <MapView
        position={position}
        radius={radius}
        markers={markers}
        setLocate={setLocate}
      />
      <Button
        className="hover:bg-muted absolute right-4 bottom-54 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white md:h-12 md:w-12"
        onClick={() => moveCurrentLocation(locate)}
      >
        <LocateFixed className="size-5 text-black md:size-6" />
      </Button>
      <EventCarousel events={filteredEvents} />
    </div>
  );
}
