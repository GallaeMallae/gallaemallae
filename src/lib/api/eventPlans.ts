import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { format } from "date-fns";
import { RawEventPlan } from "@/types/common";

export interface AddEventPlanParams {
  userId: string;
  eventId: string;
  visitDate: string;
}

export async function fetchPlannedEvents(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<RawEventPlan[]> {
  const today = format(new Date(), "yyyy-MM-dd");
  const { data, error } = await supabase
    .from("event_plans")
    .select(
      `
      *,
      event:events(*) 
    `,
    )
    .eq("user_id", userId)
    .gte("visit_date", today)
    .order("visit_date", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as unknown as RawEventPlan[]) || [];
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
