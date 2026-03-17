"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { fetchPlannedEvents } from "@/lib/api/eventPlans";
import { QUERY_KEYS } from "@/lib/constants";
import { Tables } from "@/types/supabase";
import { Event } from "@/types/common";
import { useUserData } from "@/hooks/queries/useUserData";

export interface EventPlanWithEvent extends Tables<"event_plans"> {
  event: Event;
}

export function usePlannedEventsData() {
  const { data: user } = useUserData();
  const supabase = createClient();

  return useQuery<EventPlanWithEvent[]>({
    queryKey: QUERY_KEYS.EVENT_PLANS(user?.id),
    queryFn: () => fetchPlannedEvents(supabase, user!.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}
