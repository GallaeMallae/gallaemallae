"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";

export default function ProfileInitializer() {
  const user = useAuthStore((state) => state.user);
  const { setProfile, clearProfile } = useProfileStore();
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        clearProfile();
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("프로필 로드 에러:", error.message);
        clearProfile();
        return;
      }

      setProfile(data);
    };

    fetchProfile();
  }, [user, supabase, setProfile, clearProfile]);

  return null;
}
