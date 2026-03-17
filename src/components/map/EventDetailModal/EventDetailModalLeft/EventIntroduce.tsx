import { Card, CardContent } from "@/components/ui/card";
import { INTRODUCE_CARD_CONFIG } from "@/lib/constants";
import { IntroduceType } from "@/types/common";

type Props = {
  type: IntroduceType;
  value?: string | null;
};

export default function EventIntroduce({ type, value }: Props) {
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

          <p className="text-caption font-semibold">{config.title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
