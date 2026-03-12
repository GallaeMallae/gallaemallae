import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateRange } from "@/utils/date";
import { EventCardItem } from "@/types/common";

export default function MyPageEventRecommendCard({
  title,
  location,
  startDate,
  endDate,
  category,
  isLiked,
}: EventCardItem) {
  return (
    <Card className="relative rounded-2xl border">
      <CardContent>
        <Button
          className="absolute top-4 right-4 hover:bg-transparent"
          variant="ghost"
          size="icon"
          aria-label="좋아요"
          aria-pressed={isLiked}
        >
          <Heart
            className={cn(
              "h-5 w-5",
              isLiked ? "fill-red-500 text-red-500" : "text-etc",
            )}
          />
        </Button>

        <div className="mb-2 flex items-center gap-2">
          <p className="text-symbol-sky text-desc1 font-semibold">
            {/* todo: AI의 추천 멘트 한마디 넣기 */}
            이런 행사는 어때요?
          </p>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-title2 font-bold">{title}</h3>
          <Badge className="rounded-sm" variant={category}>
            {category}
          </Badge>
        </div>

        <div className="text-desc2 text-etc mb-4 flex flex-col">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="text-desc2 truncate whitespace-nowrap">
              {formatDateRange(startDate, endDate)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size={"sm"} className="hover:bg-symbol-sky">
            일정에 추가
          </Button>
          <Button size={"sm"} variant={"outline"}>
            행사 정보
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
