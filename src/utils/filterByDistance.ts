import { Event } from "@/types/event";
import { getDistance } from "@/utils/geo";

export const filterEventsByDistance = (
  events: Event[],
  center: { lat: number; lng: number } | null,
  radius: number | null,
): Event[] => {
  if (!center || radius === null) return events;

  return events.filter((event) => {
    if (!event.lat || !event.lon) return false;

    const distance = getDistance(center, {
      lat: Number(event.lat),
      lng: Number(event.lon),
    });

    return distance <= radius / 1000;
  });
};
