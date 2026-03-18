// src/lib/api/events.ts
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
      ...item, // ✅ 모든 원본 필드(rdnmadr, phoneNumber 등) 포함
      id: `${item.fstvlNm}-${index}`,
      title: title,
      // 숫자로 변환하여 할당
      latitude: parseFloat(String(item.latitude)) || 0,
      longitude: parseFloat(String(item.longitude)) || 0,
      category: category,
      categories: [category],
      // 필드 동기화
      start_date: item.fstvlStartDate || null,
      startDate: item.fstvlStartDate || "",
      endDate: item.fstvlEndDate || "",
    };
  });
};
