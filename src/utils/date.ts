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
