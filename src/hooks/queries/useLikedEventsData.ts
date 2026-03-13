"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { fetchLikedEvents } from "@/lib/api/events";
import { QUERY_KEYS } from "@/lib/constants";
import { useUserData } from "./useUserData";
import { Event } from "@/types/common";

export function useLikedEventsData() {
  const { user } = useUserData();
  const supabase = createClient();

  const likedEventsQuery = useQuery<Event[]>({
    queryKey: QUERY_KEYS.LIKED_EVENTS(user?.id),
    queryFn: () => fetchLikedEvents(supabase, user!.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return {
    likedEvents: likedEventsQuery.data ?? [],
    isLoading: likedEventsQuery.isLoading,
    isError: likedEventsQuery.isError,
    error: likedEventsQuery.error,
  };
}
