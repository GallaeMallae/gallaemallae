import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import PeriodFilterTabs from "@/components/common/PeriodFilterTabs";
import EventCard from "@/components/common/EventCard";
import MoreCard from "@/components/common/MoreCard";
import { EventCardItem, PeriodFilter } from "@/types/common";

interface UpcomingEventsProps {
  events: EventCardItem[];
  period: PeriodFilter;
  onPeriodChange: (value: PeriodFilter) => void;
}

export default function UpcomingEvents({
  events,
  period,
  onPeriodChange,
}: UpcomingEventsProps) {
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
        <CarouselContent>
          {events.map((event, index) => (
            <CarouselItem key={index} className="basis-[80%] md:basis-[30%]">
              <EventCard {...event} />
            </CarouselItem>
          ))}
          <CarouselItem className="basis-[80%] md:basis-[30%]">
            <MoreCard />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
}
