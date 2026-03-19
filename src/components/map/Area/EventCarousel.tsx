import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import EventCard from "@/components/common/EventCard";
import { useState, useEffect } from "react";
import { Tables } from "@/types/supabase";
import { CategoryId } from "@/types/common";
import { Event as PublicEvent } from "@/types/event";
import { CATEGORY_NAME_MAP } from "@/lib/constants";

type CombinedEvent = Tables<"events"> | PublicEvent;

interface EventCarouselProps {
  events: CombinedEvent[];
  onCarouselClick: (id: string) => void;
  onSelectCarousel: (id: string) => void;
}

export default function EventCarousel({
  events,
  onCarouselClick,
  onSelectCarousel,
}: EventCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const handleSelect = () => {
      const index = api.selectedScrollSnap();
      const selected = events[index];
      if (selected) {
        onSelectCarousel(selected.id);
      }
    };
    api.on("select", handleSelect);
    handleSelect();
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, events, onSelectCarousel]);

  return (
    <div className="absolute right-0 bottom-6 left-0 z-5 px-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
        }}
      >
        <CarouselContent className="-ml-4">
          {events.map((event) => {
            const isPublic = "title" in event;

            const title =
              (isPublic ? event.title || event.fstvlNm : event.name) || "";

            const location =
              (isPublic
                ? event.rdnmadr || event.opar || event.lnmadr || event.venue
                : event.venue) || "장소 정보 없음";
            const startDate = event.start_date ?? "";
            const endDate =
              (isPublic
                ? event.endDate || event.fstvlEndDate
                : event.end_date) || "";

            const categoryId = (event.categories?.[0] as CategoryId) ?? "etc";
            const category = CATEGORY_NAME_MAP[categoryId] ?? "기타";

            return (
              <CarouselItem
                key={event.id}
                className="basis-[80%] pl-4 md:basis-86"
                onClick={() => onSelectCarousel(event.id)}
              >
                <div onClick={() => onCarouselClick(String(event.id))}>
                  <EventCard
                    title={title}
                    location={location}
                    startDate={startDate}
                    endDate={endDate}
                    category={category}
                    isLiked={false}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
