"use client";

import { Calendar } from "@/components/ui/calendar";

interface MypageCalendarProps {
  selectedDate: Date | undefined;
  month: Date;
  onDateChange: (date: Date | undefined) => void;
  onMonthChange: (date: Date) => void;
  nickname?: string;
}

export function MypageCalendar({
  selectedDate,
  month,
  onDateChange,
  onMonthChange,
  nickname,
}: MypageCalendarProps) {
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      month={month}
      onSelect={onDateChange}
      onMonthChange={onMonthChange}
      nickname={nickname}
      captionLayout="dropdown"
    />
  );
}
