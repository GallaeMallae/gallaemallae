"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PERIOD_FILTER_TABS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PeriodFilter } from "@/types/common";

interface PeriodFilterTabsProps {
  value: PeriodFilter;
  onChange: (value: PeriodFilter) => void;
}

export default function SidebarPeriodFilterTabs({
  value,
  onChange,
}: PeriodFilterTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onChange(v as PeriodFilter)}
      className="w-full"
    >
      <TabsList className="flex w-full gap-1 rounded-xl bg-white p-1 shadow-sm">
        {PERIOD_FILTER_TABS.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn(
              "text-caption flex-1 cursor-pointer rounded-lg text-center sm:text-xs",
              "data-[state=active]:bg-symbol-sky data-[state=active]:text-white",
              "data-[state=inactive]:text-etc data-[state=inactive]:bg-transparent",
              "data-[state=inactive]:hover:bg-muted",
            )}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
