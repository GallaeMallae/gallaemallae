export type RecommendLevel =
  | "veryPositive"
  | "positive"
  | "neutral"
  | "negative";

export interface RecommendCard {
  bgColor: string;
  textColor: string;
  emojiSrc: string;
  message: string;
}
