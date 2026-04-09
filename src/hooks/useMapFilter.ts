"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CategoryId, PeriodFilter } from "@/types/common";

export function useMapFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode") ?? "all";
  const categoryParam = searchParams.get("category");
  const periodParam = searchParams.get("period");
  const distanceParam = searchParams.get("distance");
  const searchParam = searchParams.get("search");

  const [radius, setRadius] = useState<number | null>(() => {
    if (distanceParam) return Number(distanceParam);
    return mode === "near" ? 5000 : null;
  });

  const [category, setCategory] = useState<CategoryId[]>(() => {
    if (!categoryParam) return ["all"];
    return [categoryParam as CategoryId];
  });

  const [period, setPeriod] = useState<PeriodFilter>(
    (periodParam as PeriodFilter) ?? "전체",
  );

  const [search, setSearch] = useState(searchParam ?? "");

  useEffect(() => {
    const params = new URLSearchParams();
    if (mode) params.set("mode", mode);
    if (category[0] !== "all") {
      params.set("category", category[0]);
    }
    if (period !== "전체") {
      params.set("period", period);
    }
    if (radius) {
      params.set("distance", String(radius));
    }
    if (search) {
      params.set("search", search);
    }
    router.replace(`/map?${params.toString()}`);
  }, [mode, category, period, radius, search, router]);

  return {
    mode,
    radius,
    setRadius,
    category,
    setCategory,
    period,
    setPeriod,
    search,
    setSearch,
  };
}
