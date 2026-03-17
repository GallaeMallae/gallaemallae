"use client";

import { Calendar } from "@/components/ui/calendar";
import { MypageDisplayEvent } from "@/types/common";

interface MypageCalendarProps {
  plannedEvents: MypageDisplayEvent[];
  selectedDate: Date | undefined;
  month: Date;
  onDateChange: (date: Date | undefined) => void;
  onMonthChange: (date: Date) => void;
}

export function MypageCalendar({
  plannedEvents,
  selectedDate,
  month,
  onDateChange,
  onMonthChange,
}: MypageCalendarProps) {
  return (
    <Calendar
      mode="single"
      plannedEvents={plannedEvents}
      selected={selectedDate}
      onSelect={onDateChange}
      month={month}
      onMonthChange={onMonthChange}
      captionLayout="dropdown"
    />
  );
}
