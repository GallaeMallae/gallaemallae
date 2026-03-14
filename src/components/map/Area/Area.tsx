"use client";

import { Button } from "@/components/ui/button";
import MapView from "@/components/map/Area/MapView";
import EventCarousel from "@/components/map/Area/EventCarousel";
import { LocateFixed } from "lucide-react";
import { useState } from "react";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";

const markers = [
  { id: 1, lat: 37.498, lng: 127.027 },
  { id: 2, lat: 37.5, lng: 127.03 },
  { id: 3, lat: 37.49, lng: 127.025 },
  { id: 4, lat: 37.47, lng: 127.02 },
];

export default function Area({ radius }: { radius: number | null }) {
  const { position, moveCurrentLocation } = useCurrentLocation();
  const [locate, setLocate] = useState<kakao.maps.Map | null>(null);
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY!,
  });

  if (loading) {
    return <div>지도를 불러오는 중</div>;
  }
  if (error) {
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
      <EventCarousel />
    </div>
  );
}
