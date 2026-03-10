"use client";

import { useEffect, useMemo, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";

interface AuthProviderProps {
  children: React.ReactNode;
  initialUserId?: string;
}

export default function AuthProvider({
  children,
  initialUserId,
}: AuthProviderProps) {
  const supabase = useMemo(() => createClient(), []);
  const queryClient = useQueryClient();

  const lastUserId = useRef<string | undefined>(initialUserId);

  useEffect(() => {
    // 세션 변화가 감지되면 TanStack Query 캐시를 업데이트
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      const currentUserId = currentUser?.id;

      // 유저 데이터 캐시 업데이트
      queryClient.setQueryData(["user"], currentUser);

      // 로그아웃 시 프로필 정보도 함께 날림
      if (event === "SIGNED_OUT") {
        queryClient.removeQueries({ queryKey: QUERY_KEYS.PROFILE() });
        lastUserId.current = undefined;
      }

      // 로그인, 유저 정보 업데이트시 프로필 정보를 다시 가져오도록 무효화
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        if (currentUserId && lastUserId.current !== currentUserId) {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.PROFILE(currentUserId),
          });
          lastUserId.current = currentUserId;
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, queryClient]);

  return <>{children}</>;
}
