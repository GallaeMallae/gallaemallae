"use client";

import { useUserData } from "@/hooks/queries/useUserData";
import { fetchProfile } from "@/lib/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/types/supabase";

type Profile = Tables<"profiles">;

export function useProfileData() {
  const { user } = useUserData();
  const supabase = createClient();

  const profileQuery = useQuery<Profile | null>({
    queryKey: QUERY_KEYS.PROFILE(user?.id),
    queryFn: () => fetchProfile(supabase, user!.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
  };
}
