import { Skeleton } from "@/components/ui/skeleton";

export function EventWeatherInfoCardSkeleton() {
  return (
    <div className="flex items-center gap-2 py-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-2 w-12" />
        <Skeleton className="h-4 w-14" />
      </div>
    </div>
  );
}
