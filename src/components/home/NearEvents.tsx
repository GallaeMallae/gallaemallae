"use client";

import { Card, CardContent } from "@/components/ui/card";
import EventCard from "@/components/common/EventCard";
import MoreCard from "@/components/common/MoreCard";
import KakaoMap from "@/components/common/KakaoMap";
import { MapMarker } from "react-kakao-maps-sdk";
import { useLocationStore } from "@/stores/locationStore";
import { EventCardItem } from "@/types/common";

export default function NearEvents({ events }: { events: EventCardItem[] }) {
  const { coords } = useLocationStore();

  const center = {
    lat: coords.lat,
    lng: coords.lng,
  };

  return (
    <section>
      <h3 className="text-title2 mb-2 font-bold">내 근처 행사</h3>

      <div className="flex flex-col gap-4 md:h-110 md:flex-row">
        <div className="bg-etc-sub h-56 w-full overflow-hidden rounded-xl md:h-full md:flex-[0.4]">
          {/* Kakao Map */}
          <KakaoMap center={center} level={7}>
            <MapMarker position={center} />
          </KakaoMap>
        </div>

        <div className="md:flex-[0.6]">
          <div className="flex flex-col gap-4 md:h-full md:overflow-y-auto md:pr-2 md:pb-2">
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}

            <div className="hidden md:block">
              <MoreCard />
            </div>

            {/* 모바일 더보기 */}
            <div className="md:hidden">
              <Card className="cursor-pointer rounded-2xl">
                <CardContent className="flex items-center justify-center">
                  <span className="text-caption text-symbol-sky font-bold">
                    더보기
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
