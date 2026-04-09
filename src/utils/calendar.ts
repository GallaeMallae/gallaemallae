import { MypageDisplayEvent } from "@/types/common";
import { addDays, parseISO, startOfDay, startOfWeek } from "date-fns";

export interface ProcessedEvent extends MypageDisplayEvent {
  _start: Date;
  _end: Date;
  _id: string;
}

export interface GetWeeklyEventSlotsReturn {
  processedEvents: ProcessedEvent[];
  weeklySlots: Record<string, Record<string, number>>;
  dailyEventsMap: Record<string, ProcessedEvent[]>;
}

// 주차별 행사의 슬롯 번호 계산하는 함수
export const getWeeklyEventSlots = (
  events: MypageDisplayEvent[],
): GetWeeklyEventSlotsReturn => {
  if (events.length === 0) {
    return {
      processedEvents: [],
      weeklySlots: {},
      dailyEventsMap: {},
    };
  }

  // 데이터 전처리(파싱, Date 객체 변환) 및 정렬
  const processedEvents = events
    .map((event) => ({
      ...event,
      _start: startOfDay(parseISO(event.start_date)),
      _end: startOfDay(parseISO(event.end_date)),
      _id: String(event.plan_id || event.id),
    }))
    .sort((a, b) => {
      const diff = a._start.getTime() - b._start.getTime();
      if (diff !== 0) return diff;
      // 시작일이 같으면 기간이 긴 순서대로
      return (
        b._end.getTime() -
        b._start.getTime() -
        (a._end.getTime() - a._start.getTime())
      );
    });

  //날짜별 이벤트 매핑
  const dailyEventsMap: Record<string, ProcessedEvent[]> = {};

  processedEvents.forEach((event) => {
    let current = event._start;
    while (current <= event._end) {
      const dateKey = current.getTime().toString();
      if (!dailyEventsMap[dateKey]) dailyEventsMap[dateKey] = [];
      dailyEventsMap[dateKey].push(event);
      current = addDays(current, 1);
    }
  });

  // 주차별로 이벤트 그룹화
  const weekBuckets: Record<string, typeof processedEvents> = {};

  processedEvents.forEach((event) => {
    let currentWeekStart = startOfWeek(event._start);
    const lastWeekStart = startOfWeek(event._end);

    while (currentWeekStart <= lastWeekStart) {
      const weekKey = currentWeekStart.getTime().toString();
      if (!weekBuckets[weekKey]) weekBuckets[weekKey] = [];
      weekBuckets[weekKey].push(event);
      currentWeekStart = addDays(currentWeekStart, 7);
    }
  });

  // 각 주차별로 슬롯 번호 배정
  const weeklySlots: Record<string, Record<string, number>> = {};

  Object.entries(weekBuckets).forEach(([weekKey, weekEvents]) => {
    const slots: Record<string, number> = {}; //{행사 ID, 슬롯 번호}
    const occupation: { start: number; end: number }[][] = [];

    weekEvents.forEach((event) => {
      const startTs = event._start.getTime();
      const endTs = event._end.getTime();
      let assignedSlot = -1;

      // 이미 정렬된 상태이므로 순서대로 슬롯 찾기
      for (let i = 0; i < occupation.length; i++) {
        const hasOverlap = occupation[i].some(
          (occ) => startTs <= occ.end && endTs >= occ.start,
        );
        if (!hasOverlap) {
          assignedSlot = i;
          break;
        }
      }

      // 들어갈 층이 없는 경우 새 층을 추가하고 push
      if (assignedSlot === -1) {
        assignedSlot = occupation.length;
        occupation.push([]);
      }

      occupation[assignedSlot].push({ start: startTs, end: endTs });
      slots[event._id] = assignedSlot;
    });

    weeklySlots[weekKey] = slots;
  });

  return { processedEvents, weeklySlots, dailyEventsMap };
};
