"use client";

import { Button } from "@/components/ui/button";
import SidebarSearch from "@/components/map/Sidebar/SidebarSearch";
import SidebarPeriodFilterTabs from "@/components/map/Sidebar/SidebarPeriodFilterTabs";
import SidebarDistance from "@/components/map/Sidebar/SidebarDistance";
import { CATEGORY_MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CategoryId, PeriodFilter } from "@/types/common";

export default function Sidebar({
  radius,
  setRadius,
  category,
  setCategory,
  period,
  setPeriod,
  search,
  setSearch,
}: {
  radius: number | null;
  setRadius: (r: number | null) => void;
  category: CategoryId[];
  setCategory: (c: CategoryId[]) => void;
  period: PeriodFilter;
  setPeriod: (p: PeriodFilter) => void;
  search: string;
  setSearch: (s: string) => void;
}) {
  const toggleCategory = (id: CategoryId) => {
    if (id === "all") {
      setCategory(["all"]);
      return;
    }

    const base = category.filter((c) => c !== "all");
    if (base.includes(id)) {
      const next = base.filter((c) => c !== id);
      setCategory(next.length ? next : ["all"]);
    } else {
      setCategory([...base, id]);
    }
  };
  const handleReset = () => {
    setCategory(["all"]);
    setRadius(null);
    setPeriod("전체");
    setSearch("");
  };

  return (
    <>
      {/* ======= 데스크탑 ======= */}
      <div className="bg-background-base hidden flex-col justify-center gap-6 p-6 md:flex">
        <SidebarSearch value={search} onChange={setSearch} />

        <div className="flex items-center justify-between">
          <p className="text-title2 font-bold">필터</p>
          <Button
            variant="ghost"
            onClick={handleReset}
            className="text-symbol-sky text-caption hover:text-symbol-sky"
          >
            초기화
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-desc1 text-etc font-bold">카테고리</p>
          <div className="flex w-full flex-col gap-2">
            {CATEGORY_MENU.map((item) => {
              const Icon = item.Icon;
              const isActive = category.includes(item.id as CategoryId);

              return (
                <button
                  key={item.id}
                  onClick={() => toggleCategory(item.id as CategoryId)}
                  className={cn(
                    "flex cursor-pointer items-center justify-start gap-4 rounded-lg px-4 py-4 transition-all",
                    isActive
                      ? "bg-symbol-sky-sub text-symbol-sky"
                      : "hover:bg-etc/10 text-etc",
                  )}
                >
                  <Icon className="size-6" />
                  <span className="text-desc1">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <SidebarPeriodFilterTabs value={period} onChange={setPeriod} />
          <SidebarDistance radius={radius} setRadius={setRadius} />
        </div>
      </div>

      {/* ======= 모바일 ======= */}
      <div className="flex w-full flex-col gap-4 p-2 md:hidden">
        <SidebarSearch value={search} onChange={setSearch} />

        <div className="flex flex-col gap-2">
          <div className="flex w-full gap-2">
            <div className="flex-1 rounded-lg bg-white">
              <SidebarPeriodFilterTabs value={period} onChange={setPeriod} />
            </div>

            <div className="flex-1 rounded-lg bg-white">
              <SidebarDistance radius={radius} setRadius={setRadius} />
            </div>
          </div>

          <div className="flex w-full rounded-xl bg-white shadow-sm">
            {CATEGORY_MENU.map((item) => {
              const isActive = category.includes(item.id as CategoryId);

              return (
                <button
                  key={item.id}
                  onClick={() => toggleCategory(item.id as CategoryId)}
                  className={cn(
                    "text-caption flex-1 cursor-pointer rounded-lg py-2 text-center transition-all",
                    isActive
                      ? "bg-symbol-sky text-white"
                      : "text-etc hover:bg-muted",
                  )}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
