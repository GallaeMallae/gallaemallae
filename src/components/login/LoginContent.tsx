"use client";

import ErrorToastHandler from "@/components/login/ErrorToastHandler";
import SocialLoginButtons from "@/components/login/SocialLoginButtons";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginContent() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";
  const error = searchParams.get("error");

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <div className="relative hidden flex-1 md:block md:w-1/2">
        <Image
          src="/images/login-banner-image1.jpg"
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
              src="/images/logo.svg"
              alt="갈래말래"
              width={200}
              height={60}
              className="h-20 w-auto md:h-24"
            />
          </Link>
          <div className="text-etc text-desc2">
            위치 · 날씨 기반 문화 행사 추천 서비스
          </div>
        </div>
        <SocialLoginButtons next={next} />
        <div className="text-desc2 text-etc flex gap-2">
          <Link href={"/"}>이용약관</Link>
          <Separator orientation="vertical" />
          <Link href={"/"}>개인정보처리방침</Link>
        </div>
      </div>
      <ErrorToastHandler error={error} />
    </div>
  );
}
