"use client";

import { useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = useMemo(() => createClient(), []);
  const queryClient = useQueryClient();

  useEffect(() => {
    // 세션 변화가 감지되면 TanStack Query 캐시를 업데이트
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // 유저 데이터 캐시 업데이트
      queryClient.setQueryData(["user"], session?.user ?? null);

      // 로그아웃 시 프로필 정보도 함께 날림
      if (event === "SIGNED_OUT") {
        queryClient.removeQueries({ queryKey: ["profile"] });
      }

      // 로그인 시 프로필 정보를 다시 가져오도록 무효화
      if (event === "SIGNED_IN") {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, queryClient]);

  return <>{children}</>;
}
