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

export function calculateDDay(targetDate?: string | Date | null) {
  if (!targetDate) return "일정 미정";

  const DAY = 86400000;

  const today = new Date();
  const target = new Date(targetDate);

  const todayMid = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const targetMid = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
  );

  const diffDays = Math.ceil((targetMid.getTime() - todayMid.getTime()) / DAY);

  if (diffDays === 0) return "D-Day";
  if (diffDays > 0) return `D-${diffDays}`;
  return `D+${Math.abs(diffDays)}`;
}
