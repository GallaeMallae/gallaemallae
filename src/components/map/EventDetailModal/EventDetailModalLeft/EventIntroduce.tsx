import { Card, CardContent } from "@/components/ui/card";
import { INTRODUCE_CARD_CONFIG } from "@/lib/constants";
import { MOCK_INTRODUCE } from "@/mocks/events";
import { IntroduceType } from "@/types/common";

export default function EventIntroduce({ type }: { type: IntroduceType }) {
  const config = INTRODUCE_CARD_CONFIG[type];
  const Icon = config.icon;

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white">
      <CardContent className="flex h-2 items-center gap-4 px-4">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${config.bg}`}
        >
          <Icon size={16} className={config.color} stroke="currentColor" />
        </div>

        <div>
          <p className="text-caption text-etc">{config.title}</p>

          <p className="text-caption font-semibold">{MOCK_INTRODUCE[type]}</p>
        </div>
      </CardContent>
    </Card>
  );
}
