export interface FetchWeatherResponse {
  weather: {
    id: number;
    main: string;
  }[];

  main: {
    temp: number;
  };

  name: string;
}
