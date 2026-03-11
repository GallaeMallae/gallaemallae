import { Card, CardContent } from "@/components/ui/card";

export default function EventDetailOrganization({
  organization,
}: {
  organization: {
    host: string;
    organizer: string;
    sponsor: string;
    provider: string;
  };
}) {
  const items = [
    { label: "주최기관명", value: organization.host },
    { label: "주관기관명", value: organization.organizer },
    { label: "후원기관명", value: organization.sponsor },
    { label: "제공기관명", value: organization.provider },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, index) => (
        <Card key={index} className="border border-slate-100">
          <CardContent className="flex h-3 flex-col justify-center gap-0.5">
            <p className="text-etc text-caption">{item.label}</p>
            <p className="text-desc2 font-medium">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
