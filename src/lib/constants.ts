import {
  LayoutGrid,
  PartyPopper,
  Ticket,
  Landmark,
  MoreHorizontal,
  Sun,
  Cloudy,
  Umbrella,
  Snowflake,
} from "lucide-react";
import {
  CategoryMenuCardItem,
  RecommendType,
  RecommendCardConfigItem,
  WeatherType,
  WeatherCardConfigItem,
  PeriodFilter,
} from "@/types/common";

export const CATEGORY_MENU: CategoryMenuCardItem[] = [
  {
    name: "전체",
    iconBgColor: "bg-symbol-sky",
    Icon: LayoutGrid,
  },
  {
    name: "축제",
    iconBgColor: "bg-festival",
    Icon: PartyPopper,
  },
  {
    name: "공연",
    iconBgColor: "bg-performance",
    Icon: Ticket,
  },
  {
    name: "전시",
    iconBgColor: "bg-exhibition",
    Icon: Landmark,
  },
  {
    name: "기타",
    iconBgColor: "bg-etc",
    Icon: MoreHorizontal,
  },
];

export const RECOMMEND_CARD_CONFIG: Record<
  RecommendType,
  RecommendCardConfigItem
> = {
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
    message: "외출은 고민해 보아요",
  },
};

export const WEATHER_CARD_CONFIG: Record<WeatherType, WeatherCardConfigItem> = {
  sunny: {
    bgColor: "bg-blue-400",
    textColor: "text-yellow-400",
    Icon: Sun,
    ariaLabel: "맑음",
  },
  cloudy: {
    bgColor: "bg-gray-400",
    textColor: "text-gray-600",
    Icon: Cloudy,
    ariaLabel: "흐림",
  },
  rainy: {
    bgColor: "bg-blue-900",
    textColor: "text-blue-500",
    Icon: Umbrella,
    ariaLabel: "비",
  },
  snowy: {
    bgColor: "bg-blue-300",
    textColor: "text-blue-400",
    Icon: Snowflake,
    ariaLabel: "눈",
  },
};

export const PERIOD_FILTER_TABS: PeriodFilter[] = [
  "전체",
  "당일",
  "주간",
  "월간",
];

export const CATEGORY_STYLES: Record<
  string,
  { dot: string; sub: string; text: string; border: string }
> = {
  축제: {
    dot: "bg-festival",
    sub: "bg-festival-sub",
    text: "text-festival",
    border: "border-festival",
  },
  공연: {
    dot: "bg-performance",
    sub: "bg-performance-sub",
    text: "text-performance",
    border: "border-performance",
  },
  전시: {
    dot: "bg-exhibition",
    sub: "bg-exhibition-sub",
    text: "text-exhibition",
    border: "border-exhibition",
  },
  기타: {
    dot: "bg-etc",
    sub: "bg-etc-sub",
    text: "text-etc",
    border: "border-etc",
  },
};
