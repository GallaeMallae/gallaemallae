"use client";

import { useAuthStore } from "@/stores/authStore";
import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

type Profile = Tables<"profiles">;

export function useProfileData() {
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const supabase = createClient();

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async (): Promise<Profile | null> => {
      if (!user) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        // PGRST116 = single() 메서드 사용했는데 데이터가 0개인 경우 발생(해당 프로필 없음)
        if (error.code === "PGRST116") return null;
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !isAuthLoading && !!user,
    // 5분
    staleTime: 1000 * 60 * 5,
    // 30분
    gcTime: 1000 * 60 * 30,
  });
}
