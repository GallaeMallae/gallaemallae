import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateRange } from "@/utils/date";
import { EventCardItem } from "@/types/common";
import { CATEGORY_LABELS } from "@/types/common";

export default function EventCard({
  title,
  location,
  startDate,
  endDate,
  category,
  isLiked,
}: EventCardItem) {
  return (
    <Card className="relative cursor-pointer rounded-2xl">
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

        <Badge className="mb-2 rounded-sm" variant={category}>
          {CATEGORY_LABELS[category] || "기타"}
        </Badge>

        <h3 className="text-title2 mb-4 line-clamp-1 font-bold">{title}</h3>

        <div className="text-desc2 text-etc flex flex-col">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="line-clamp-1">
              {formatDateRange(startDate, endDate)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
