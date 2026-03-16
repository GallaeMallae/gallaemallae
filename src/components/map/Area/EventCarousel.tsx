import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import EventCard from "@/components/common/EventCard";
import { Tables } from "@/types/supabase";
import { Category } from "@/types/common";

type Event = Tables<"events">;

export default function EventCarousel({
  events,
  liked,
  setLiked,
}: {
  events: Event[];
  liked: number[];
  setLiked: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const toggleLike = (id: number) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };
  return (
    <div className="absolute right-0 bottom-6 left-0 z-5 px-4">
      <Carousel
        opts={{
          align: "center",
        }}
      >
        <CarouselContent className="-ml-4">
          {events.map((event) => (
            <CarouselItem
              key={event.id}
              className="basis-[80%] pl-4 md:basis-86"
            >
              <EventCard
                title={event.name ?? ""}
                location={event.venue ?? ""}
                startDate={event.start_date ?? ""}
                endDate={event.end_date ?? ""}
                category={(event.categories as Category) ?? "other"}
                isLiked={liked.includes(event.id)}
                onToggleLike={() => toggleLike(event.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
