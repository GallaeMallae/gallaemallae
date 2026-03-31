import { Event, RecommendType } from "./common";

// OpenAI API 갈래말래 추천 Res
export interface FetchRecommendTypeResponse {
  recommendType: RecommendType;
  comment: string;
}

// OpenWeather Weather API Res
export interface FetchWeatherResponse {
  weather: {
    id: number;
    main: string; // 날씨 타입
  }[];

  main: {
    temp: number; // 기온
  };
}

// OpenWeather Forecast API Res
export interface FetchForecastResponse {
  list: {
    dt_txt: string; // "2026-01-01 12:00:00"

    weather: {
      id: number;
      main: string; // 날씨 타입
    }[];

    main: {
      temp: number; // 기온
      humidity: number; // 습도
    };

    wind: {
      speed: number; // 풍속
    };
  }[];
}

// OpenWeather Air Pollution API Res
export interface FetchAirPollutionResponse {
  list: {
    main: { aqi: number }; // 종합 지수
    components: { pm10: number; pm2_5: number }; // pm10: 미세먼지 & pm2_5: 초미세먼지
  }[];
}

// Kakao coord2address API Res
export interface FetchLocationNameResponse {
  documents: {
    address: {
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_name: string;
    };
  }[];
}

// OpenAI API 마이페이지 행사 추천 Res
export interface FetchMypageRecommendEventResponse extends Event {
  recommendReason: string; // 나중에 recommendReason 필요없어지면 그냥 Event 타입 써도됨
}
