"use client";

import MypageSelectedDateEventsCard from "@/components/mypage/MypageSelectedDateEventsCard";
import { Calendar } from "@/components/ui/calendar";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventPlanWithEvent } from "@/hooks/queries/usePlannedEventsData";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Profile } from "@/types/common";
import { useState } from "react";
import {
  format,
  isWithinInterval,
  parse,
  parseISO,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { parseSafeDate } from "@/utils/date";

interface MypageCalendarSectionProps {
  plannedEvents?: EventPlanWithEvent[];
  profile?: Profile;
  onDetailClick: (id: string) => void;
}

export default function MypageCalendarSection({
  plannedEvents,
  profile,
  onDetailClick,
}: MypageCalendarSectionProps) {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const monthParam = searchParams.get("month");
  const parsedDate = dateParam ? parseSafeDate(dateParam) : undefined;
  const selectedDate = parsedDate ?? undefined;

  const [prevDateParam, setPrevDateParam] = useState<string | null>(dateParam);
  const [activePopoverDate, setActivePopoverDate] = useState<Date | null>(
    dateParam ? parseSafeDate(dateParam) : null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const router = useRouter();
  const isDesktop = useIsDesktop();

  const currentMonth = monthParam
    ? parse(monthParam, "yyyy-MM", new Date())
    : startOfMonth(selectedDate ?? new Date());

  const formattedPlannedEvents = (plannedEvents ?? []).map((plan) => ({
    ...plan.event,
    display_date: plan.visit_date || plan.event.start_date,
    plan_id: plan.id,
  }));

  const dailyEvents = formattedPlannedEvents.filter((event) => {
    if (!selectedDate) return false;
    const targetDate = startOfDay(selectedDate);
    return isWithinInterval(targetDate, {
      start: parseISO(event.start_date),
      end: parseISO(event.end_date),
    });
  });

  const handleMonthChange = (newMonth: Date) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", format(newMonth, "yyyy-MM"));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (dateParam !== prevDateParam) {
    const newDate = parseSafeDate(dateParam);
    if (newDate) {
      const hasEvents = formattedPlannedEvents.some((event) => {
        const targetDate = startOfDay(newDate);
        return isWithinInterval(targetDate, {
          start: parseISO(event.start_date),
          end: parseISO(event.end_date),
        });
      });

      if (!isDesktop && hasEvents) {
        setIsDrawerOpen(true);
      }
    } else {
      setActivePopoverDate(null);
    }
    setPrevDateParam(dateParam);
  }

  const handleCalendarSelect = (date: Date | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (date) {
      params.set("date", format(date, "yyyy-MM-dd"));
      params.set("month", format(date, "yyyy-MM"));
    } else {
      params.delete("date");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handlePopoverChange = (date: Date | null) => {
    if (date === null) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("date");
      router.push(`?${params.toString()}`, { scroll: false });
    }
    setActivePopoverDate(date);
  };

  const handleDrawerChange = (open: boolean) => {
    setIsDrawerOpen(open);
    if (!open) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("date");
      router.push(`?${params.toString()}`, { scroll: false });
      setActivePopoverDate(null);
    }
  };

  return (
    <div className="order-1 flex flex-col gap-6 md:order-2 md:col-span-3">
      <div className="xs:p-6 flex-1 rounded-2xl border bg-white p-4 shadow-sm">
        <Calendar
          mode="single"
          plannedEvents={formattedPlannedEvents}
          selected={selectedDate}
          month={currentMonth}
          onSelect={handleCalendarSelect}
          onMonthChange={handleMonthChange}
          nickname={profile?.nickname ?? undefined}
          activePopoverDate={activePopoverDate}
          onActivePopoverDate={handlePopoverChange}
          onDetailClick={onDetailClick}
          isDesktop={isDesktop}
          captionLayout="dropdown"
        />
      </div>

      {!isDesktop && (
        <Drawer open={isDrawerOpen} onOpenChange={handleDrawerChange}>
          <DrawerTitle className="sr-only">선택한 날짜 일정</DrawerTitle>
          <DrawerContent>
            <div className="flex h-[60dvh] max-h-128 w-full flex-col justify-center p-6">
              <ScrollArea className="min-h-0 flex-1">
                <MypageSelectedDateEventsCard
                  selectedDate={selectedDate}
                  events={dailyEvents}
                  onDetailClick={onDetailClick}
                />
              </ScrollArea>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
