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
