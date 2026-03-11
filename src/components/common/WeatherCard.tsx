import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WeatherCardItem } from "@/types/common";
import { WEATHER_CARD_CONFIG } from "@/lib/constants";

export default function WeatherCard({
  location,
  weatherType,
  temperature,
  fineDust,
  ultrafineDust,
}: WeatherCardItem) {
  const { bgColor, textColor, Icon, ariaLabel } =
    WEATHER_CARD_CONFIG[weatherType];

  return (
    <Card
      className={`relative overflow-hidden rounded-2xl ${bgColor} text-white`}
    >
      {/* 배경 원 장식 */}
      <div className="absolute -top-10 -left-5 h-32 w-32 rounded-full bg-white/15" />
      <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/20" />
      <div className="absolute top-1/2 right-10 h-24 w-24 -translate-y-1/2 rounded-full bg-white/10" />

      <CardContent className="flex flex-col justify-between gap-4">
        <div className="mb-4">
          <p className="text-desc1">{`현재 ${location}`}</p>
          <h3>{temperature}°C</h3>
        </div>
        <Separator className="opacity-80" />
        <div className="flex items-center justify-between">
          <div className="text-caption leading-relaxed">
            <p>미세먼지 {fineDust}</p>
            <p>초미세먼지 {ultrafineDust}</p>
          </div>

          <Icon className={`h-10 w-10 ${textColor}`} aria-label={ariaLabel} />
        </div>
      </CardContent>
    </Card>
  );
}
