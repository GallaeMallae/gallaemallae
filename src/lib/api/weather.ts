import {
  FetchWeatherResponse,
  FetchAirPollutionResponse,
} from "@/types/apiResponse";

const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

export async function fetchWeather(
  latitude: number,
  longitude: number,
): Promise<FetchWeatherResponse> {
  const res = await fetch(
    `${OPENWEATHER_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`,
  );

  if (!res.ok) throw new Error("[OpenWeather API] : 날씨 조회 실패");

  return res.json();
}

export async function fetchAirPollution(
  latitude: number,
  longitude: number,
): Promise<FetchAirPollutionResponse> {
  const res = await fetch(
    `${OPENWEATHER_BASE_URL}/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`,
  );

  if (!res.ok) throw new Error("[OpenWeather API] : 미세먼지 조회 실패");

  return res.json();
}
