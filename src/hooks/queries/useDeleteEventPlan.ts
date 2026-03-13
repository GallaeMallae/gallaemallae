"use client";

import { toast } from "sonner";
import { deleteEventPlan } from "@/lib/api/eventPlans";
import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteEventPlan() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: (planId: string) => deleteEventPlan(supabase, planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENT_PLANS() });
      toast.success("일정이 삭제되었습니다.");
    },
    onError: (error) => {
      toast.error(`삭제 실패: ${error.message}`);
    },
  });
}
