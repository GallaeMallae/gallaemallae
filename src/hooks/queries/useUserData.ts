"use client";

import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export function useUserData() {
  const supabase = createClient();

  return useQuery<User | null>({
    queryKey: QUERY_KEYS.USER,
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user ?? null;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}
