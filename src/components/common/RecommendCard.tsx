import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { RecommendLevel } from "@/types/common";
import { RECOMMEND_CARD_CONFIG } from "@/lib/constants";

export default function RecommendationCard({
  recommendLevel,
}: {
  recommendLevel: RecommendLevel;
}) {
  const recommendCard = RECOMMEND_CARD_CONFIG[recommendLevel];

  return (
    <Card
      className={`rounded-2xl border-0 shadow-none ${recommendCard.bgColor}`}
    >
      <CardContent className="flex flex-col items-center gap-2">
        <p className={`text-desc1 font-semibold ${recommendCard.textColor}`}>
          갈래말래
        </p>

        <Image
          src={recommendCard.emojiSrc}
          alt={`${recommendLevel} 이모지`}
          width={72}
          height={72}
        />

        <div className="text-desc2 rounded-lg bg-white px-6 py-2">
          <span className={recommendCard.textColor}>
            {`" ${recommendCard.message} "`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
