"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import EventRecommendCard from "@/components/map/EventDetailModal/EventDetailModalLeft/EventRecommendCard";
import EventWeatherInfoCard from "@/components/map/EventDetailModal/EventDetailModalLeft/EventWeatherInfoCard";
import EventIntroduce from "@/components/map/EventDetailModal/EventDetailModalLeft/EventIntroduce";
import { EventWeatherInfoCardSkeleton } from "@/components/common/skeleton/EventWeatherInfoCardSkeleton";
import { EventRecommendCardSkeleton } from "@/components/common/skeleton/EventRecommendCardSkeleton";
import { useEventWeatherData } from "@/hooks/queries/useEventWeatherData";
import { useEventVisitRecommendData } from "@/hooks/queries/useEventVisitRecommendData";
import { mapEventWeatherInfoCard } from "@/utils/mapper";
import { formatDateRange } from "@/utils/date";
import { Event } from "@/types/common";

export default function EventDetailModalLeft({ event }: { event: Event }) {
  const { data: eventWeatherData, isLoading: isEventWeatherLoading } =
    useEventWeatherData(event.latitude, event.longitude, event.start_date);
  const { data: recommendTypeData, isLoading: isRecommendTypeLoading } =
    useEventVisitRecommendData(eventWeatherData);

  const eventWeather = eventWeatherData
    ? mapEventWeatherInfoCard(
        eventWeatherData.forecast,
        eventWeatherData.airPollution,
      )
    : null;

  const recommendType = recommendTypeData?.recommendType ?? null;

  const displayDate = formatDateRange(event.start_date, event.end_date);

  return (
    <div className="flex h-full w-full flex-col gap-6 md:w-80 md:justify-between">
      <Card className="flex gap-2 border-none p-0 shadow-none">
        <CardHeader className="p-0">
          <div className="flex items-center justify-between">
            <p className="text-title2 font-bold">갈래말래?</p>
            {isRecommendTypeLoading || !recommendType ? (
              <EventRecommendCardSkeleton />
            ) : (
              <EventRecommendCard type={recommendType} />
            )}
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid grid-cols-2 gap-2 rounded-xl border-slate-100/50 bg-slate-50/80 p-4">
            {isEventWeatherLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <EventWeatherInfoCardSkeleton key={i} />
              ))
            ) : !eventWeather ? (
              <div className="text-caption text-etc col-span-2 flex h-28 flex-col items-center justify-center">
                <span>아직 날씨를 알 수 없어요</span>
                <span>5일 이내 일정만 날씨를 확인할 수 있어요</span>
              </div>
            ) : (
              <>
                <EventWeatherInfoCard
                  type="temp"
                  value={eventWeather.temp}
                  weatherType={eventWeather.weather}
                />
                <EventWeatherInfoCard
                  type="fineDust"
                  value={eventWeather.fineDust}
                />
                <EventWeatherInfoCard type="wind" value={eventWeather.wind} />
                <EventWeatherInfoCard type="wet" value={eventWeather.wet} />
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="w-full rounded-xl border-none border-slate-100/50 bg-slate-50/80 shadow-none">
        <CardContent className="flex w-full flex-col gap-4">
          <EventIntroduce type="date" value={displayDate} />
          <EventIntroduce type="place" value={event.venue} />
          <EventIntroduce type="tel" value={event.phone} />
          <EventIntroduce type="homepage" value={event.homepage_url} />
        </CardContent>
      </Card>
    </div>
  );
}
