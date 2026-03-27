"use client";

import MypageProfileDialog from "@/components/mypage/MypageProfileDialog";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import Image from "next/image";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { Button } from "@/components/ui/button";
import { useOpenAlertModal } from "@/stores/alertModalStore";
import { useLogout } from "@/hooks/useLogout";

export default function MypageProfileCard() {
  const { data: profile } = useProfileData();
  const openAlert = useOpenAlertModal();
  const { logout } = useLogout();

  const handleLogoutClick = () => {
    console.log("클릭");
    openAlert({
      title: "로그아웃 하시겠습니까?",
      description: "메인 페이지로 이동됩니다.",
      onAction: () => logout(),
    });
  };

  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl">
      <CardContent className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex h-full flex-col items-center justify-center gap-4 md:gap-2">
          <div className="flex shrink-0 items-center justify-center">
            <div className="bg-etc-sub relative flex size-16 items-center justify-center overflow-hidden rounded-full border md:size-14">
              {profile?.avatar_url ? (
                <Image
                  unoptimized
                  src={profile.avatar_url}
                  alt="프로필"
                  sizes="(min-width: 768px) 56px, 64px"
                  fill
                  className="object-cover"
                />
              ) : (
                <User strokeWidth={1.2} className="text-etc h-10 w-10" />
              )}
            </div>
          </div>
          <div className="flex h-full flex-col items-center justify-center overflow-hidden">
            <div className="text-desc1 w-full text-center font-bold">
              {profile?.nickname || "닉네임 정보 없음"}
            </div>
            <div className="text-muted-foreground text-caption w-full truncate text-center sm:text-left">
              {profile?.email || "이메일 정보 없음"}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <MypageProfileDialog profile={profile} />
          <Button
            variant="outline"
            className="border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive w-full font-bold shadow-sm md:hidden"
            onClick={handleLogoutClick}
          >
            로그아웃
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
