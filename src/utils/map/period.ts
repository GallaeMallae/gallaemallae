import { Tables } from "@/types/supabase";
import { PeriodFilter } from "@/types/common";

type Event = Tables<"events">;

export function filterEventByPeriod(events: Event[], period: PeriodFilter) {
  if (period === "전체") return events;

  const today = new Date();

  return events.filter((event) => {
    if (!event.start_date) return false;

    const start = new Date(event.start_date);

    if (period === "당일") {
      return start.toDateString() === today.toDateString();
    }

    if (period === "주간") {
      const week = new Date();
      week.setDate(today.getDate() + 7);
      return start >= today && start <= week;
    }

    if (period === "월간") {
      return (
        start.getMonth() === today.getMonth() &&
        start.getFullYear() === today.getFullYear()
      );
    }
  });
}
