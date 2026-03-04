import WeatherCard from "@/components/common/WeatherCard";
import { MypageCalendar } from "@/components/mypage/MypageCalendar";
import { MOCK_WEATHER } from "@/mocks/weathers";
import { MOCK_EVENTS } from "@/mocks/events";
import { Bookmark, Heart } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MyPageEventRecommendCard from "@/components/mypage/MyPageEventRecommendCard";
import MypageProfileCard from "@/components/mypage/MypageProfileCard";

export default function Mypage() {
  const weatherData = MOCK_WEATHER[1];
  const eventData = MOCK_EVENTS[1];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <MypageProfileCard />
        <WeatherCard {...weatherData} />
        <MyPageEventRecommendCard {...eventData} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="flex flex-col gap-8 lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bookmark className="text-symbol-sky h-4 w-4" />
                  <span className="font-bold">나의 일정 목록</span>
                </div>
                <div className="text-muted-foreground text-desc2 cursor-pointer hover:text-black">
                  더보기
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="hover:bg-muted cursor-pointer rounded">
                <div className="text-desc2 text-symbol-sky font-semibold">
                  D-7
                </div>
                <div className="text-desc2 font-semibold">
                  금호강 정월대보름축제
                </div>
                <div className="text-desc2 text-muted-foreground">
                  3월 3일, 산격대교 하단 일원
                </div>
              </div>
              <div className="hover:bg-muted cursor-pointer rounded">
                <div className="text-desc2 text-symbol-sky font-semibold">
                  D-7
                </div>
                <div className="text-desc2 font-semibold">
                  금호강 정월대보름축제
                </div>
                <div className="text-desc2 text-muted-foreground">
                  3월 3일, 산격대교 하단 일원
                </div>
              </div>
              <div className="hover:bg-muted cursor-pointer rounded">
                <div className="text-desc2 text-symbol-sky font-semibold">
                  D-7
                </div>
                <div className="text-desc2 font-semibold">
                  금호강 정월대보름축제
                </div>
                <div className="text-desc2 text-muted-foreground">
                  3월 3일, 산격대교 하단 일원
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="font-bold">나의 관심 목록</span>
                </div>
                <div className="text-muted-foreground text-desc2 cursor-pointer hover:text-black">
                  더보기
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="hover:bg-muted cursor-pointer rounded">
                <div className="text-desc2 text-symbol-sky font-semibold">
                  D-7
                </div>
                <div className="text-desc2 font-semibold">
                  금호강 정월대보름축제
                </div>
                <div className="text-desc2 text-muted-foreground">
                  3월 3일, 산격대교 하단 일원
                </div>
              </div>
              <div className="hover:bg-muted cursor-pointer rounded">
                <div className="text-desc2 text-symbol-sky font-semibold">
                  D-7
                </div>
                <div className="text-desc2 font-semibold">
                  금호강 정월대보름축제
                </div>
                <div className="text-desc2 text-muted-foreground">
                  3월 3일, 산격대교 하단 일원
                </div>
              </div>
              <div className="hover:bg-muted cursor-pointer rounded">
                <div className="text-desc2 text-symbol-sky font-semibold">
                  D-7
                </div>
                <div className="text-desc2 font-semibold">
                  금호강 정월대보름축제
                </div>
                <div className="text-desc2 text-muted-foreground">
                  3월 3일, 산격대교 하단 일원
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-xl bg-white p-6 shadow lg:col-span-3">
          <MypageCalendar />
        </div>
      </div>
    </div>
  );
}
