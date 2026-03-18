import { FetchRecommendTypeResponse } from "@/types/apiResponse";
import { Event } from "@/types/common";

export async function fetchRecommendType(
  weather: string,
  temp: number,
  pm10: number,
  pm25: number,
): Promise<FetchRecommendTypeResponse> {
  const res = await fetch("/api/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weather,
      temp,
      pm10,
      pm25,
    }),
  });

  if (!res.ok) throw new Error("[OpenAI API] : 추천 조회 실패");

  return res.json();
}

export async function fetchMyPageRecommendEvent(): Promise<Event> {
  const res = await fetch("/api/mypage/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("[OpenAI API] : 행사 추천 실패");

  return res.json();
}
