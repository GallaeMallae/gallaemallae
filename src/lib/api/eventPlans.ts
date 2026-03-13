import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export interface AddEventPlanParams {
  userId: string;
  eventId: string;
  visitDate: string; // "YYYY-MM-DD" 형태로 통일?
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
    .eq("user_id", userId)
    .order("visit_date", { ascending: true }); // 방문 날짜 순으로 정렬

  if (error) throw new Error(error.message);
  return data;
}

export async function addEventPlan(
  supabase: SupabaseClient<Database>,
  { userId, eventId, visitDate }: AddEventPlanParams,
) {
  const { data, error } = await supabase
    .from("event_plans")
    .insert([
      {
        user_id: userId,
        event_id: eventId,
        visit_date: visitDate,
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
