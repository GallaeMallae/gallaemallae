import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecommendEventCardSkeleton() {
  return (
    <Card className="relative h-full w-full overflow-hidden rounded-2xl border shadow-sm">
      <CardContent>
        <Skeleton className="absolute top-4 right-4 h-8 w-8 rounded-full" />

        <div className="mb-2">
          <Skeleton className="h-6 w-28" />
        </div>

        <div className="mb-2 flex items-center gap-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-5 w-12 rounded-sm" />
        </div>

        <div className="mb-2 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-4 rounded-sm" />
            <Skeleton className="h-5 w-36" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-4 rounded-sm" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-8 w-28 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
