"use client";

import { Button } from "@/components/ui/button";
import { signInWithOAuthAction } from "@/utils/auth/signInWithOAuthAction";

export default function LoginPage() {
  return (
    <div className="itmes-center mx-auto flex h-screen w-150 flex-col justify-center gap-4">
      <Button
        variant="outline"
        className="flex w-full items-center justify-center gap-2 border-[#dadce0] bg-white text-[#1f1f1f] hover:bg-red-500"
        onClick={() => signInWithOAuthAction("google")}
      >
        Google로 로그인
      </Button>

      <Button
        className="flex w-full items-center justify-center gap-2 border-none bg-[#FEE500] text-[#000000] hover:bg-red-500"
        onClick={() => signInWithOAuthAction("kakao")}
      >
        카카오 로그인
      </Button>
    </div>
  );
}
