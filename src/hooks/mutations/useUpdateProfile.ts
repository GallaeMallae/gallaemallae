"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { uploadAvatar, updateProfile } from "@/lib/api/profile";
import { QUERY_KEYS } from "@/lib/constants";

interface UpdateProfileParams {
  userId: string;
  nickname: string;
  email: string;
  avatarFile?: File | null;
  currentAvatarUrl?: string | null;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({
      userId,
      nickname,
      email,
      avatarFile,
      currentAvatarUrl,
    }: UpdateProfileParams) => {
      let avatarUrl = currentAvatarUrl || undefined;

      if (avatarFile) {
        avatarUrl = await uploadAvatar(supabase, userId, avatarFile);
      }

      return updateProfile(supabase, {
        id: userId,
        nickname,
        email,
        avatar_url: avatarUrl,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROFILE(variables.userId),
      });
    },
    onError: (error: Error) => {
      toast.error(`프로필 수정 실패: ${error.message}`);
    },
  });
}
