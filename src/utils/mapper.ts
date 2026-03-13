import {
  FetchWeatherResponse,
  FetchAirPollutionResponse,
} from "@/types/apiResponse";
import { WeatherCardItem } from "@/types/common";

/**
 * @param type - OpenWeather API에서 제공하는 날씨 타입 (ex: Clear, Clouds, Rain, Snow 등)
 * @returns 앱에서 사용하는 날씨 타입 (sunny | cloudy | rainy | snowy)
 */
export function mapWeatherType(type: string) {
  switch (type) {
    case "Clear":
      return "sunny";
    case "Clouds":
      return "cloudy";
    case "Rain":
    case "Drizzle":
    case "Thunderstorm":
      return "rainy";
    case "Snow":
      return "snowy";
    default:
      return "cloudy";
  }
}

/**
 * @param pm10 - 미세먼지 농도 (㎍/m³)
 * @returns "좋음" | "보통" | "나쁨" | "매우 나쁨" (환경부 미세먼지 등급 기준)
 */
export function mapPm10Level(pm10: number) {
  if (pm10 <= 30) return "좋음";
  if (pm10 <= 80) return "보통";
  if (pm10 <= 150) return "나쁨";
  return "매우 나쁨";
}

/**
 * @param pm25 - 초미세먼지 농도 (㎍/m³)
 * @returns "좋음" | "보통" | "나쁨" | "매우 나쁨" (환경부 초미세먼지 등급 기준)
 */
export function mapPm25Level(pm25: number) {
  if (pm25 <= 15) return "좋음";
  if (pm25 <= 35) return "보통";
  if (pm25 <= 75) return "나쁨";
  return "매우 나쁨";
}

/**
 * @param locationName - 사용자가 위치한 지역명
 * @param weatherData - OpenWeather API에서 받은 날씨 데이터
 * @param airPollutionData = OpenWeather API에서 받은 대기질 데이터
 * @param isDefaultLocation - 기본 위치 여부
 * @returns WeatherCard 컴포넌트에서 사용할 데이터 객체
 */
export function mapWeatherCard(
  locationName: string,
  weatherData: FetchWeatherResponse,
  airPollutionData: FetchAirPollutionResponse,
  isDefaultLocation: boolean,
): WeatherCardItem {
  return {
    location: isDefaultLocation ? "대한민국 서울" : locationName,
    weatherType: mapWeatherType(weatherData.weather[0].main),
    temperature: Math.round(weatherData.main.temp),
    fineDust: mapPm10Level(airPollutionData.list[0].components.pm10),
    ultrafineDust: mapPm25Level(airPollutionData.list[0].components.pm2_5),
  };
}
