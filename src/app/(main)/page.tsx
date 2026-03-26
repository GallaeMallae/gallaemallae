"use client";

import MainBanner from "@/components/home/MainBanner";
import CategoryMenu from "@/components/home/CategoryMenu";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import NearEvents from "@/components/home/NearEvents";
import EventDetailModal from "@/components/map/EventDetailModal/EventDetailModal";
import { useState, useMemo } from "react";
import { useLocationStore } from "@/stores/locationStore";
import { useWeatherData } from "@/hooks/queries/useWeatherData";
import { useLocationNameData } from "@/hooks/queries/useLocationNameData";
import { useAirPollutionData } from "@/hooks/queries/useAirPollutionData";
import { useRecommendTypeData } from "@/hooks/queries/useRecommendTypeData";
import { useEventsData } from "@/hooks/queries/useEventsData";
import { mapWeatherCard, mapEventCard } from "@/utils/mapper";
import { filterEventByPeriod, filterEventsByDistance } from "@/utils/filter";
import { PeriodFilter } from "@/types/common";

export default function Home() {
  const { coords, isInitialized, isDefaultLocation } = useLocationStore();
  const { data: locationNameData } = useLocationNameData(coords, isInitialized);
  const { data: weatherData } = useWeatherData(coords, isInitialized);
  const { data: airPollutionData } = useAirPollutionData(coords, isInitialized);
  const { data: recommendTypeData, isLoading: isRecommendTypeLoading } =
    useRecommendTypeData(weatherData, airPollutionData);

  const { data: eventData } = useEventsData();

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>("전체");

  const isWeatherReady =
    !!locationNameData && !!weatherData && !!airPollutionData;
  const isWeatherLoading = !isWeatherReady;

  const weather = isWeatherReady
    ? mapWeatherCard(
        locationNameData,
        weatherData,
        airPollutionData,
        isDefaultLocation,
      )
    : null;

  const recommendType = recommendTypeData?.recommendType ?? null;

  const upcomingEventItems = useMemo(() => {
    if (!eventData) return [];
    const filteredEvents = filterEventByPeriod(eventData, selectedPeriod);
    return mapEventCard(filteredEvents);
  }, [eventData, selectedPeriod]);

  const nearEventItems = useMemo(() => {
    if (!eventData || !coords || !isInitialized) return [];

    const filteredByDistance = filterEventsByDistance(
      eventData,
      coords,
      10000, // 10km
    );

    return mapEventCard(filteredByDistance);
  }, [eventData, coords, isInitialized]);

  const selectedEvent =
    eventData?.find((e) => e.id === selectedEventId) ?? null;

  const handleEventClick = (id: string) => {
    setSelectedEventId(id);
  };

  return (
    <div className="flex flex-col gap-8">
      <MainBanner
        weather={weather}
        recommendType={recommendType}
        isWeatherCardLoading={isWeatherLoading}
        isRecommendCardLoading={isRecommendTypeLoading}
      />
      <CategoryMenu />
      <UpcomingEvents
        key={selectedPeriod}
        events={upcomingEventItems}
        period={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        onEventClick={handleEventClick}
      />
      <NearEvents events={nearEventItems} onEventClick={handleEventClick} />

      {/* 이벤트 상세 모달 */}
      <EventDetailModal
        event={selectedEvent}
        open={!!selectedEventId}
        onClose={() => setSelectedEventId(null)}
      />
    </div>
  );
}
