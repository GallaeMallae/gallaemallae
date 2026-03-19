"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMyPageRecommendEvent } from "@/lib/api/recommend";
import { QUERY_KEYS } from "@/lib/constants";
import { useUserData } from "@/hooks/queries/useUserData";

export function useMyPageRecommendEventData() {
  const { data: user } = useUserData();

  return useQuery({
    queryKey: QUERY_KEYS.MYPAGE_RECOMMENDATION(user?.id),
    queryFn: () => fetchMyPageRecommendEvent(),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 30,
  });
}
