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
