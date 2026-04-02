import { Skeleton } from "@/components/ui/skeleton";

export function EventRecommendCardSkeleton() {
  return (
    <div className="flex items-center gap-1 rounded-full p-2">
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-12 rounded-md" />
    </div>
  );
}
