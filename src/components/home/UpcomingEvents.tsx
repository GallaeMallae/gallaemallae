import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import PeriodFilterTabs from "@/components/common/PeriodFilterTabs";
import EventCard from "@/components/common/EventCard";
import MoreCard from "@/components/common/MoreCard";
import { useState } from "react";
import { EventCardItem, PeriodFilter } from "@/types/common";

interface UpcomingEventsProps {
  events: EventCardItem[];
  period: PeriodFilter;
  onPeriodChange: (value: PeriodFilter) => void;
  onEventClick: (id: string) => void;
}

const PAGE_SIZE = 10;

export default function UpcomingEvents({
  events,
  period,
  onPeriodChange,
  onEventClick,
}: UpcomingEventsProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleEvents = events.slice(0, visibleCount);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const hasMore = events.length > visibleCount;

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-title2 font-bold">다가오는 행사</h3>
        <PeriodFilterTabs value={period} onChange={onPeriodChange} />
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
