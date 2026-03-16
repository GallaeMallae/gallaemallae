"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import EventCard from "@/components/common/EventCard";
import KakaoMap from "@/components/common/KakaoMap";
import { LocateFixed } from "lucide-react";
import { MapMarker, Circle } from "react-kakao-maps-sdk";
import { useState } from "react";
import { useLocationStore } from "@/stores/locationStore";
import { getDistance } from "@/utils/geo";
import { MOCK_EVENTS } from "@/mocks/events";

const markers = [
  { id: 1, lat: 37.498, lng: 127.027 },
  { id: 2, lat: 37.5, lng: 127.03 },
  { id: 3, lat: 37.49, lng: 127.025 },
  { id: 4, lat: 37.47, lng: 127.02 },
];

export default function Area({ radius }: { radius: number | null }) {
  const { coords } = useLocationStore();
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  const center = {
    lat: coords.lat,
    lng: coords.lng,
  };

  const moveCurrentLocation = () => {
    if (!map) return;

    map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
  };

  const filteredMarkers = center
    ? markers.filter(
        (m) =>
          radius === null ||
          getDistance(center, { lat: m.lat, lng: m.lng }) <= radius,
      )
    : [];

  return (
    <div className="relative h-[calc(100vh-57px)] overflow-hidden">
      <KakaoMap center={center} level={7} onCreate={setMap}>
        <MapMarker position={center} />

        {radius !== null && (
          <Circle
            center={center}
            radius={radius}
            strokeWeight={8}
            strokeColor="#0da3e4"
          />
        )}

        {filteredMarkers.map((m) => (
          <MapMarker key={m.id} position={{ lat: m.lat, lng: m.lng }} />
        ))}
      </KakaoMap>

      <Button
        className="hover:bg-muted absolute right-4 bottom-54 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white md:h-12 md:w-12"
        onClick={moveCurrentLocation}
      >
        <LocateFixed className="size-5 text-black md:size-6" />
      </Button>

      <div className="absolute right-0 bottom-6 left-0 z-5 px-4">
        <Carousel
          opts={{
            align: "center",
          }}
        >
          <CarouselContent className="-ml-4">
            {MOCK_EVENTS.map((event, index) => (
              <CarouselItem
                key={index}
                className="basis-[80%] pl-4 md:basis-86"
              >
                <EventCard {...event} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
