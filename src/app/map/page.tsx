"use client";

import Sidebar from "@/components/map/Sidebar/Sidebar";
import Area from "@/components/map/Area/Area";
import { useMapFilter } from "@/hooks/useMapFilter";

export default function MapPage() {
  const {
    radius,
    setRadius,
    category,
    setCategory,
    period,
    setPeriod,
    search,
    setSearch,
  } = useMapFilter();

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
