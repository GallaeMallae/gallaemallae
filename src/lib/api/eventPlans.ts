import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export interface AddEventPlanParams {
  userId: string;
  eventId: string;
  // visitDate: string; 추후 날짜 선택 기능 추가될때 받기
}

export async function fetchPlanedEvents(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data, error } = await supabase
    .from("event_plans")
    .select(
      `
      *,
      event:events(*) 
    `,
    )
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
}

export async function addEventPlan(
  supabase: SupabaseClient<Database>,
  { userId, eventId }: AddEventPlanParams,
) {
  const { data, error } = await supabase
    .from("event_plans")
    .insert([
      {
        user_id: userId,
        event_id: eventId,
        // visit_date: visitDate, 추후 날짜 선택 기능 추가될때 받기
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteEventPlan(
  supabase: SupabaseClient<Database>,
  planId: string,
) {
  const { error } = await supabase
    .from("event_plans")
    .delete()
    .eq("id", planId);

  if (error) throw new Error(error.message);
  return true;
}
