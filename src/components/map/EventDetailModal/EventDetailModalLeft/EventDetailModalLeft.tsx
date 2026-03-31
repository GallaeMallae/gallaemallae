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
    <div className="flex h-full w-full flex-col gap-6 md:w-80 md:justify-between">
      <Card className="flex gap-2 border-none p-0 shadow-none">
        <CardHeader className="p-0">
          <div className="flex items-center justify-between">
            <p className="text-title2 font-bold">갈래말래</p>
            <EventRecommendCard type="veryPositive" />
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid grid-cols-2 gap-2 rounded-xl border-slate-100/50 bg-slate-50/80 p-4">
            <EventRecommendWeather type="temp" />
            <EventRecommendWeather type="fineDust" />
            <EventRecommendWeather type="wind" />
            <EventRecommendWeather type="wet" />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full rounded-xl border-none border-slate-100/50 bg-slate-50/80 shadow-none">
        <CardContent className="flex w-full flex-col gap-4">
          <EventIntroduce type="date" value={date} />
          <EventIntroduce type="place" value={event.venue} />
          <EventIntroduce type="tel" value={event.phone} />
          <EventIntroduce type="homepage" value={event.homepage_url} />
        </CardContent>
      </Card>
    </div>
  );
}
