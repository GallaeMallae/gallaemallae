"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMyPageRecommendEvent } from "@/lib/api/recommend";
import { QUERY_KEYS } from "@/lib/constants";

export function useMyPageRecommendEventData(userId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.MYPAGE_RECOMMENDATION(userId),
    queryFn: () => fetchMyPageRecommendEvent(),
    enabled: !!userId,
    staleTime: 1000 * 60 * 30,
  });
}
