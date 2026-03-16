import { Tables } from "@/types/supabase";
import { Category } from "@/types/common";

type Event = Tables<"events">;

export function filterEventsByCategory(events: Event[], category: Category) {
  if (category === "all") return events;

  return events.filter((event) => event.categories?.includes(category));
}
