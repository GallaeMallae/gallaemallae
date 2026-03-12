"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { fetchEvents } from "@/lib/api/events";
import { QUERY_KEYS } from "@/lib/constants";
import { Tables } from "@/types/supabase";

type Event = Tables<"events">;

export function useEventsData() {
  const supabase = createClient();

  const eventsQuery = useQuery<Event[]>({
    queryKey: QUERY_KEYS.EVENTS,
    queryFn: () => fetchEvents(supabase),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return {
    events: eventsQuery.data ?? [],
    isLoading: eventsQuery.isLoading,
    isError: eventsQuery.isError,
  };
}
