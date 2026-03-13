"use client";

import Sidebar from "@/components/map/Sidebar/Sidebar";
import Area from "@/components/map/Area/Area";
import { useState } from "react";

export default function MapPage() {
  const [radius, setRadius] = useState<number | null>(null);

  return (
    <div className="relative w-full overflow-hidden md:flex">
      <div className="hidden md:block md:w-90 md:shrink-0">
        <Sidebar radius={radius} setRadius={setRadius} />
      </div>

      <div className="flex-1">
        <Area radius={radius} />
      </div>
      <div className="absolute top-0 left-0 z-20 w-full md:hidden">
        <Sidebar radius={radius} setRadius={setRadius} />
      </div>
    </div>
  );
}
