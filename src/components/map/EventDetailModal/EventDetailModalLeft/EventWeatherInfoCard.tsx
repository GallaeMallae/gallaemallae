import { WeatherInfoType, WeatherType } from "@/types/common";
import { WEATHER_INFO_CARD_CONFIG, WEATHER_CARD_CONFIG } from "@/lib/constants";

interface EventWeatherInfoCardProps {
  type: WeatherInfoType;
  value: string;
  weatherType?: WeatherType;
}

export default function EventWeatherInfoCard({
  type,
  value,
  weatherType,
}: EventWeatherInfoCardProps) {
  const config = WEATHER_INFO_CARD_CONFIG[type];
  const weatherConfig = weatherType ? WEATHER_CARD_CONFIG[weatherType] : null;
  const Icon = weatherConfig?.Icon ?? config.icon;
  const color = weatherConfig?.textColor ?? config.color;

  return (
    <div className="flex items-center gap-2 py-2">
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-white`}
      >
        <Icon size={16} className={color} fill="currentColor" />
      </div>
      <div className="min-w-0">
        <p className="text-caption mb-1 leading-none font-medium text-slate-400">
          {config.title}
        </p>
        <p className="text-sm leading-none font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
