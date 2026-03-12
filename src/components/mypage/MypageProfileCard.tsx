"use client";

import MypageProfileDialog from "@/components/mypage/MypageProfileDialog";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import Image from "next/image";
import { fetchProfile } from "@/lib/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { User as SupabaseUser } from "@supabase/supabase-js";

export default function MypageProfileCard() {
  const supabase = createClient();
  const { data: user } = useQuery<SupabaseUser | null>({
    queryKey: QUERY_KEYS.USER,
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
    staleTime: Infinity,
  });
  const { data: profile } = useQuery({
    queryKey: QUERY_KEYS.PROFILE(user?.id),
    queryFn: () => fetchProfile(supabase, user!.id),
    enabled: !!user?.id,
  });

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
              {profile?.email || user?.email || "이메일 정보 없음"}
            </div>
          </div>
        </div>
        <MypageProfileDialog profile={profile} />
      </CardContent>
    </Card>
  );
}
