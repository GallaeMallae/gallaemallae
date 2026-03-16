import { SupabaseClient } from "@supabase/supabase-js";
import { Database, Tables } from "@/types/supabase";

export type Event = Tables<"events">;

export async function fetchEvents(
  supabase: SupabaseClient<Database>,
): Promise<Event[]> {
  const { data, error } = await supabase.from("events").select(`*`);

  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
}
