"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { PeriodFilter } from "@/types/common";
import { PERIOD_FILTER_TABS } from "@/lib/constants";

interface PeriodFilterTabsProps {
  value: PeriodFilter;
  onChange: (value: PeriodFilter) => void;
}

export default function PeriodFilterTabs({
  value,
  onChange,
}: PeriodFilterTabsProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as PeriodFilter)}>
      <TabsList className="inline-flex gap-2 border bg-white p-2">
        {PERIOD_FILTER_TABS.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn(
              "text-desc2 cursor-pointer py-3",
              "data-[state=active]:bg-symbol-sky data-[state=active]:text-white",
              "data-[state=inactive]:bg-white data-[state=inactive]:text-black",
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
