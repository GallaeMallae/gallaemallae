import { Category } from "@/types/common";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export type EventCategory = Exclude<Category, "전체">;

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
    .contains("categories", [category]);

  if (error) throw new Error(error.message);
  return data;
}
