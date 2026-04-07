import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEventLike } from "@/hooks/mutations/useEventLike";
import { CATEGORY_NAME_MAP } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MypageDisplayEvent } from "@/types/common";
import { calculateDDay, formatDateRange } from "@/utils/date";
import { Calendar, Heart } from "lucide-react";

interface MypageLikedCardProps {
  event: MypageDisplayEvent;
  onClick?: () => void;
  onDetailClick?: (eventId: string) => void;
}

export type CategoryKey = keyof typeof CATEGORY_NAME_MAP;

export default function MypageLikedCard({
  event,
  onClick,
  onDetailClick,
}: MypageLikedCardProps) {
  const dDay = calculateDDay(event.start_date);

  const { mutate: toggleLike } = useEventLike(event.id);

  const isLiked = true; // 애초에 좋아요 한 목록이니 기본값 true 설정

  const handleCardClick = () => {
    onClick?.();
    onDetailClick?.(event.id);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(isLiked);
  };

  return (
    <div
      className="hover:bg-muted flex cursor-pointer flex-col gap-1 rounded-xl p-2"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {event.categories?.map((category) => {
            const categoryLabel =
              CATEGORY_NAME_MAP[category as CategoryKey] || "기타";

            return (
              <Badge
                key={category}
                className="shrink-0 rounded-sm"
                variant={categoryLabel}
              >
                {CATEGORY_NAME_MAP[category as CategoryKey] || "기타"}
              </Badge>
            );
          })}
        </div>

        <div className="flex gap-2">
          <div className="text-desc2 text-symbol-sky font-semibold">{dDay}</div>
          <Button
            className="flex size-5 items-center"
            variant="ghost"
            size="icon"
            aria-label="좋아요"
            aria-pressed={isLiked}
            onClick={handleLikeClick}
          >
            <Heart
              className={cn(
                "size-4",
                isLiked ? "fill-red-500 text-red-500" : "text-etc",
              )}
            />
          </Button>
        </div>
      </div>
      <div>
        <div className="text-desc2 truncate font-semibold">{event.name}</div>
        <div className="text-desc2 text-etc flex items-center gap-2 truncate">
          <Calendar className="size-4 shrink-0 -translate-y-px" />
          <span className="truncate">
            {formatDateRange(event.start_date, event.end_date)}
          </span>
        </div>
      </div>
    </div>
  );
}
