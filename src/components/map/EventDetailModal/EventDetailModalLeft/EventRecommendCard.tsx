import Image from "next/image";
import { RECOMMEND_CARD_CONFIG } from "@/lib/constants";
import { RecommendType } from "@/types/common";

export default function EventRecommendCard({ type }: { type: RecommendType }) {
  const config = RECOMMEND_CARD_CONFIG[type];

  return (
    <div
      className={`${config.bgColor} ${config.textColor} flex items-center justify-center gap-1 rounded-full p-2`}
    >
      <Image src={config.emojiSrc} alt={config.status} width={16} height={16} />
      <p className="text-caption font-bold">{config.status}</p>
    </div>
  );
}
