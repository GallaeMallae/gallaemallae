"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface SidebarDistanceProps {
  radius: number | null;
  setRadius: (r: number | null) => void;
}

export default function SidebarDistance({
  radius,
  setRadius,
}: SidebarDistanceProps) {
  const distances = [
    { label: "전체", value: "all" },
    { label: "5km", value: "5000" },
    { label: "10km", value: "10000" },
  ];

  return (
    <Tabs
      value={radius === null ? "all" : String(radius)}
      onValueChange={(v) => {
        if (v === "all") setRadius(null);
        else setRadius(Number(v));
      }}
      className="w-full"
    >
      <TabsList className="flex w-full gap-1 rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
        {distances.map((d) => (
          <TabsTrigger
            key={d.label}
            value={d.value}
            className={cn(
              "text-caption flex-1 cursor-pointer rounded-lg py-2 text-center transition-all",
              "data-[state=active]:bg-symbol-sky data-[state=active]:text-white",
              "data-[state=inactive]:text-etc data-[state=inactive]:bg-transparent",
              "data-[state=inactive]:hover:bg-muted",
            )}
          >
            {d.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
