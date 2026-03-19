"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMypageRecommendEvent } from "@/lib/api/recommend";
import { QUERY_KEYS } from "@/lib/constants";
import { useUserData } from "@/hooks/queries/useUserData";

export function useMypageRecommendEventData(userLocation?: string) {
  const { data: user } = useUserData();

  return useQuery({
    queryKey: QUERY_KEYS.MYPAGE_RECOMMENDATION(user?.id, userLocation),
    queryFn: () => fetchMypageRecommendEvent(userLocation as string), // userLocation 있어야 실행되게 enabled에서 막힘
    enabled: !!user?.id && !!userLocation,
    staleTime: 1000 * 60 * 30,
  });
}
