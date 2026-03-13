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

export const CALENDAR_CATEGORY_STYLES: Record<
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
export const ERROR_MESSAGE_CONFIG: Record<string, string> = {
  config_error: "로그인 설정에 문제가 있습니다. 잠시 후 다시 시도해 주세요.",
  oauth_signin_failed: "소셜 로그인에 실패했습니다. 다시 시도해 주세요.",
  unknown_error: "알 수 없는 오류가 발생했습니다.",
  access_denied: "로그인이 취소되었습니다. 다시 시도해 주세요.", // 사용자가 소셜 로그인에서 '취소' 버튼을 누른 경우
  provider_not_enabled:
    "현재 해당 소셜 로그인을 사용할 수 없습니다. 관리자에게 문의해 주세요.", // Supabase 대시보드에서 비활성화된 경우
  email_conflict: "이미 동일한 이메일로 가입된 다른 계정이 존재합니다.",
  callback_failed: "인증 응답을 처리하는 중 오류가 발생했습니다.", // 콜백 URL 처리 실패 시
  session_expired: "로그인 세션이 만료되었습니다. 다시 시도해 주세요.",
  rate_limit:
    "너무 많은 로그인 시도가 감지되었습니다. 잠시 후 다시 시도해 주세요.",
  invalid_grant: "인증 정보가 유효하지 않거나 만료되었습니다.",
  pkce_failed:
    "보안 연결 설정 중 오류가 발생했습니다. 브라우저의 '시크릿 모드'를 해제하거나 쿠키 허용 설정을 확인해 주세요.",
  server_error: "소셜 서비스 서버에 일시적인 문제가 발생했습니다.",
};

export const QUERY_KEYS = {
  USER: ["user"],
  PROFILE: (userId?: string) => (userId ? ["profile", userId] : ["profile"]),
  EVENTS: ["events"],
  LIKED_EVENTS: (userId?: string) =>
    userId ? ["liked_events", userId] : ["liked_events"],
  EVENT_PLANS: (userId?: string) =>
    userId ? ["event_plans", userId] : ["event_plans"],
} as const;

export const CATEGORY_NAME_MAP = {
  festival: "축제",
  performance: "공연",
  exhibition: "전시",
  etc: "기타",
} as const;
