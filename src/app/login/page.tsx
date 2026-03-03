"use client";

import { Button } from "@/components/ui/button";
import { signInWithOAuthAction } from "@/actions/auth/signInWithOAuthAction";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(decodeURIComponent(error));
      const params = new URLSearchParams(searchParams.toString());
      params.delete("error");
      router.replace(`/login?${params.toString()}`, { scroll: false });
    }
  }, [error, searchParams, router]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="relative h-[50vh] w-full bg-red-500 md:h-full md:min-h-screen md:w-1/2">
        이미지
      </div>
      <div className="flex h-[50vh] w-full flex-col items-center justify-around px-4 py-12 md:h-screen md:w-1/2 md:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="cursor-pointer">
            <Link href={"/"}>
              <Image
                src="/images/gallaemallae-full-logo.svg"
                alt="Gallaemallae Full Logo"
                width={200}
                height={60}
                className="h-auto w-auto"
              />
            </Link>
          </div>
          <div className="text-muted-foreground">
            갈래말래를 통해 위치, 날씨 기반 행사 추천 서비스를 만나보세요!
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Button
            variant="outline"
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 border-[#dadce0] bg-white px-4 text-base text-[#3c4043] hover:bg-[#f8f9fa] hover:text-[#3c4043]"
            onClick={() => signInWithOAuthAction("google")}
          >
            <Image
              src="/images/google-logo.svg"
              alt="Google Logo"
              width={24}
              height={24}
            />
            구글로 계속하기
          </Button>
          <Button
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 border-none bg-[#FEE500] px-4 text-base text-[#191919] hover:bg-[#FADA00]"
            onClick={() => signInWithOAuthAction("kakao")}
          >
            <Image
              src="/images/kakao-logo.svg"
              alt="Kakao Logo"
              width={24}
              height={24}
            />
            카카오로 계속하기
          </Button>
        </div>

        <div className="text-muted-foreground">이용약관 | 개인정보처리방침</div>
      </div>
    </div>
  );
}
