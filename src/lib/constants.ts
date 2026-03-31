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
  CloudFog,
  Wind,
  Droplet,
  Calendar,
  MapPin,
  Phone,
  House,
} from "lucide-react";
import {
  CategoryMenuCardItem,
  RecommendType,
  RecommendCardConfigItem,
  WeatherType,
  WeatherCardConfigItem,
  PeriodFilter,
  WeatherInfoType,
  WeatherInfoCardConfigItem,
  IntroduceType,
  IntroduceCardConfigItem,
} from "@/types/common";

export const CATEGORY_MENU: CategoryMenuCardItem[] = [
  {
    id: "all",
    name: "전체",
    iconBgColor: "bg-symbol-sky",
    Icon: LayoutGrid,
  },
  {
    id: "festival",
    name: "축제",
    iconBgColor: "bg-festival",
    Icon: PartyPopper,
  },
  {
    id: "performance",
    name: "공연",
    iconBgColor: "bg-performance",
    Icon: Ticket,
  },
  {
    id: "exhibition",
    name: "전시",
    iconBgColor: "bg-exhibition",
    Icon: Landmark,
  },
  {
    id: "etc",
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
    status: "적극추천",
  },
  positive: {
    bgColor: "bg-lime-100",
    textColor: "text-lime-500",
    emojiSrc: "/images/emoji-positive.png",
    message: "오늘 외출하기 좋아요!",
    status: "추천",
  },
  neutral: {
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-500",
    emojiSrc: "/images/emoji-neutral.png",
    message: "나가도 괜찮아요",
    status: "보통",
  },
  negative: {
    bgColor: "bg-red-100",
    textColor: "text-red-500",
    emojiSrc: "/images/emoji-negative.png",
    message: "외출은 고민해 보아요",
    status: "비추천",
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

export const WEATHER_INFO_CARD_CONFIG: Record<
  WeatherInfoType,
  WeatherInfoCardConfigItem
> = {
  temp: {
    icon: Sun,
    color: "text-amber-400",
    title: "날씨",
  },
  fineDust: {
    icon: CloudFog,
    color: "text-etc",
    title: "미세먼지",
  },
  wind: {
    icon: Wind,
    color: "text-teal-400",
    title: "풍속",
  },
  wet: {
    icon: Droplet,
    color: "text-sky-300",
    title: "습도",
  },
};

export const PERIOD_FILTER_TABS: PeriodFilter[] = [
  "전체",
  "당일",
  "주간",
  "월간",
];

export const INTRODUCE_CARD_CONFIG: Record<
  IntroduceType,
  IntroduceCardConfigItem
> = {
  date: {
    icon: Calendar,
    color: "text-blue-500",
    bg: "bg-blue-50",
    title: "축제 기간",
  },
  place: {
    icon: MapPin,
    color: "text-green-500",
    bg: "bg-green-50",
    title: "개최 장소",
  },
  tel: {
    icon: Phone,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    title: "문의처",
  },
  homepage: {
    icon: House,
    color: "text-orange-500",
    bg: "bg-orange-100",
    title: "홈페이지",
  },
};

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
  unauthorized: "로그인이 필요한 서비스입니다.",
};

export const QUERY_KEYS = {
  USER: ["user"],
  PROFILE: (userId?: string) => (userId ? ["profile", userId] : ["profile"]),
  EVENTS: ["events"],
  LIKED_EVENTS: (userId?: string) =>
    userId ? ["liked_events", userId] : ["liked_events"],
  EVENT_PLANS: (userId?: string) =>
    userId ? ["event_plans", userId] : ["event_plans"],
  LOCATION_NAME: (lat: number, lng: number) => ["locationName", lat, lng],
  WEATHER: (lat: number, lng: number) => ["weather", lat, lng],
  AIR_POLLUTION: (lat: number, lng: number) => ["airPollution", lat, lng],
  RECOMMEND_TYPE: (
    weatherType?: string,
    temp?: number,
    pm10?: number,
    pm25?: number,
  ) => ["recommendType", weatherType, temp, pm10, pm25],
  MYPAGE_RECOMMENDATION: (userId?: string, location?: string) =>
    userId
      ? ["mypage", "recommendation", userId, location].filter(Boolean)
      : ["mypage", "recommendation", location].filter(Boolean),
} as const;

export const CATEGORY_NAME_MAP = {
  all: "전체",
  festival: "축제",
  performance: "공연",
  exhibition: "전시",
  etc: "기타",
} as const;

export const MARKER_ICONS = {
  festival: "/images/MapMarker/MapMarker-festival.png",
  performance: "/images/MapMarker/MapMarker-performance.png",
  exhibition: "/images/MapMarker/MapMarker-exhibition.png",
  etc: "/images/MapMarker/MapMarker-etc.png",
} as const;
