// OpenWeather API Res
export interface FetchWeatherResponse {
  weather: {
    id: number;
    main: string;
  }[];

  main: {
    temp: number;
  };
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
