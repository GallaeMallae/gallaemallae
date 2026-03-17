import { Tables } from "@/types/supabase";
import { Category } from "@/types/common";

type Event = Tables<"events">;

export function filterEventsByCategory(events: Event[], category: Category[]) {
  if (category.includes("all")) return events;

  return events.filter((event) => {
    const eventCategories = event.categories ?? [];

    return eventCategories.some((cat) => category.includes(cat as Category));
  });
}
