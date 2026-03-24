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
    if (!event.startDate) return false;

    const date = new Date(event.startDate);
    if (isNaN(date.getTime())) return false;

    if (date < today) return false;

    if (period === "전체") return true;

    let endDate = new Date(today);

    if (period === "당일") {
      endDate.setDate(today.getDate() + 1);
    }

    if (period === "주간") {
      endDate.setDate(today.getDate() + 7);
    }

    if (period === "월간") {
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    }

    return date < endDate;
  });
}

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
