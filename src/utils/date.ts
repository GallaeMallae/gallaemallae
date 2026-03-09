import { differenceInCalendarDays, format, isValid, parseISO } from "date-fns";

export function formatDate(date: string | Date | null | undefined): string {
  const parsedDate = parseSafeDate(date);
  if (!parsedDate) return "";

  return format(parsedDate, "yyyy. MM. dd");
}

export function formatDateRange(
  start: string | Date | null | undefined,
  end: string | Date | null | undefined,
): string {
  const startFormatted = formatDate(start);
  const endFormatted = formatDate(end);

  if (!startFormatted && !endFormatted) return "일정 미정";
  if (startFormatted === endFormatted || !endFormatted) {
    return startFormatted;
  }
  if (!startFormatted) return endFormatted;

  return `${startFormatted} ~ ${endFormatted}`;
}

export const parseSafeDate = (
  dateInput: string | Date | null | undefined,
): Date | null => {
  if (!dateInput) return null;

  const parsedDate =
    typeof dateInput === "string" ? parseISO(dateInput) : dateInput;

  return isValid(parsedDate) ? parsedDate : null;
};

export function calculateDDay(targetDate?: string | Date | null): string {
  const target = parseSafeDate(targetDate);
  if (!target) return "일정 미정";

  const today = new Date();
  const diffDays = differenceInCalendarDays(target, today);

  if (diffDays === 0) return "D-Day";
  if (diffDays > 0) return `D-${diffDays}`;
  return `D+${Math.abs(diffDays)}`;
}
