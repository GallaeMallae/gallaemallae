import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { Category } from "@/types/common";
import { Event } from "@/types/event";

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
  const res = await fetch("/api/event");

  if (!res.ok) {
    throw new Error("이벤트 데이터 가져오기 실패했습니다");
  }
  const data = await res.json();
  return data;
};
