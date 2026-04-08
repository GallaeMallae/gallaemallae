"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { fetchEvents } from "@/lib/api/events";
import { QUERY_KEYS } from "@/lib/constants";
import { Event, RawEvent } from "@/types/common";
import { transformEvent } from "@/utils/transform";

export function useEventsData() {
  const supabase = createClient();

  return useQuery<RawEvent[], Error, Event[]>({
    queryKey: QUERY_KEYS.EVENTS,
    queryFn: () => fetchEvents(supabase),
    select: (data) => data.map(transformEvent),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
  });
}
