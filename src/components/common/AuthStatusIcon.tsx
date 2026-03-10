"use client";

import { useProfileData } from "@/hooks/queries/useProfileData";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogOutIcon, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/queries/useUserData";
import { toast } from "sonner";

export default function AuthStatusIcon() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createClient();

  const { data: profile, isLoading: isProfileLoading } = useProfileData();
  const { data: user, isLoading: isUserLoading } = useUserData();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("로그아웃에 실패했습니다.");
      return;
    }

    queryClient.removeQueries({ queryKey: ["profile"] });
    queryClient.removeQueries({ queryKey: ["user"] });

    router.replace("/");
    // refresh 해야 바뀐 쿠키 상태를 반영할 수 있음
    router.refresh();
  };

  if (isUserLoading || isProfileLoading) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  if (user) {
    return (
      <div className="bg-etc-sub relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              aria-label="사용자 메뉴 열기"
              className="bg-etc-sub relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border"
            >
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
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/mypage">
                  <User />
                  마이페이지
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem variant="destructive" onSelect={handleLogout}>
              <LogOutIcon />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <Button className="hover:bg-symbol-sky" size="sm" asChild>
      <Link href="/login">로그인</Link>
    </Button>
  );
}
