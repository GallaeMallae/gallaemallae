import { fetchEvents } from "@/lib/api/events";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/lib/api/events";

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const supabase = createClient();
      return fetchEvents(supabase);
    },
  });
}
