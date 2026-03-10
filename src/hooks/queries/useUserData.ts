"use client";

import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useUserData() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user ?? null;
    },
    staleTime: 1000 * 60 * 5,
  });
}
