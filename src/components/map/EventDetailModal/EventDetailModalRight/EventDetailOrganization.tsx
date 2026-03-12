import { Card, CardContent } from "@/components/ui/card";
import { DetailCardItem } from "@/types/common";

interface EventDetailOrganizationProps {
  organization: DetailCardItem["organization"];
}

const ORGANIZATION_FIELDS: {
  label: string;
  key: keyof DetailCardItem["organization"];
}[] = [
  { label: "주최기관명", key: "host" },
  { label: "주관기관명", key: "organizer" },
  { label: "후원기관명", key: "sponsor" },
  { label: "제공기관명", key: "provider" },
];

export default function EventDetailOrganization({
  organization,
}: EventDetailOrganizationProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {ORGANIZATION_FIELDS.map((item) => (
        <Card key={item.key} className="border border-slate-100">
          <CardContent className="flex h-3 flex-col justify-center gap-0.5">
            <p className="text-etc text-caption">{item.label}</p>
            <p className="text-desc2 font-medium">{organization[item.key]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
