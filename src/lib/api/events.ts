import { SupabaseClient } from "@supabase/supabase-js";
import { Database, Tables } from "@/types/supabase";
import { Category, Event } from "@/types/common";
import { format as formatDate } from "date-fns";
import { Category } from "@/types/common";

export type EventCategory = Exclude<Category, "전체">;

const today = formatDate(new Date(), "yyyy-MM-dd");

const transformEvent = (dbRow: Tables<"events">): Event => ({
  ...dbRow,
  categories: (dbRow.categories as string[]) || [],
});

export async function fetchEventById(
  supabase: SupabaseClient<Database>,
  eventId: string,
): Promise<Event | null> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (error) throw new Error(error.message);
  if (!data) return null;

  return transformEvent(data);
}

export async function fetchEvents(
  supabase: SupabaseClient<Database>,
): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("end_date", today)
    .order("start_date", { ascending: true });

  if (error) throw new Error(error.message);

  return (data || []).map(transformEvent);
}

export async function fetchLikedEvents(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<Event[]> {
  const { data, error } = await supabase
    .from("event_likes")
    .select(
      `
      events!inner(*)
    `,
    )
    .eq("user_id", userId)
    .gte("events.end_date", today)
    .order("events(start_date)", { ascending: true });

  if (error) throw new Error(error.message);

  // Supabase 조인 결과는 [{ events: {...} }, { events: {...} }] 형태
  // 사용하기 편하게 [ {...}, {...} ] 형태로 가공하여 반환
  return (data || [])
    .map((item) => transformEvent(item.events))
    .filter((event) => event !== null);
}
