import {
  PeriodFilter,
  RecommendLevel,
  RecommendCardItem,
} from "@/types/common";

export const PERIOD_FILTER_TABS: PeriodFilter[] = [
  "전체",
  "당일",
  "주간",
  "월간",
];

export const RECOMMEND_CARD_CONFIG: Record<RecommendLevel, RecommendCardItem> =
  {
    veryPositive: {
      bgColor: "bg-green-100",
      textColor: "text-green-500",
      emojiSrc: "/images/emoji-very-positive.png",
      message: "지금 당장 나가세요!",
    },
    positive: {
      bgColor: "bg-lime-100",
      textColor: "text-lime-500",
      emojiSrc: "/images/emoji-positive.png",
      message: "오늘 외출하기 좋아요!",
    },
    neutral: {
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-500",
      emojiSrc: "/images/emoji-neutral.png",
      message: "나가도 괜찮아요",
    },
    negative: {
      bgColor: "bg-red-100",
      textColor: "text-red-500",
      emojiSrc: "/images/emoji-negative.png",
      message: "외출은 고민해보아요",
    },
  };
