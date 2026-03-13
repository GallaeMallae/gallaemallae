"use client";

import { toast } from "sonner";
import { deleteEventPlan } from "@/lib/api/eventPlans";
import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteEventPlan() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const mutation = useMutation({
    mutationFn: (planId: string) => deleteEventPlan(supabase, planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENT_PLANS() });
      toast.success("일정이 삭제되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(`삭제 실패: ${error.message}`);
    },
  });

  return {
    deletePlan: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
