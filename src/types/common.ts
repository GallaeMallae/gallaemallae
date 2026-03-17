import { Tables } from "@/types/supabase";
import { LucideIcon } from "lucide-react";

// 사용자 위치 타입
export interface Coordinates {
  lat: number;
  lng: number;
}

// ==============================
// 카테고리 관련 타입
// ==============================
export type Category = "전체" | "축제" | "공연" | "전시" | "기타";

export type CategoryId =
  | "all"
  | "festival"
  | "performance"
  | "exhibition"
  | "etc";

export type CategoryMenuCardItem = {
  id: CategoryId;
  name: Category;
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
  location: string;
  weatherType: WeatherType;
  temperature: number;
  fineDust: string;
  ultrafineDust: string;
}

export type WeatherInfoType = "temp" | "fineDust" | "wind" | "wet";

export interface WeatherInfoCardConfigItem {
  icon: LucideIcon;
  color: string;
  title: string;
}

// 지도에서 행사 찾기 / 내 주변 행사 찾기
export type MapMode = "all" | "near";

// 행사 기간 필터 탭
export type PeriodFilter = "전체" | "당일" | "주간" | "월간";

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

// ==============================
// 사용자 프로필 타입
// ==============================
export type Profile = Tables<"profiles">;
