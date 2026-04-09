import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import EventCard from "@/components/common/EventCard";
import { useState, useEffect } from "react";
import { EventCardItem } from "@/types/common";

interface EventCarouselProps {
  events: EventCardItem[];
  selectedId: string | null;
  onCarouselClick: (id: string) => void;
  onSelectCarousel: (id: string) => void;
}

export default function EventCarousel({
  events,
  selectedId,
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

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, events, onSelectCarousel]);

  useEffect(() => {
    if (!api || !selectedId) return;

    const index = events.findIndex((e) => e.id === selectedId);
    if (index === -1) return;

    api.scrollTo(index);
  }, [api, selectedId, events]);

  return (
    <div className="absolute right-0 bottom-6 left-0 z-5 px-4">
      <Carousel setApi={setApi} opts={{ align: "center" }}>
        <CarouselContent className="-ml-4">
          {events.map((event) => {
            const isSelected = selectedId === event.id;
            return (
              <CarouselItem
                key={event.id}
                className="basis-[80%] pl-4 md:basis-86"
                onClick={() => onSelectCarousel(event.id)}
              >
                <div
                  className={`overflow-hidden rounded-2xl transition-all duration-300 ${
                    isSelected
                      ? "border-symbol-sky scale-105 border-r-4 border-l-4 shadow-xl"
                      : "scale-95 opacity-60"
                  } `}
                >
                  <div onClick={() => onCarouselClick(event.id)}>
                    <EventCard {...event} />
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
