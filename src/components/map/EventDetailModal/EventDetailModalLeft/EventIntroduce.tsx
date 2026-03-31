import { INTRODUCE_CARD_CONFIG } from "@/lib/constants";
import { IntroduceType } from "@/types/common";

interface EventIntroduceProps {
  type: IntroduceType;
  value?: string | null;
}

export default function EventIntroduce({ type, value }: EventIntroduceProps) {
  const config = INTRODUCE_CARD_CONFIG[type];
  const Icon = config.icon;

  const renderValue = () => {
    if (type === "homepage") {
      if (!value || !value.startsWith("http")) {
        return <span>-</span>;
      }
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full truncate text-blue-500"
          title={value}
        >
          {value}
        </a>
      );
    }
    if (type === "tel") {
      if (!value || value === "-") {
        return <span>-</span>;
      }
      return <a href={`tel:${value}`}>{value}</a>;
    }
    return value;
  };

  return (
    <div className="flex w-full items-center gap-4 py-1">
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${config.bg}`}
      >
        <Icon size={16} className={config.color} stroke="currentColor" />
      </div>

      <div className="w-40 flex-1">
        <p className="text-caption leading-tight font-medium text-slate-400">
          {config.title}
        </p>
        <div className="text-desc2 font-semibold text-slate-800">
          {renderValue()}
        </div>
      </div>
    </div>
  );
}
