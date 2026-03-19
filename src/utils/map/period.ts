import { PeriodFilter } from "@/types/common";

export function filterEventByPeriod<T extends { start_date: string | null }>(
  events: T[],
  period: PeriodFilter,
): T[] {
  if (period === "전체") return events;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // 비교를 위해 시간을 00:00:00으로 초기화

  return events.filter((event) => {
    if (!event.start_date) return false;

    const start = new Date(event.start_date);

    // 유효하지 않은 날짜 형식 방어 코드
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
