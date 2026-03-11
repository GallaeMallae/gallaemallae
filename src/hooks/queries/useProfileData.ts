"use client";

import { useUserData } from "@/hooks/queries/useUserData";
import { fetchProfile } from "@/lib/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useProfileData() {
  const { data: user } = useUserData();
  const supabase = createClient();

  return useQuery({
    queryKey: QUERY_KEYS.PROFILE(user?.id),
    queryFn: () => fetchProfile(supabase, user!.id),
    enabled: !!user,
    // 5분
    staleTime: 1000 * 60 * 5,
    // 30분
    gcTime: 1000 * 60 * 30,
  });
}
