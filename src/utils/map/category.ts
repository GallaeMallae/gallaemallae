import { Category } from "@/types/common";

export function filterEventsByCategory<
  T extends { categories?: string[] | null },
>(events: T[], category: Category[]): T[] {
  if (category.includes("all") || category.length === 0) return events;

  return events.filter((event) => {
    const eventCategories = event.categories ?? ["festival"];

    return eventCategories.some((cat) => category.includes(cat as Category));
  });
}
