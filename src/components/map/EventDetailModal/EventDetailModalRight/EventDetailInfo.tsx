interface EventDetailInfoProps {
  info: {
    organization: string;
    holdingCycle: string;
    firstHeldYear: number | string;
    visitorCount: string;
    fullAddress: string;
  };
}

interface InfoItemProps {
  label: string;
  value: string | number;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-caption font-medium text-slate-400">{label}</span>
    <span className="text-desc2 font-bold text-slate-800">{value}</span>
  </div>
);

export default function EventDetailInfo({ info }: EventDetailInfoProps) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-100/50 bg-slate-50/80 p-6 md:grid-cols-2">
      <InfoItem label="전담조직" value={info.organization} />
      <InfoItem label="상세 주소" value={info.fullAddress} />
      <InfoItem
        label="개최 이력"
        value={`${info.firstHeldYear}년 첫 개최 · ${info.holdingCycle} 개최`}
      />
      <InfoItem label="지난 행사 방문객 수" value={info.visitorCount} />
    </div>
  );
}
