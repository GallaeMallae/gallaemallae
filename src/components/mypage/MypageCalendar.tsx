"use client";

import { Calendar } from "@/components/ui/calendar";

interface MypageCalendarProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  month: Date;
  onMonthChange: (date: Date) => void;
}

export function MypageCalendar({
  selectedDate,
  onDateChange,
  month,
  onMonthChange,
}: MypageCalendarProps) {
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onDateChange}
      month={month}
      onMonthChange={onMonthChange}
      className="rounded-lg"
      captionLayout="dropdown"
    />
  );
}
