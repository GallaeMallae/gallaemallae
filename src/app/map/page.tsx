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
  const qRadius = searchParams.get("radius");
  const qSearch = searchParams.get("search");

  const [radius, setRadius] = useState<number | null>(
    qRadius ? Number(qRadius) : null,
  );

  const [category, setCategory] = useState<CategoryId[]>(
    qCategory ? [qCategory as CategoryId] : ["all"],
  );

  const [period, setPeriod] = useState<PeriodFilter>("전체");
  const [search, setSearch] = useState(qSearch ?? "");

  useEffect(() => {
    const params = new URLSearchParams();

    if (category[0] && category[0] !== "all") {
      params.set("category", category[0]);
    }

    if (radius) {
      params.set("radius", String(radius));
    }

    if (search) {
      params.set("search", search);
    }

    router.replace(`/map?${params.toString()}`);
  }, [category, radius, search]);

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
          radius={radius}
          category={category}
          period={period}
          search={search}
        />
      </div>
    </div>
  );
}
