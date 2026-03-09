"use client";

import { Button } from "@/components/ui/button";
import { signInWithOAuthAction } from "@/actions/auth/signInWithOAuthAction";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ERROR_MESSAGE_CONFIG } from "@/lib/constants";

function ErrorToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(
        ERROR_MESSAGE_CONFIG[error] ?? "로그인 중 오류가 발생했습니다.",
      );

      const params = new URLSearchParams(searchParams.toString());
      params.delete("error");
      const nextQuery = params.toString();

      router.replace(nextQuery ? `/login?${nextQuery}` : "/login", {
        scroll: false,
      });
    }
  }, [error, searchParams, router]);

  return null;
}

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <div className="relative hidden flex-1 md:block md:w-1/2">
        <Image
          src="/images/login-page-sparkle-image.jpg"
          alt="Login page Image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-24 px-8 py-12 md:w-1/2 md:py-24">
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
        <div className="text-desc2 text-muted-foreground flex gap-2">
          <Link href={"/"}>이용약관</Link>
          <Separator orientation="vertical" />
          <Link href={"/"}>개인정보처리방침</Link>
        </div>
      </div>
      {/* useSearchParams 때문에 빌드 시점에 정적으로 페이지를 만들 수가 없음
          Suspense로 감싸서 파라미터 읽어올 때까지 렌더링 미루도록 하여 해결 */}
      <Suspense fallback={null}>
        <ErrorToastHandler />
      </Suspense>
    </div>
  );
}
