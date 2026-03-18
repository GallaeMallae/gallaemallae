import { Event, PublicEventResponse } from "@/types/event";

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch("/api/events");
  if (!response.ok) throw new Error("네트워크 응답 에러");

  const data: PublicEventResponse[] = await response.json();

  return data.map((item, index) => ({
    id: `${item.fstvlNm}-${index}`, // 고유 ID가 없을 경우 조합
    title: item.fstvlNm,
    latitude: parseFloat(item.latitude),
    longitude: parseFloat(item.longitude),
    category: "festival", // 이 데이터셋은 모두 축제이므로 고정
    startDate: item.fstvlStartDate,
    endDate: item.fstvlEndDate,
  }));
};
