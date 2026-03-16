"use client";

import Sidebar from "@/components/map/Sidebar/Sidebar";
import Area from "@/components/map/Area/Area";
import { useState } from "react";
import { Category } from "@/types/common";

export default function MapPage() {
  const [radius, setRadius] = useState<number | null>(null);
  const [category, setCategory] = useState<Category>("all");

  return (
    <div className="relative w-full overflow-hidden md:flex">
      <div className="absolute top-0 left-0 z-20 w-full md:relative md:block md:w-90 md:shrink-0">
        <Sidebar
          radius={radius}
          setRadius={setRadius}
          category={category}
          setCategory={setCategory}
        />
      </div>

      <div className="flex-1">
        <Area radius={radius} category={category} />
      </div>
    </div>
  );
}
