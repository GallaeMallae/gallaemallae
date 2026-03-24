"use client";

import Sidebar from "@/components/map/Sidebar/Sidebar";
import Area from "@/components/map/Area/Area";
import { useState, useEffect } from "react";
import { CategoryId, PeriodFilter } from "@/types/common";
import { useSearchParams, useRouter } from "next/navigation";

export default function MapPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const qCategory = searchParams.get("category");
  const qMode = searchParams.get("mode");

  const [category, setCategory] = useState<CategoryId[]>(
    qCategory ? [qCategory as CategoryId] : ["all"],
  );
  const [mode, setMode] = useState<"all" | "near">(
    qMode === "near" ? "near" : "all",
  );

  const [radius, setRadius] = useState<number | null>(null);
  const [period, setPeriod] = useState<PeriodFilter>("전체");
  const [search, setSearch] = useState("");

  const effectiveRadius = mode === "near" ? 5000 : radius;

  useEffect(() => {
    const params = new URLSearchParams();

    params.set("mode", mode);

    if (category[0] && category[0] !== "all") {
      params.set("category", category[0]);
    }

    router.replace(`/map?${params.toString()}`);
  }, [category, mode]);

  return (
    <div className="relative w-full overflow-hidden md:flex">
      <div className="absolute top-0 left-0 z-20 w-full md:relative md:block md:w-90 md:shrink-0">
        <Sidebar
          radius={radius}
          setRadius={setRadius}
          category={category}
          setCategory={setCategory}
          period={period}
          setPeriod={setPeriod}
          search={search}
          setSearch={setSearch}
        />
      </div>

      <div className="flex-1">
        <Area
          radius={radius || effectiveRadius}
          category={category}
          period={period}
          search={search}
        />
      </div>
    </div>
  );
}
