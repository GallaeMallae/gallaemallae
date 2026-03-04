"use client";

import { useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";

export default function ProfileInitializer() {
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const setProfile = useProfileStore((state) => state.setProfile);
  const clearProfile = useProfileStore((state) => state.clearProfile);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      if (isAuthLoading) {
        return;
      }

      if (!user) {
        clearProfile();
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .abortSignal(controller.signal)
        .single();

      if (error) {
        if (error.code === "ABORTED" || error.message.includes("abort")) {
          return;
        }
        console.error("프로필 로드 에러:", error.message);
        clearProfile();
        return;
      }

      setProfile(data);
    };

    fetchProfile();

    return () => {
      controller.abort();
    };
  }, [user, isAuthLoading, supabase, setProfile, clearProfile]);

  return null;
}
