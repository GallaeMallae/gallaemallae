import { Skeleton } from "@/components/ui/skeleton";

export function EventWeatherInfoCardSkeleton() {
  return (
    <div className="flex flex-row items-center gap-2 rounded bg-white px-2 py-4 shadow-sm">
      <Skeleton className="h-4 w-4 rounded" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-14" />
      </div>
    </div>
  );
}
