"use client";

import { Calendar } from "@/components/ui/calendar";

interface MypageCalendarProps {
  selectedDate: Date | undefined;
  month: Date;
  onDateChange: (date: Date | undefined) => void;
  onMonthChange: (date: Date) => void;
}

export function MypageCalendar({
  selectedDate,
  month,
  onDateChange,
  onMonthChange,
}: MypageCalendarProps) {
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onDateChange}
      month={month}
      onMonthChange={onMonthChange}
      captionLayout="dropdown"
    />
  );
}
