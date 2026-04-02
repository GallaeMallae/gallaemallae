"use client";

import MypageSelectedDateEventsCard from "@/components/mypage/MypageSelectedDateEventsCard";
import { MypageCalendar } from "@/components/mypage/MypageCalendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Event, EventPlanWithEvent, Profile } from "@/types/common";
import { useMemo, useState } from "react";
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

type CalendarMode = "plan" | "like";

interface MypageCalendarSectionProps {
  plannedEvents?: EventPlanWithEvent[];
  likedEvents?: Event[];
  profile?: Profile;
  onDetailClick: (id: string) => void;
}

export default function MypageCalendarSection({
  plannedEvents = [],
  likedEvents = [],
  profile,
  onDetailClick,
}: MypageCalendarSectionProps) {
  const [viewMode, setViewMode] = useState<CalendarMode>("plan");

  const router = useRouter();
  const searchParams = useSearchParams();
  const isDesktop = useIsDesktop();
  const dateParam = searchParams.get("date");
  const monthParam = searchParams.get("month");

  const selectedDate = useMemo(
    () => (dateParam ? (parseSafeDate(dateParam) ?? undefined) : undefined),
    [dateParam],
  );
  const currentMonth = useMemo(
    () =>
      monthParam
        ? parse(monthParam, "yyyy-MM", new Date())
        : startOfMonth(selectedDate ?? new Date()),
    [monthParam, selectedDate],
  );

  const calendarDisplayEvents = useMemo(() => {
    if (viewMode === "plan") {
      return plannedEvents.map((plan) => ({
        ...plan.event,
        start_date: plan.visit_date || plan.event.start_date,
        end_date: plan.visit_date || plan.event.start_date,
        plan_id: plan.id,
      }));
    }

    return likedEvents.map((event) => ({
      ...event,
    }));
  }, [plannedEvents, likedEvents, viewMode]);

  const dailyEvents = useMemo(() => {
    if (!selectedDate) return [];
    const targetDate = startOfDay(selectedDate);

    return calendarDisplayEvents.filter((event) => {
      const start = startOfDay(parseISO(event.start_date));
      const end = startOfDay(parseISO(event.end_date));

      return isWithinInterval(targetDate, { start, end });
    });
  }, [selectedDate, calendarDisplayEvents]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [prevDateParam, setPrevDateParam] = useState<string | null>(dateParam);

  if (dateParam !== prevDateParam) {
    setPrevDateParam(dateParam);

    const hasEvents = dailyEvents.length > 0;

    if (!isDesktop && dateParam && hasEvents) {
      setIsDrawerOpen(true);
    } else if (!dateParam) {
      setIsDrawerOpen(false);
    }
  }

  const updateURL = (date?: Date, month?: Date) => {
    const params = new URLSearchParams(searchParams.toString());

    if (date) {
      params.set("date", format(date, "yyyy-MM-dd"));
      params.set("month", format(date, "yyyy-MM"));
    } else {
      params.delete("date");
    }

    if (month && !date) params.set("month", format(month, "yyyy-MM"));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCalendarSelect = (date: Date | undefined) => updateURL(date);
  const handleMonthChange = (newMonth: Date) => updateURL(undefined, newMonth);
  const handlePopoverChange = (date: Date | null) => {
    updateURL(date ?? undefined);
  };
  const handleDrawerChange = (open: boolean) => {
    setIsDrawerOpen(open);
    if (!open) updateURL(undefined);
  };

  return (
    <div className="order-1 flex flex-col gap-6 md:order-2 md:col-span-3">
      <div className="xs:p-6 flex-1 rounded-2xl border bg-white p-4 shadow-sm">
        <MypageCalendar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          calendarDisplayEvents={calendarDisplayEvents}
          mode="single"
          selected={selectedDate} //
          month={currentMonth}
          onSelect={handleCalendarSelect}
          onMonthChange={handleMonthChange}
          nickname={profile?.nickname ?? undefined}
          activePopoverDate={selectedDate ?? null}
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
