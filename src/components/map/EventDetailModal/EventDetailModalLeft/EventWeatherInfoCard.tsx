import { WeatherInfoType } from "@/types/common";
import { WEATHER_INFO_CARD_CONFIG } from "@/lib/constants";

interface EventWeatherInfoCardProps {
  type: WeatherInfoType;
  value: string;
}

export default function EventWeatherInfoCard({
  type,
  value,
}: EventWeatherInfoCardProps) {
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
        <p className="text-etc text-caption font-bold">{config.title}</p>
        <p className="text-desc2 font-bold">{value}</p>
      </div>
    </div>
  );
}
