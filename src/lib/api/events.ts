import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { format as formatDate } from "date-fns";
import { LikedEventRaw, RawEvent } from "@/types/common";

const getToday = () => formatDate(new Date(), "yyyy-MM-dd");

export async function fetchEvents(
  supabase: SupabaseClient<Database>,
): Promise<RawEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("end_date", getToday())
    .order("start_date", { ascending: true });

  if (error) throw new Error(error.message);

  return data || [];
}

export async function fetchLikedEvents(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<LikedEventRaw[]> {
  const { data, error } = await supabase
    .from("event_likes")
    .select(
      `
      events!inner(*)
    `,
    )
    .eq("user_id", userId)
    .gte("events.end_date", getToday())
    .order("events(start_date)", { ascending: true });

  if (error) throw new Error(error.message);

  return data || [];
}
