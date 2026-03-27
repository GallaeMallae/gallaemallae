"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/common/EventCard";
import MoreCard from "@/components/common/MoreCard";
import KakaoMap from "@/components/common/KakaoMap";
import EventCardSkeleton from "@/components/common/skeleton/EventCardSkeleton";
import { Map } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import { useLocationStore } from "@/stores/locationStore";
import { useEventsData } from "@/hooks/queries/useEventsData";
import { filterEventsByDistance } from "@/utils/filter";
import { mapEventCard } from "@/utils/mapper";
import { MapMode } from "@/types/common";

const PAGE_SIZE = 5;

export default function NearEvents({
  onEventClick,
}: {
  onEventClick: (id: string) => void;
}) {
  const router = useRouter();
  const { coords, isInitialized } = useLocationStore();
  const { data: eventsData } = useEventsData();

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const center = {
    lat: coords.lat,
    lng: coords.lng,
  };

  const nearEventCardItems = useMemo(() => {
    if (!eventsData || !coords || !isInitialized) return [];

    const filteredByDistance = filterEventsByDistance(
      eventsData,
      coords,
      10000, // 10km
    );

    return mapEventCard(filteredByDistance);
  }, [eventsData, coords, isInitialized]);

  const visibleEvents = nearEventCardItems.slice(0, visibleCount);
  const hasMore = nearEventCardItems.length > visibleCount;

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleMapClick = (mode: MapMode) => {
    router.push(`/map?mode=${mode}`);
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
            {!isInitialized ? (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <EventCardSkeleton key={i} />
                ))}
              </>
            ) : visibleEvents.length === 0 ? (
              <div className="text-etc flex h-full flex-col items-center justify-center gap-8 rounded-xl border py-18">
                <div className="flex flex-col items-center">
                  <span className="text-desc1">근처에 행사가 없습니다.</span>
                  <span className="text-desc2">
                    지도에서 행사 찾기 메뉴를 통해 전체 지역 행사를
                    검색해보세요.
                  </span>
                </div>
                <div>
                  <Button
                    className="rounded-xl"
                    onClick={() => handleMapClick("all")}
                  >
                    <Map className="h-4 w-4" />
                    지도에서 행사 찾기
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {visibleEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    {...event}
                    onClick={() => onEventClick(event.id)}
                  />
                ))}
                {hasMore && (
                  <div className="hidden md:block">
                    <MoreCard onClick={handleSeeMore} />
                  </div>
                )}

                {/* 모바일 더보기 */}
                {hasMore && (
                  <div className="md:hidden">
                    <Card
                      className="cursor-pointer rounded-2xl"
                      onClick={handleSeeMore}
                    >
                      <CardContent className="flex items-center justify-center">
                        <span className="text-caption text-symbol-sky font-bold">
                          더보기
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
