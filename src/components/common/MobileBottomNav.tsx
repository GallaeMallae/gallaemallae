"use client";

import { House, Map, MapPin, CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";

type Menu = {
  href: string;
  name: string;
  icon: LucideIcon;
  mode?: string;
};

export default function MobileBottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentMapMode = searchParams.get("mode");

  const menus: Menu[] = [
    { href: "/", name: "홈", icon: House },
    { href: "/map", name: "지도 검색", icon: Map, mode: "all" },
    { href: "/map", name: "주변 검색", icon: MapPin, mode: "near" },
    { href: "/mypage", name: "마이페이지", icon: CircleUser },
  ];

  const isActive = (menu: Menu) => {
    if (menu.href === "/") {
      return pathname === "/";
    }

    if (menu.href === "/map") {
      return pathname === "/map" && currentMapMode === menu.mode;
    }

    return pathname === menu.href;
  };

  return (
    <nav
      className="pb-safe fixed bottom-0 z-10 w-full border-t bg-white md:hidden"
      aria-label="모바일 하단 네비게이션"
    >
      <div className="flex h-16 items-center justify-around">
        {menus.map((menu) => {
          const href =
            menu.mode !== undefined
              ? `${menu.href}?mode=${menu.mode}`
              : menu.href;
          const Icon = menu.icon;

          const active = isActive(menu);

          return (
            <Link
              className="text-caption flex flex-col items-center justify-center gap-1"
              key={menu.name}
              href={href}
              aria-current={active ? "page" : undefined}
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
