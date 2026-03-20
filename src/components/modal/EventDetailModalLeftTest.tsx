"use client";

import EventRecommendCard from "@/components/map/EventDetailModal/EventDetailModalLeft/EventRecommendCard";
import EventRecommendWeather from "@/components/map/EventDetailModal/EventDetailModalLeft/EventWeatherInfoCard";
import EventIntroduce from "@/components/map/EventDetailModal/EventDetailModalLeft/EventIntroduce";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BaseEvent } from "@/types/event";

type Props = {
  event: BaseEvent;
};

export default function EventDetailModalLeftTest({ event }: Props) {
  const start = event.fstvlStartDate || event.startDate || event.start_date;
  const end = event.fstvlEndDate || event.endDate || event.end_date;

  const location =
    event.rdnmadr ||
    event.opar ||
    event.lnmadr ||
    event.road_address ||
    event.venue;

  const tel = event.phoneNumber || event.phone;
  const homepage = event.homepageUrl || event.homepage_url;

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
        <EventIntroduce
          type="date"
          value={start && end ? `${start} ~ ${end}` : start || end || "-"}
        />
        <EventIntroduce type="place" value={location || "-"} />
        <EventIntroduce type="tel" value={tel || "-"} />
        <EventIntroduce type="homepage" value={homepage || "-"} />
      </div>
    </div>
  );
}
