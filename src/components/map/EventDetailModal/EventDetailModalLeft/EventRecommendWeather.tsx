import { WEATHER_RECOMMEND_CARD_CONFIG } from "@/lib/constants";

type RecommendType = "temp" | "dust" | "wind" | "wet";

export default function EventRecommendWeather({
  type,
}: {
  type: RecommendType;
}) {
  const config = WEATHER_RECOMMEND_CARD_CONFIG[type];
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
        <p className="text-caption font-bold">{config.desc}</p>
      </div>
    </div>
  );
}
