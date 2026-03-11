import { SupabaseClient } from "@supabase/supabase-js";
import { Database, Tables } from "@/types/supabase";

type Profile = Tables<"profiles">;

export async function fetchProfile(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    // single() 메서드 사용했는데 결과가 0개인 경우(프로필 없음) PGRST116 에러코드
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  return data;
}
