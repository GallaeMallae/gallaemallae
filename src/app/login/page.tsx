"use client";

import { Button } from "@/components/ui/button";
import { signInWithOAuthAction } from "@/actions/auth/signInWithOAuthAction";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

const ERROR_MESSAGE_MAP: Record<string, string> = {
  config_error: "로그인 설정에 문제가 있습니다. 잠시 후 다시 시도해 주세요.",
  oauth_signin_failed: "소셜 로그인에 실패했습니다. 다시 시도해 주세요.",
  unknown_error: "알 수 없는 오류가 발생했습니다.",
  access_denied: "로그인이 취소되었습니다. 다시 시도해 주세요.", // 사용자가 소셜 로그인에서 '취소' 버튼을 누른 경우
  provider_disabled:
    "현재 해당 소셜 로그인을 사용할 수 없습니다. 관리자에게 문의해 주세요.", // Supabase 대시보드에서 비활성화된 경우
  email_conflict: "이미 동일한 이메일로 가입된 다른 계정이 존재합니다.",
  callback_failed: "인증 응답을 처리하는 중 오류가 발생했습니다.", // 콜백 URL 처리 실패 시
  session_expired: "로그인 세션이 만료되었습니다. 다시 시도해 주세요.",
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(ERROR_MESSAGE_MAP[error] ?? "로그인 중 오류가 발생했습니다.");
      const params = new URLSearchParams(searchParams.toString());
      params.delete("error");

      const nextQuery = params.toString();
      router.replace(nextQuery ? `/login?${nextQuery}` : "/login", {
        scroll: false,
      });
    }
  }, [error, searchParams, router]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="relative min-h-[50vh] w-full md:h-full md:min-h-screen md:w-1/2">
        <Image
          src="/images/login-page-sparkle-image.jpg"
          alt="Login page Image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-12 px-4 py-12 md:h-screen md:w-1/2 md:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <Link href={"/"} className="cursor-pointer">
            <Image
              src="/images/gallaemallae-full-logo.svg"
              alt="Gallaemallae Full Logo"
              width={200}
              height={60}
              className="h-20 w-auto md:h-24"
            />
          </Link>
          <div className="text-muted-foreground text-desc2">
            위치 · 날씨 기반 문화 행사 추천 서비스
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Button
            variant="outline"
            className="h-12 w-full cursor-pointer bg-white text-base hover:bg-[#f8f9fa]"
            onClick={() => signInWithOAuthAction("google")}
          >
            <Image
              src="/images/google-logo.svg"
              alt="Google Logo"
              width={20}
              height={20}
            />
            구글로 계속하기
          </Button>
          <Button
            className="h-12 w-full cursor-pointer border-none bg-[#FEE500] text-base text-black hover:bg-[#FADA00]"
            onClick={() => signInWithOAuthAction("kakao")}
          >
            <Image
              src="/images/kakao-logo.svg"
              alt="Kakao Logo"
              width={20}
              height={20}
            />
            카카오로 계속하기
          </Button>
        </div>
      </div>
    </div>
  );
}
