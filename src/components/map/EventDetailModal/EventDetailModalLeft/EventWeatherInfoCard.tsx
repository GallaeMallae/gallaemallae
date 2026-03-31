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
    <div className="flex items-center gap-2 py-2">
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-white`}
      >
        <Icon size={16} className={config.color} fill="currentColor" />
      </div>
      <div className="min-w-0">
        <p className="text-caption mb-1 leading-none font-medium text-slate-400">
          {config.title}
        </p>
        <p className="text-sm leading-none font-bold text-slate-800">
          {MOCK_WEATHER[type]}
        </p>
      </div>
    </div>
  );
}
