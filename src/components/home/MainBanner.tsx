import { Button } from "@/components/ui/button";
import WeatherCard from "@/components/common/WeatherCard";
import RecommendCard from "@/components/common/RecommendCard";
import WeatherCardSkeleton from "@/components/common/skeleton/WeatherCardSkeleton";
import RecommendCardSkeleton from "@/components/common/skeleton/RecommendCardSkeleton";
import { Map, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocationStore } from "@/stores/locationStore";
import { useWeatherData } from "@/hooks/queries/useWeatherData";
import { useLocationNameData } from "@/hooks/queries/useLocationNameData";
import { useAirPollutionData } from "@/hooks/queries/useAirPollutionData";
import { useOutdoorRecommendData } from "@/hooks/queries/useOutdoorRecommendData";
import { mapWeatherCard } from "@/utils/mapper";
import { MapMode } from "@/types/common";

export default function MainBanner() {
  const router = useRouter();
  const { coords, isInitialized, isDefaultLocation } = useLocationStore();

  const { data: locationNameData } = useLocationNameData(coords, isInitialized);
  const { data: weatherData } = useWeatherData(coords, isInitialized);
  const { data: airPollutionData } = useAirPollutionData(coords, isInitialized);
  const { data: recommendTypeData, isLoading: isRecommendTypeLoading } =
    useOutdoorRecommendData(weatherData, airPollutionData);

  const isWeatherReady =
    !!locationNameData && !!weatherData && !!airPollutionData;
  const isWeatherLoading = !isWeatherReady;

  const weather = isWeatherReady
    ? mapWeatherCard(
        locationNameData,
        weatherData,
        airPollutionData,
        isDefaultLocation,
      )
    : null;

  const recommendType = recommendTypeData?.recommendType ?? null;

  const handleMapClick = (mode: MapMode) => {
    router.push(`/map?mode=${mode}`);
  };

  return (
    <section>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative hidden min-h-90 flex-1 overflow-hidden rounded-2xl md:block">
          <Image
            className="object-cover"
            src="/images/main-banner-bg-img.png"
            sizes="66vw"
            fill
            priority
            alt="메인 배너 배경"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/10" />

          <div className="relative flex h-full flex-col justify-between px-10 py-12">
            <div className="mt-12">
              <h1 className="text-4xl text-white">
                <span className="text-symbol-sky">날씨</span> 따라,
                <br />
                <span className="text-symbol-brown">발길</span> 따라
              </h1>

              <p className="text-etc text-desc2 mt-4">
                위치와 날씨를 기반으로 가기 좋은 행사를 추천하는 서비스
                <br />
                날씨 분석을 통한 제안으로 실패 없는 하루를 계획하세요
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                className="rounded-xl"
                onClick={() => handleMapClick("all")}
              >
                <Map className="h-4 w-4" />
                지도에서 행사 찾기
              </Button>
              <Button
                className="rounded-xl"
                variant="outline"
                onClick={() => handleMapClick("near")}
              >
                <MapPin className="h-4 w-4" />내 주변 행사 찾기
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:w-90 md:gap-2">
          {isWeatherLoading || !weather ? (
            <WeatherCardSkeleton />
          ) : (
            <WeatherCard {...weather} />
          )}
          {isRecommendTypeLoading || !recommendType ? (
            <RecommendCardSkeleton />
          ) : (
            <RecommendCard recommendType={recommendType} />
          )}
        </div>
      </div>
    </section>
  );
}
