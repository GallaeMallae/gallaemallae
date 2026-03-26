import { getDistance } from "@/utils/geo";
import { CategoryId, PeriodFilter } from "@/types/common";
import { Event } from "@/types/event";

export function filterEventsByCategory(
  events: Event[],
  category: CategoryId[],
): Event[] {
  if (category.includes("all")) return events;
  return events.filter((event) =>
    event.categories.some((cat) => category.includes(cat as CategoryId)),
  );
}

export function filterEventByPeriod(
  events: Event[],
  period: PeriodFilter,
): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return events.filter((event) => {
    if (!event.start_date || !event.name) return false;

    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date ?? event.start_date);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return false;

    if (endDate < today) return false;

    if (period === "전체") return true;

    let boundary = new Date(today);

    if (period === "당일") {
      boundary.setDate(today.getDate() + 1);
    }

    if (period === "주간") {
      boundary.setDate(today.getDate() + 7);
    }

    if (period === "월간") {
      boundary = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    }

    return startDate < boundary;
  });
}

export const filterEventsByDistance = (
  events: Event[],
  center: { lat: number; lng: number } | null,
  radius: number | null,
): Event[] => {
  if (!center || radius === null) return events;

  return events.filter((event) => {
    if (event.latitude == null || event.longitude == null) return false;

    const distance = getDistance(center, {
      lat: Number(event.latitude),
      lng: Number(event.longitude),
    });

    return distance <= radius;
  });
};
