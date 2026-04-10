"use client";

import { Button } from "@/components/ui/button";
import MapView from "@/components/map/Area/MapView";
import EventCarousel from "@/components/map/Area/EventCarousel";
import EventDetailModal from "@/components/map/EventDetailModal/EventDetailModal";
import { LocateFixed } from "lucide-react";
import { useState, useMemo } from "react";
import { useEventsData } from "@/hooks/queries/useEventsData";
import { useLikedEventsData } from "@/hooks/queries/useLikedEventsData";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import {
  filterEventsByCategory,
  filterEventByPeriod,
  filterEventsByDistance,
} from "@/utils/filter";
import { mapEventCard } from "@/utils/mapper";
import { CategoryId, PeriodFilter } from "@/types/common";

interface AreaProps {
  radius: number | null;
  category: CategoryId[];
  period: PeriodFilter;
  search: string;
}

export default function Area({ radius, category, period, search }: AreaProps) {
  const { position, moveCurrentLocation } = useCurrentLocation();
  const { data: events = [], isLoading, isError, error } = useEventsData();
  const { data: likedEvents = [] } = useLikedEventsData();

  const [locate, setLocate] = useState<kakao.maps.Map | null>(null);

  const [selectedCarousel, setSelectedCarousel] = useState<string | null>(null);
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  const likedEventIds = useMemo(() => {
    return new Set(likedEvents.map((event) => event.id));
  }, [likedEvents]);

  const filteredEvents = useMemo(() => {
    let result = filterEventsByCategory(events, category);
    result = filterEventByPeriod(result, period);
    result = filterEventsByDistance(result, position, radius);

    if (search.trim()) {
      result = result.filter((event) => {
        const title = event.name ?? "";
        return title.toLowerCase().includes(search.toLowerCase());
      });
    }

    return result;
  }, [events, category, period, search, position, radius]);

  const processedEvents = useMemo(() => {
    return mapEventCard(filteredEvents);
  }, [filteredEvents]);

  // 좋아요 상태 매핑한 최종 캐러셀 아이템
  const carouselEvents = useMemo(() => {
    return processedEvents.map((event) => ({
      ...event,
      isLiked: likedEventIds.has(event.id),
    }));
  }, [processedEvents, likedEventIds]);

  // 지도 마커 데이터 생성
  const markers = useMemo(() => {
    return filteredEvents
      .filter((event) => event.latitude && event.longitude)
      .map((event) => {
        return {
          id: event.id,
          lat: Number(event.latitude),
          lng: Number(event.longitude),
          categories: (event.categories ?? []) as CategoryId[],
        };
      });
  }, [filteredEvents]);

  // 선택된 데이터 추출
  const selectedModalData = useMemo(() => {
    return events.find((event) => event.id === selectedModal) || null;
  }, [events, selectedModal]);
  const selectedCarouselData = filteredEvents.find(
    (event) => event.id === selectedCarousel,
  );

  const handleMoveToCurrentLocation = () => {
    moveCurrentLocation(locate);
    setSelectedCarousel(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        데이터 불러오는 중...
      </div>
    );
  }

  if (isError) {
    console.error(error);

    return (
      <div className="flex h-screen items-center justify-center">
        데이터를 가져오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-57px)] overflow-hidden">
      <MapView
        center={position}
        radius={radius}
        markers={markers}
        selectedCategory={category}
        setLocate={setLocate}
        onMarkerClick={(id) => {
          setSelectedModal(id);
          setSelectedCarousel(id);
        }}
        locate={locate}
        onSelectCarousel={
          selectedCarouselData
            ? {
                id: selectedCarouselData.id,
                latitude: selectedCarouselData.latitude
                  ? Number(selectedCarouselData.latitude)
                  : null,
                longitude: selectedCarouselData.longitude
                  ? Number(selectedCarouselData.longitude)
                  : null,
              }
            : undefined
        }
      />
      {selectedModal && selectedModalData && (
        <EventDetailModal
          eventId={selectedModalData.id}
          open={!!selectedModal}
          onClose={() => setSelectedModal(null)}
        />
      )}
      <Button
        className="hover:bg-muted absolute right-4 bottom-54 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg md:h-12 md:w-12"
        onClick={handleMoveToCurrentLocation}
      >
        <LocateFixed className="size-5 text-black md:size-6" />
      </Button>

      <EventCarousel
        events={carouselEvents}
        selectedId={selectedCarousel}
        onCarouselClick={(id) => setSelectedModal(id)}
        onSelectCarousel={setSelectedCarousel}
      />
    </div>
  );
}
