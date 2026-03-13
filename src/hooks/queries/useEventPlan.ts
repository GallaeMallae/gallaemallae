"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEventPlan } from "@/lib/api/eventPlans";
import { createClient } from "@/utils/supabase/client";
import { QUERY_KEYS } from "@/lib/constants";

export interface AddEventPlanParams {
  userId: string;
  eventId: string;
  visitDate: string; // "YYYY-MM-DD" 형태로 통일?
}

export function useEventPlan() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: AddEventPlanParams) => addEventPlan(supabase, params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENT_PLANS(variables.userId),
      });
      toast.success("일정이 추가되었습니다.");
    },
    onError: (error) => {
      console.error("일정 추가 에러:", error);
      toast.error("일정 추가에 실패했습니다.");
    },
  });

  return {
    addPlan: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
