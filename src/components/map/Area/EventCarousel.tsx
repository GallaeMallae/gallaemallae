import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import EventCard from "@/components/common/EventCard";
import { useState, useEffect } from "react";
import { Tables } from "@/types/supabase";
import { Category } from "@/types/common";

type Event = Tables<"events">;

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

    // 첫 렌더 시에도 실행
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
          {events.map((event) => (
            <CarouselItem
              key={event.id}
              className="basis-[80%] pl-4 md:basis-86"
              onClick={() => onSelectCarousel(event.id)}
            >
              <div onClick={() => onCarouselClick(String(event.id))}>
                <EventCard
                  title={event.name ?? ""}
                  location={event.venue ?? ""}
                  startDate={event.start_date ?? ""}
                  endDate={event.end_date ?? ""}
                  category={(event.categories?.[0] as Category) ?? "other"}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
