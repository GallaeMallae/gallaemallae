import { LucideIcon } from "lucide-react";

// ==============================
// 카테고리 관련 타입
// ==============================
export type Category =
  | "all"
  | "festival"
  | "performance"
  | "exhibition"
  | "other";

export const CATEGORY_LABELS: Record<Category, string> = {
  all: "전체",
  festival: "축제",
  performance: "공연",
  exhibition: "전시",
  other: "기타",
};

export type CategoryMenuCardItem = {
  name: string;
  value: Category;
  iconBgColor: string;
  Icon: LucideIcon;
};

// ==============================
// 갈래말래 추천 카드 관련 타입
// ==============================
export type RecommendType =
  | "veryPositive"
  | "positive"
  | "neutral"
  | "negative";

export interface RecommendCardConfigItem {
  bgColor: string;
  textColor: string;
  emojiSrc: string;
  message: string;
  status: string;
}

// ==============================
// 행사 카드 관련 타입
// ==============================
export interface EventCardItem {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  category: Category;
  isLiked: boolean;
}

// ==============================
// 날씨 카드 관련 타입
// ==============================
export type WeatherType = "sunny" | "cloudy" | "rainy" | "snowy";

export interface WeatherCardConfigItem {
  bgColor: string;
  textColor: string;
  Icon: LucideIcon;
  ariaLabel: string;
}

export interface WeatherCardItem {
  weatherType: WeatherType;
  location: string;
  temperature: number;
  fineDust: string;
  ultrafineDust: string;
}

// 행사 기간 필터 탭
export type PeriodFilter = "전체" | "당일" | "주간" | "월간";

export type WeatherInfoType = "temp" | "fineDust" | "wind" | "wet";

export interface WeatherRecommendCardConfigItem {
  icon: LucideIcon;
  color: string;
  title: string;
}

// ==============================
// 모달창 축제 정보 (기간, 장소, 전화, 홈페이지)
// ==============================
export type IntroduceType = "date" | "place" | "tel" | "homepage";

export interface IntroduceCardConfigItem {
  icon: LucideIcon;
  color: string;
  bg: string;
  title: string;
}

export interface DetailCardItem {
  description: string;
  organization: {
    host: string;
    organizer: string;
    sponsor: string;
    provider: string;
  };
  information: string[];
}
