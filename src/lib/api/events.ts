import { Event, PublicEventResponse } from "@/types/event";

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch("/api/events");
  if (!response.ok) throw new Error("네트워크 응답 에러");

  const data: PublicEventResponse[] = await response.json();

  return data.map((item, index) => {
    const title = item.fstvlNm;

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
      ...item, //
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
