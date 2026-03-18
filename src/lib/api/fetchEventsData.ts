export async function getAllEvents() {
  const res = await fetch("/api/events");

  if (!res.ok) {
    throw new Error("이벤트 불러오기 실패");
  }

  return res.json();
}
