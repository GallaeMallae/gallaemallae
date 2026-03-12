"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import EventCard from "@/components/common/EventCard";
import { LocateFixed } from "lucide-react";
import { Map, MapMarker, Circle } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import { MOCK_EVENTS } from "@/mocks/events";

export default function Area({ radius }: { radius: number | null }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [locate, setLocate] = useState<kakao.maps.Map | null>(null);

  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  useEffect(() => {
    if (!kakaoKey) {
      console.error("NEXT_PUBLIC_KAKAO_JS_KEY is not defined");
    }
  }, [kakaoKey]);

  const markers = [
    { id: 1, lat: 37.498, lng: 127.027 },
    { id: 2, lat: 37.5, lng: 127.03 },
    { id: 3, lat: 37.49, lng: 127.025 },
    { id: 4, lat: 37.47, lng: 127.02 },
  ];

  const moveCurrentLocation = () => {
    if (!navigator.geolocation || !locate) return;

    if (typeof window === "undefined" || !window.kakao?.maps) {
      console.error("Kakao Maps SDK not loaded");
      return;
    }

    navigator.geolocation.getCurrentPosition((p) => {
      const newPosition = {
        lat: p.coords.latitude,
        lng: p.coords.longitude,
      };
      setPosition(newPosition);
      locate.setCenter(
        new window.kakao.maps.LatLng(newPosition.lat, newPosition.lng),
      );
    });
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      // 현재 위치 받을 수 없으면 서울 시청으로 이동
      (error) => {
        console.warn("Geolocation error:", error.message);
        setPosition({ lat: 37.566295, lng: 126.977945 });
      },
    );
  }, []);

  function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  const filteredMarkers = position
    ? markers.filter(
        (m) =>
          radius === null ||
          getDistance(position.lat, position.lng, m.lat, m.lng) <= radius,
      )
    : [];

  return (
    <div className="relative h-[calc(100vh-57px)] overflow-hidden">
      <Map
        center={position ?? { lat: 37.49793, lng: 127.027596 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
        onCreate={setLocate}
      >
        {position && <MapMarker position={position} />}

        {position && radius !== null && (
          <Circle
            center={position}
            radius={radius}
            strokeWeight={8}
            strokeColor="#0da3e4"
          />
        )}

        {filteredMarkers.map((m) => (
          <MapMarker key={m.id} position={{ lat: m.lat, lng: m.lng }} />
        ))}
      </Map>

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
