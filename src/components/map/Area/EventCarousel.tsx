import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import EventCard from "@/components/common/EventCard";
import { MOCK_EVENTS } from "@/mocks/events";

export default function EventCarousel() {
  return (
    <div className="absolute right-0 bottom-6 left-0 z-5 px-4">
      <Carousel
        opts={{
          align: "center",
        }}
      >
        <CarouselContent className="-ml-4">
          {MOCK_EVENTS.map((event, index) => (
            <CarouselItem key={index} className="basis-[80%] pl-4 md:basis-86">
              <EventCard {...event} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
