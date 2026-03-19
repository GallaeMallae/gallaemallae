import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { Category } from "@/types/common";
import { Event, PublicEventResponse } from "@/types/event";

export type EventCategory = Exclude<Category, "전체">;

export async function fetchEventById(
  supabase: SupabaseClient<Database>,
  eventId: string,
) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function fetchEvents(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function fetchEventsByCategory(
  supabase: SupabaseClient<Database>,
  category: EventCategory[],
) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .contains("categories", category);

  if (error) throw new Error(error.message);
  return data;
}

export async function fetchLikedEvents(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data, error } = await supabase
    .from("event_likes")
    .select(
      `
      events (*)
    `,
    )
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  // Supabase 조인 결과는 [{ events: {...} }, { events: {...} }] 형태
  // 사용하기 편하게 [ {...}, {...} ] 형태로 가공하여 반환
  return data
    .map((item) => item.events)
    .filter(
      (event): event is Database["public"]["Tables"]["events"]["Row"] =>
        event !== null,
    );
}

export const fetchEventsData = async (): Promise<Event[]> => {
  const response = await fetch("/api/events");
  if (!response.ok) throw new Error("네트워크 응답 에러");

  const data: PublicEventResponse[] = await response.json();

  return data.map((item, index) => {
    const title = item.fstvlNm;
    const content = item.fstvlCo || "";
    const text = title + content;

    // ✅ 네가 정해준 딱 4가지 기준으로만 분류
    let category: "festival" | "performance" | "exhibition" | "etc" = "etc";

    if (text.includes("공연")) {
      category = "performance";
    } else if (text.includes("전시")) {
      category = "exhibition";
    } else if (text.includes("축제")) {
      category = "festival";
    } else {
      category = "etc";
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
