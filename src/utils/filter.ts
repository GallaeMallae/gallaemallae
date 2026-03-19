import { CategoryId } from "@/types/common";
import { PeriodFilter } from "@/types/common";

export function filterEventsByCategory<
  T extends { categories?: string[] | null },
>(events: T[], category: CategoryId[]): T[] {
  if (category.includes("all") || category.length === 0) return events;

  return events.filter((event) => {
    const eventCategories = event.categories ?? ["festival"];

    return eventCategories.some((cat) => category.includes(cat as CategoryId));
  });
}

export function filterEventByPeriod<T extends { start_date: string | null }>(
  events: T[],
  period: PeriodFilter,
): T[] {
  if (period === "전체") return events;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return events.filter((event) => {
    if (!event.start_date) return false;

    const start = new Date(event.start_date);

    if (isNaN(start.getTime())) return false;

    if (period === "당일") {
      return start.toDateString() === today.toDateString();
    }

    if (period === "주간") {
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      return start >= today && start <= nextWeek;
    }

    if (period === "월간") {
      return (
        start.getMonth() === today.getMonth() &&
        start.getFullYear() === today.getFullYear()
      );
    }
    return true;
  });
}
