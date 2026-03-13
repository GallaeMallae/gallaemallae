import { Category } from "@/types/common";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

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

  console.log("가공전", data);
  // Supabase 조인 결과는 [{ events: {...} }, { events: {...} }] 형태
  // 사용하기 편하게 [ {...}, {...} ] 형태로 가공하여 반환
  return data
    .map((item) => item.events)
    .filter(
      (event): event is Database["public"]["Tables"]["events"]["Row"] =>
        event !== null,
    );
}
