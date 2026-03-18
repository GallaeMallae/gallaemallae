import { Event, PublicEventResponse } from "@/types/event";

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch("/api/events");
  if (!response.ok) throw new Error("네트워크 응답 에러");

  const data: PublicEventResponse[] = await response.json();

  return data.map((item, index) => {
    const title = item.fstvlNm;

    // 카테고리 분류 로직
    let category: "festival" | "performance" | "exhibition" | "other" =
      "festival";
    if (title.includes("공연") || title.includes("연주"))
      category = "performance";
    else if (title.includes("전시") || title.includes("박람회"))
      category = "exhibition";
    else if (title.includes("축제") || title.includes("페스티벌"))
      category = "festival";
    else category = "other";

    return {
      id: `${item.fstvlNm}-${index}`,
      title: title,
      latitude: parseFloat(item.latitude) || 0,
      longitude: parseFloat(item.longitude) || 0,

      // 1. 기존 UI 및 마커용 필드
      category: category,

      // 2. filterEventsByCategory 함수용 필드 (배열)
      categories: [category],

      // 3. filterEventByPeriod 함수용 필드 (snake_case)
      // API 데이터(2024-05-01 등)를 그대로 넣어주면 돼
      start_date: item.fstvlStartDate || null,

      // 4. 기존 타입 호환용 필드
      startDate: item.fstvlStartDate || "",
      endDate: item.fstvlEndDate || "",
    };
  });
};
