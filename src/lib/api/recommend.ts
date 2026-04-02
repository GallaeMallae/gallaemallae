import {
  FetchMypageRecommendEventResponse,
  FetchRecommendResponse,
} from "@/types/apiResponse";

export async function fetchOutdoorRecommend(
  weather: string,
  temp: number,
  pm10: number,
  pm25: number,
): Promise<FetchRecommendResponse> {
  const res = await fetch("/api/recommend/outdoor", {
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

  if (!res.ok) throw new Error("[OpenAI API] : 외출 추천 조회 실패");

  return res.json();
}

export async function fetchEventVisitRecommend(
  weather: string,
  temp: number,
  pm10: number,
  wind: number,
  wet: number,
) {
  const res = await fetch("/api/recommend/event_visit", {
    method: "POST",
    body: JSON.stringify({
      weather,
      temp,
      pm10,
      wind,
      wet,
    }),
  });

  if (!res.ok) throw new Error("[OpenAI API] : 행사 방문 추천 조회 실패");

  return res.json();
}

export async function fetchMypageRecommendEvent(
  userLocation: string,
): Promise<FetchMypageRecommendEventResponse | null> {
  const res = await fetch("/api/mypage/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userLocation }),
  });

  if (!res.ok) throw new Error("[OpenAI API] : 행사 추천 실패");

  const data = await res.json();

  return data ?? null;
}
