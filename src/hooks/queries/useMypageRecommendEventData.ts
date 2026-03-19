"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMypageRecommendEvent } from "@/lib/api/recommend";
import { QUERY_KEYS } from "@/lib/constants";
import { useUserData } from "@/hooks/queries/useUserData";

export function useMypageRecommendEventData() {
  const { data: user } = useUserData();

  return useQuery({
    queryKey: QUERY_KEYS.MYPAGE_RECOMMENDATION(user?.id),
    queryFn: () => fetchMypageRecommendEvent(),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 30,
  });
}
