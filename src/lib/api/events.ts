import { Event, PublicEventResponse } from "@/types/event";

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch("/api/events");
  if (!response.ok) throw new Error("네트워크 응답 에러");

  const data: PublicEventResponse[] = await response.json();

  return data.map((item, index) => {
    const title = item.fstvlNm;
    const content = item.fstvlCo || "";
    const text = title + content;

    // ✅ 네가 정해준 딱 4가지 기준으로만 분류
    let category: "festival" | "performance" | "exhibition" | "other" = "other";

    if (text.includes("공연")) {
      category = "performance";
    } else if (text.includes("전시")) {
      category = "exhibition";
    } else if (text.includes("축제")) {
      category = "festival";
    } else {
      category = "other";
    }

    return {
      ...item,
      id: `${item.fstvlNm}-${index}`,
      title: title,
      latitude: parseFloat(String(item.latitude)) || 0,
      longitude: parseFloat(String(item.longitude)) || 0,
      category: category,
      categories: [category],
      start_date: item.fstvlStartDate || null,
      startDate: item.fstvlStartDate || "",
      endDate: item.fstvlEndDate || "",
    };
  });
};
