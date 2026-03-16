"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEventPlan } from "@/lib/api/eventPlans";
import { createClient } from "@/utils/supabase/client";
import { QUERY_KEYS } from "@/lib/constants";

export interface AddEventPlanParams {
  userId: string;
  eventId: string;
  visitDate: string;
}

export function useEventPlan() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AddEventPlanParams) => addEventPlan(supabase, params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENT_PLANS(variables.userId),
      });
      toast.success("일정이 추가되었습니다.");
    },
    onError: (error: Error) => {
      console.error("일정 추가 에러:", error);
      toast.error(`일정 추가 실패: ${error.message}`);
    },
  });
}
