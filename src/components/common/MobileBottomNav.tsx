"use client";

import { House, Map, MapPin, CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { useUserData } from "@/hooks/queries/useUserData";
import { useOpenAlertModal } from "@/stores/alertModalStore";
import React from "react";

type Menu = {
  href: string;
  name: string;
  icon: LucideIcon;
  mode?: string;
  requireAuth?: boolean;
};

const MENUS: Menu[] = [
  { href: "/", name: "홈", icon: House },
  { href: "/map", name: "지도 검색", icon: Map, mode: "all" },
  { href: "/map", name: "주변 검색", icon: MapPin, mode: "near" },
  { href: "/mypage", name: "마이페이지", icon: CircleUser, requireAuth: true },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentMapMode = searchParams.get("mode");
  const openAlert = useOpenAlertModal();
  const router = useRouter();

  const { user, isLoading } = useUserData();

  const isActive = (menu: Menu) => {
    if (menu.href === "/") {
      return pathname === "/";
    }

    if (menu.href === "/map") {
      return pathname === "/map" && currentMapMode === menu.mode;
    }

    return pathname === menu.href;
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    menu: Menu,
  ) => {
    if (menu.requireAuth && !isLoading && !user) {
      e.preventDefault();

      openAlert({
        title: "로그인이 필요한 기능입니다.",
        description: "로그인 페이지로 이동하시겠습니까?",
        onAction: () => {
          router.push("/login?next=/mypage");
        },
      });
    }
  };

  return (
    <nav
      className="pb-safe fixed bottom-0 z-10 w-full border-t bg-white md:hidden"
      aria-label="모바일 하단 네비게이션"
    >
      <div className="flex h-16 items-center justify-around">
        {MENUS.map((menu) => {
          const href = menu.mode ? `${menu.href}?mode=${menu.mode}` : menu.href;
          const Icon = menu.icon;
          const active = isActive(menu);

          return (
            <Link
              className="text-caption flex flex-col items-center justify-center gap-1"
              key={menu.name}
              href={href}
              aria-current={active ? "page" : undefined}
              onClick={(e) => handleLinkClick(e, menu)}
            >
              <Icon
                className={cn(
                  "h-6 w-6",
                  active ? "text-symbol-sky" : "text-etc",
                )}
              />
              <span
                className={cn(
                  active ? "text-symbol-sky font-bold" : "text-etc",
                )}
              >
                {menu.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
