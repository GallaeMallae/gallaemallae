"use client";

import MypageProfileDialog from "@/components/mypage/MypageProfileDialog";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import Image from "next/image";
import { useProfileData } from "@/hooks/queries/useProfileData";

export default function MypageProfileCard() {
  const { data: profile } = useProfileData();

  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl">
      <CardContent className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex h-full flex-col items-center justify-center gap-4 md:gap-2">
          <div className="flex shrink-0 items-center justify-center">
            <div className="bg-etc-sub relative flex size-16 items-center justify-center overflow-hidden rounded-full border md:size-14">
              {profile?.avatar_url ? (
                <Image
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
        <MypageProfileDialog profile={profile} />
      </CardContent>
    </Card>
  );
}
