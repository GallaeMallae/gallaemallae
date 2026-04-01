import { LucideIcon } from "lucide-react";

interface EmptyStateCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function EmptyStateCard({
  icon: Icon,
  title,
  description,
}: EmptyStateCardProps) {
  return (
    <div className="flex h-full min-h-40 flex-col items-center justify-center rounded-2xl border bg-white p-6 shadow-sm">
      <Icon className="text-etc/50 mb-2 size-8" />
      <p className="text-desc1 text-etc font-bold">{title}</p>
      <p className="text-caption text-etc/80 mt-1">{description}</p>
    </div>
  );
}
