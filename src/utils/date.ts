import { differenceInCalendarDays, isValid, parseISO } from "date-fns";

export function formatDate(date: string | Date) {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  return `${yyyy}. ${mm}. ${dd}`;
}

export function formatDateRange(start: string | Date, end: string | Date) {
  const startFormatted = formatDate(start);
  const endFormatted = formatDate(end);

  if (startFormatted === endFormatted) {
    return startFormatted;
  }

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
