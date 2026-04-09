"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { fetchPlannedEvents } from "@/lib/api/eventPlans";
import { QUERY_KEYS } from "@/lib/constants";
import { RawEventPlan, EventPlanWithEvent } from "@/types/common";
import { useUserData } from "@/hooks/queries/useUserData";
import { transformEvent } from "@/utils/transform";

export function usePlannedEventsData() {
  const { data: user } = useUserData();
  const supabase = createClient();

  return useQuery<RawEventPlan[], Error, EventPlanWithEvent[]>({
    queryKey: QUERY_KEYS.EVENT_PLANS(user?.id),
    queryFn: () => fetchPlannedEvents(supabase, user!.id),
    enabled: !!user?.id,
    select: (rawData) =>
      rawData.map((plan) => ({
        ...plan,
        event: transformEvent(plan.event),
      })),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}
