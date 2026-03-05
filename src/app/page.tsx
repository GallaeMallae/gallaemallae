"use client";

import CategoryMenu from "@/components/home/CategoryMenu";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import { useState } from "react";
import { PeriodFilter } from "@/types/common";
import { MOCK_EVENTS } from "@/mocks/events";

export default function Home() {
  const [selectedPeriodTab, setSelectedPeriodTab] =
    useState<PeriodFilter>("전체");

  return (
    <div className="flex flex-col gap-8">
      <CategoryMenu />
      <UpcomingEvents
        events={MOCK_EVENTS}
        period={selectedPeriodTab}
        onPeriodChange={setSelectedPeriodTab}
      />
    </div>
  );
}
