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

export async function uploadAvatar(
  supabase: SupabaseClient,
  userId: string,
  file: File,
) {
  const { data: oldFiles } = await supabase.storage.from("avatars").list("", {
    search: userId,
  });
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (error) throw error;

  if (oldFiles && oldFiles.length > 0) {
    const filesToDelete = oldFiles
      .map((file) => file.name)
      .filter((name) => name !== fileName);

    if (filesToDelete.length > 0) {
      await supabase.storage.from("avatars").remove(filesToDelete);
    }
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function updateProfile(
  supabase: SupabaseClient,
  profileData: {
    id: string;
    nickname: string;
    email: string;
    avatar_url?: string;
  },
) {
  const { error } = await supabase.from("profiles").upsert(profileData); // 기존 데이터가 있으면 업데이트, 없으면 삽입

  if (error) throw error;
  return true;
}
