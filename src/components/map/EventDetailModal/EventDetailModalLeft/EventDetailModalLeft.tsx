"use client";

import EventRecommendCard from "@/components/map/EventDetailModal/EventDetailModalLeft/EventRecommendCard";
import EventRecommendWeather from "@/components/map/EventDetailModal/EventDetailModalLeft/EventWeatherInfoCard";
import EventIntroduce from "@/components/map/EventDetailModal/EventDetailModalLeft/EventIntroduce";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Event } from "@/types/common";

type Props = {
  event: Event;
};

export default function EventDetailModalLeft({ event }: Props) {
  const date =
    event.start_date && event.end_date
      ? event.start_date === event.end_date
        ? event.start_date
        : `${event.start_date} - ${event.end_date}`
      : event.start_date || event.end_date || "-";
  return (
    <div className="flex w-full flex-col gap-6 md:w-80 md:justify-between">
      <Card className="gap-2 rounded-2xl">
        <CardHeader className="flex">
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <p className="text-desc1 font-semibold">갈래말래?</p>
              <EventRecommendCard type="veryPositive" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 pt-0">
          <EventRecommendWeather type="temp" />
          <EventRecommendWeather type="fineDust" />
          <EventRecommendWeather type="wind" />
          <EventRecommendWeather type="wet" />
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2">
        <EventIntroduce type="date" value={date} />
        <EventIntroduce type="place" value={event.venue || "-"} />
        <EventIntroduce type="tel" value={event.phone} />
        <EventIntroduce type="homepage" value={event.homepage_url} />
      </div>
    </div>
  );
}
