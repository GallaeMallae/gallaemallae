import { Card, CardContent } from "@/components/ui/card";

interface EventDetailInfoProps {
  info: {
    organization: string | number;
    holdingCycle: string | number;
    firstHeldYear: string | number;
    visitorCount: string | number;
  };
}

const INFO_FIELDS = [
  { label: "전담조직", key: "organization" },
  { label: "개최 주기", key: "holdingCycle" },
  { label: "최초 개최 년도", key: "firstHeldYear" },
  { label: "지난 행사 방문객 수", key: "visitorCount", isVisitorNumber: true },
] as const;

export default function EventDetailInfo({ info }: EventDetailInfoProps) {
  const formatDisplayValue = (
    key: string,
    value: string | number,
    isNumber?: boolean,
  ) => {
    if (!value || value === "-") return "-";

    if (isNumber) {
      const num = typeof value === "string" ? parseInt(value, 10) : value;

      if (!isNaN(num as number)) {
        return `${num.toLocaleString()}명`;
      }
    }

    return value;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {INFO_FIELDS.map((item) => (
        <Card key={item.key} className="border border-slate-100 shadow-none">
          <CardContent className="flex flex-col justify-center gap-1 p-4">
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className="text-sm font-semibold text-slate-900">
              {formatDisplayValue(
                item.key,
                info[item.key],
                "isVisitorNumber" in item,
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
