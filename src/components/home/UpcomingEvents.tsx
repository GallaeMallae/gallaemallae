"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import PeriodFilterTabs from "@/components/common/PeriodFilterTabs";
import EventCard from "@/components/common/EventCard";
import MoreCard from "@/components/common/MoreCard";
import { useState, useMemo } from "react";
import { useEventsData } from "@/hooks/queries/useEventsData";
import { useLikedEventsData } from "@/hooks/queries/useLikedEventsData";
import { filterEventByPeriod } from "@/utils/filter";
import { mapEventCard } from "@/utils/mapper";
import { PeriodFilter } from "@/types/common";

const PAGE_SIZE = 10;

export default function UpcomingEvents({
  onEventClick,
}: {
  onEventClick: (id: string) => void;
}) {
  const { data: eventsData } = useEventsData();
  const { data: likedEventsData } = useLikedEventsData();

  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>("전체");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const likedEventIds = useMemo(() => {
    if (!likedEventsData) return new Set<string>();
    return new Set(likedEventsData.map((event) => event.id));
  }, [likedEventsData]);

  // 이벤트 데이터 가공
  const processedEvents = useMemo(() => {
    if (!eventsData) return [];
    const filteredEvents = filterEventByPeriod(eventsData, selectedPeriod);
    return mapEventCard(filteredEvents);
  }, [eventsData, selectedPeriod]);

  // 좋아요 상태 매핑한 최종 아이템 카드
  const eventsCardItems = useMemo(() => {
    return processedEvents.map((event) => ({
      ...event,
      isLiked: likedEventIds.has(event.id),
    }));
  }, [processedEvents, likedEventIds]);

  const visibleEvents = eventsCardItems.slice(0, visibleCount);
  const hasMore = eventsCardItems.length > visibleCount;

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-title2 font-bold">다가오는 행사</h3>
        <PeriodFilterTabs
          value={selectedPeriod}
          onChange={(period) => {
            setSelectedPeriod(period);
            setVisibleCount(PAGE_SIZE);
          }}
        />
      </div>

      <Carousel
        opts={{
          align: "center",
        }}
      >
        {visibleEvents.length === 0 ? (
          <div className="text-etc py-18 text-center">
            예정된 행사가 없습니다.
          </div>
        ) : (
          <CarouselContent className="overflow-visible">
            {visibleEvents.map((event) => (
              <CarouselItem
                key={event.id}
                className="basis-[80%] md:basis-[30%]"
              >
                <EventCard {...event} onClick={() => onEventClick(event.id)} />
              </CarouselItem>
            ))}
            {hasMore && (
              <CarouselItem className="basis-[80%] md:basis-[30%]">
                <MoreCard onClick={handleSeeMore} />
              </CarouselItem>
            )}
          </CarouselContent>
        )}
      </Carousel>
    </section>
  );
}
