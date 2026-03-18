"use client";

import { Button } from "@/components/ui/button";
import MapView from "@/components/map/Area/MapView";
import EventCarousel from "@/components/map/Area/EventCarousel";
import EventDetailModal from "@/components/map/EventDetailModal/EventDetailModal";
import { LocateFixed } from "lucide-react";
import { useState, useMemo } from "react"; // useMemo 추가
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { useEvents } from "@/hooks/queries/useEvents";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { filterEventsByCategory } from "@/utils/map/category";
import { filterEventByPeriod } from "@/utils/map/period";
import { Category, PeriodFilter } from "@/types/common";

export default function Area({
  radius,
  category,
  period,
}: {
  radius: number | null;
  category: Category[];
  period: PeriodFilter;
}) {
  const { position, moveCurrentLocation } = useCurrentLocation();
  const { data: events = [], isLoading, error: queryError } = useEvents();

  const [locate, setLocate] = useState<kakao.maps.Map | null>(null);
  const [loading, kakaoError] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY!,
  });

  const [selectedCarousel, setSelectedCarousel] = useState<string | null>(null);
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  // 1. 필터링 로직 (성능 최적화를 위해 useMemo 사용 권장)
  const filteredEvents = useMemo(() => {
    const byCategory = filterEventsByCategory(events, category);
    return filterEventByPeriod(byCategory, period);
  }, [events, category, period]);

  // 2. 지도 마커 데이터 생성
  const markers = useMemo(() => {
    return filteredEvents
      .filter((event) => event.latitude && event.longitude)
      .map((event) => ({
        id: event.id,
        // API에서 오는 위경도가 문자열일 수 있으므로 숫자로 변환해서 전달
        lat: Number(event.latitude),
        lng: Number(event.longitude),
        category: (event.categories?.[0] || "festival") as Category,
      }));
  }, [filteredEvents]);

  // 3. 선택된 데이터 추출
  const selectedModalData = useMemo(() => {
    return events.find((event) => event.id === selectedModal) || null;
  }, [events, selectedModal]);
  const selectedCarouselData = filteredEvents.find(
    (event) => event.id === selectedCarousel,
  );

  // 로딩 및 에러 상태 처리
  if (loading || isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        지도를 불러오는 중...
      </div>
    );
  if (queryError || kakaoError)
    return (
      <div className="flex h-screen items-center justify-center">
        데이터를 가져오는데 실패했습니다.
      </div>
    );

  return (
    <div className="relative h-[calc(100vh-57px)] overflow-hidden">
      {/* 지도 영역 */}
      <MapView
        position={position}
        radius={radius}
        markers={markers}
        setLocate={setLocate}
        onMarkerClick={(id) => setSelectedModal(id)}
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

      {/* 상세 모달 */}
      {selectedModal && selectedModalData && (
        <EventDetailModal
          event={selectedModalData}
          open={!!selectedModal}
          onClose={() => setSelectedModal(null)}
        />
      )}

      {/* 내 위치 버튼 */}
      <Button
        className="hover:bg-muted absolute right-4 bottom-54 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg md:h-12 md:w-12"
        onClick={() => moveCurrentLocation(locate)}
      >
        <LocateFixed className="size-5 text-black md:size-6" />
      </Button>

      {/* 하단 캐러셀 */}
      <EventCarousel
        events={filteredEvents}
        onCarouselClick={(id) => setSelectedModal(id)}
        onSelectCarousel={setSelectedCarousel}
      />
    </div>
  );
}
