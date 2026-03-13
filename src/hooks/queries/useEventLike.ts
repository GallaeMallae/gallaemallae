"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { useUserData } from "./useUserData";
import { QUERY_KEYS } from "@/lib/constants";

export function useEventLike(eventId: string) {
  const supabase = createClient();
  const { user } = useUserData();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (isLiked: boolean) => {
      if (!user) throw new Error("로그인이 필요합니다.");

      if (isLiked) {
        const { error } = await supabase
          .from("event_likes")
          .delete()
          .eq("user_id", user.id)
          .eq("event_id", eventId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("event_likes")
          .insert({ user_id: user.id, event_id: eventId });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.LIKED_EVENTS(user?.id),
      });
    },
  });

  return {
    toggleLike: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
