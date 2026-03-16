import { WEATHER_INFO_CARD_CONFIG } from "@/lib/constants";
import { WeatherInfoType } from "@/types/common";

const MOCK_WEATHER: Record<WeatherInfoType, string> = {
  temp: "24도",
  fineDust: "보통 (53)",
  wind: "1m/s",
  wet: "37%",
};

export default function EventWeatherInfoCard({
  type,
}: {
  type: WeatherInfoType;
}) {
  const config = WEATHER_INFO_CARD_CONFIG[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-row items-center gap-2 rounded bg-white px-2 py-4 shadow-sm">
      <Icon
        size={16}
        className={config.color}
        color="currentColor"
        fill="currentColor"
      />
      <div>
        <p className="text-etc text-[9px] font-bold">{config.title}</p>
        <p className="text-caption font-bold">{MOCK_WEATHER[type]}</p>
      </div>
    </div>
  );
}
