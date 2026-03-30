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

  const URL = () => {
    if (type === "homepage") {
      if (!value || !value.startsWith("http")) {
        return <span>-</span>;
      }
      return (
        <a href={value} className="break-all text-blue-500 underline">
          {value}
        </a>
      );
    } else if (type === "tel")
      if (value !== "-") {
        return <a href={`tel${value}`}>{value}</a>;
      }
    return value;
  };

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

          <p className="text-caption font-semibold">{URL()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
