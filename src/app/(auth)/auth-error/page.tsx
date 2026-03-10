"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();

  useEffect(() => {
    // Supabase 리다이렉트는 URL 해시(#)로 넘어와서 해시에서 에러 정보 추출
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const errorCode = params.get("error");

      if (errorCode) {
        // 로그인 페이지로 에러 코드를 쿼리 파라미터로 전달하며 리다이렉트, 토스트 알림 띄움
        router.replace(`/login?error=${encodeURIComponent(errorCode)}`);
        return;
      }
    }

    // 에러 정보가 없으면 홈으로 이동
    router.replace("/");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-etc">인증 상태를 확인 중입니다...</p>
    </div>
  );
}
