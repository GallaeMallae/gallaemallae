import { signInWithOAuthAction } from "@/actions/auth/signInWithOAuthAction";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SocialLoginButtonsProps {
  next: string;
}

export default function SocialLoginButtons({ next }: SocialLoginButtonsProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        variant="outline"
        className="h-12 w-full cursor-pointer bg-white text-base hover:bg-[#f8f9fa]"
        onClick={() => signInWithOAuthAction("google", next)}
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
        onClick={() => signInWithOAuthAction("kakao", next)}
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
  );
}
