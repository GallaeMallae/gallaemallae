import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import EventCard from "@/components/common/EventCard";
import { useState, useEffect } from "react";
import { CategoryId } from "@/types/common";
import { Event } from "@/types/event";
import { CATEGORY_NAME_MAP } from "@/lib/constants";

interface EventCarouselProps {
  events: Event[];
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
            const title = event.title ?? "";
            const location = event.place ?? "";
            const startDate = event.startDate ?? "";
            const endDate = event.endDate ?? "";
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
