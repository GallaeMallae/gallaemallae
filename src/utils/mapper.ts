import { FetchWeatherResponse } from "@/types/apiResponse";
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
 * @param weatherData - OpenWeather API에서 받은 날씨 데이터
 * @param locationName - 사용자가 위치한 지역명
 * @param isDefaultLocation - 기본 위치 여부
 * @returns WeatherCard 컴포넌트에서 사용할 데이터 객체
 */
export function mapWeatherCard(
  weatherData: FetchWeatherResponse,
  locationName: string,
  isDefaultLocation: boolean,
): WeatherCardItem {
  return {
    weatherType: mapWeatherType(weatherData.weather[0].main),
    location: isDefaultLocation ? "대한민국 서울" : locationName,
    temperature: Math.round(weatherData.main.temp),
    fineDust: "좋음",
    ultrafineDust: "보통",
  };
}
