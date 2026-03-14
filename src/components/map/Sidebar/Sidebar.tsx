"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SidebarSearch from "@/components/map/Sidebar/SidebarSearch";
import SidebarPeriodFilterTabs from "@/components/map/Sidebar/SidebarPeriodFilterTabs";
import SidebarDistance from "@/components/map/Sidebar/SidebarDistance";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import { CATEGORY_MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PeriodFilter } from "@/types/common";

export default function Sidebar({
  radius,
  setRadius,
}: {
  radius: number | null;
  setRadius: (r: number | null) => void;
}) {
  const [active, setActive] = useState("all");
  const [period, setPeriod] = useState<PeriodFilter>("전체");

  return (
    <>
      {/* ======= 데스크탑 ======= */}
      <div className="bg-background-base hidden flex-col justify-center gap-6 p-6 md:flex">
        <SidebarSearch />
        <div className="flex items-center justify-between">
          <p className="text-title2 font-bold">필터</p>
          <Button
            variant="ghost"
            className="text-symbol-sky text-caption hover:text-symbol-sky"
          >
            초기화
          </Button>
        </div>

        <div>
          <p className="text-desc1 text-etc font-bold">카테고리</p>
          <Tabs value={active} orientation="vertical" onValueChange={setActive}>
            <TabsList className="flex w-full gap-2 bg-transparent p-0">
              {CATEGORY_MENU.map((category) => {
                const Icon = category.Icon;

                return (
                  <TabsTrigger
                    key={category.name}
                    value={category.name}
                    className={cn(
                      "data-[state=active]:bg-symbol-sky-sub",
                      "data-[state=active]:text-symbol-sky",
                      "data-[state=active]:text-symbol-sky",
                      "hover:bg-etc/10 flex items-center justify-start gap-4 rounded-lg px-4 py-4",
                    )}
                  >
                    <Icon className="size-6" />
                    <span className="text-desc1">{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-col gap-4">
          <SidebarPeriodFilterTabs value={period} onChange={setPeriod} />
          <SidebarDistance radius={radius} setRadius={setRadius} />
        </div>

        <Button className="bg-symbol-sky h-13 w-full gap-4 rounded-xl hover:opacity-90">
          <ListFilter className="size-6" />
          <span className="text-title2 font-bold text-white">
            필터 적용하기
          </span>
        </Button>
      </div>

      {/* ======= 모바일 ======= */}
      <div className="flex w-full flex-col gap-4 p-2 md:hidden">
        <SidebarSearch />

        <div className="flex flex-col gap-2">
          <div className="flex w-full gap-2">
            <div className="flex-1 rounded-lg bg-white">
              <SidebarPeriodFilterTabs value={period} onChange={setPeriod} />
            </div>

            <div className="flex-1 rounded-lg bg-white">
              <SidebarDistance radius={radius} setRadius={setRadius} />
            </div>
          </div>

          <Tabs value={active} onValueChange={setActive}>
            <TabsList className="flex w-full rounded-xl bg-white shadow-sm">
              {CATEGORY_MENU.map((category) => (
                <TabsTrigger
                  key={category.name}
                  value={category.name}
                  className={cn(
                    "text-caption flex-1 rounded-lg py-2 text-center transition-all",
                    "data-[state=active]:bg-symbol-sky data-[state=active]:text-white",
                    "data-[state=inactive]:text-etc",
                    "data-[state=inactive]:hover:bg-muted",
                  )}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </>
  );
}
