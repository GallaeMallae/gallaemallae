import {
  FetchWeatherResponse,
  FetchAirPollutionResponse,
} from "@/types/apiResponse";
import {
  WeatherCardItem,
  Event,
  EventCardItem,
  CategoryId,
} from "@/types/common";
import { CATEGORY_NAME_MAP } from "@/lib/constants";

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
  const weather = weatherData.weather?.[0];
  const airPollution = airPollutionData.list?.[0];
  const temperature = weatherData.main?.temp;

  if (!weather || !airPollution || temperature == null) {
    throw new Error("[OpenWeather API] : 유효하지 않은 기상 데이터");
  }

  return {
    location: isDefaultLocation ? "대한민국 서울" : locationName,
    weatherType: mapWeatherType(weather.main),
    temperature: Math.round(temperature),
    fineDust: mapPm10Level(airPollution.components.pm10),
    ultrafineDust: mapPm25Level(airPollution.components.pm2_5),
  };
}

/**
 * @param events - API로부터 조회한 이벤트 리스트
 * @returns EventCard 컴포넌트에서 사용할 데이터 객체
 */
export function mapEventCard(events: Event[]): EventCardItem[] {
  return events.map((event) => {
    const categoryId = (event.categories?.[0] as CategoryId) ?? "etc";

    const fullRegionAddress = [event.sido, event.sigungu, event.eupmyeondong]
      .filter(Boolean)
      .join(" ");

    return {
      id: event.id,
      title: event.name ?? "행사 제목 없음",
      location: event.venue || fullRegionAddress || "장소 정보 없음",
      startDate: event.start_date,
      endDate: event.end_date ?? event.start_date,
      category: CATEGORY_NAME_MAP[categoryId] ?? "기타",
      isLiked: false,
    };
  });
}
