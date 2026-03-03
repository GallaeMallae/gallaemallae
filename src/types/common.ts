// 카테고리
export type Category = "전체" | "축제" | "공연" | "전시" | "기타";

// ==============================
// 갈래말래 추천 카드 관련 타입
// ==============================
export type RecommendLevel =
  | "veryPositive"
  | "positive"
  | "neutral"
  | "negative";

export interface RecommendCardItem {
  bgColor: string;
  textColor: string;
  emojiSrc: string;
  message: string;
}

// ==============================
// 행사 카드 관련 타입
// ==============================
export interface EventCardItem {
  id: number;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  category: Category;
  isLiked: boolean;
}
