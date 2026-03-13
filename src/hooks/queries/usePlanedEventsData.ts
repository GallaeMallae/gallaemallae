"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { fetchEventPlans } from "@/lib/api/eventPlans";
import { QUERY_KEYS } from "@/lib/constants";
import { useUserData } from "./useUserData";
import { Tables } from "@/types/supabase";
import { Event } from "@/types/common";

export interface EventPlanWithEvent extends Tables<"event_plans"> {
  event: Event;
}

export function usePlanedEventsData() {
  const { user } = useUserData();
  const supabase = createClient();

  const eventPlansQuery = useQuery<EventPlanWithEvent[]>({
    queryKey: QUERY_KEYS.EVENT_PLANS(user?.id),
    queryFn: () => fetchEventPlans(supabase, user!.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return {
    planedEvents: eventPlansQuery.data ?? [],
    isPending: eventPlansQuery.isPending,
    isError: eventPlansQuery.isError,
    error: eventPlansQuery.error,
  };
}
