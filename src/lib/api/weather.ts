import { FetchWeatherResponse } from "@/types/apiResponse";

export async function fetchWeather(
  latitude: number,
  longitude: number,
): Promise<FetchWeatherResponse> {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`,
  );

  if (!res.ok) throw new Error("[OpenWeather API] : 날씨 조회 실패");

  return res.json();
}
