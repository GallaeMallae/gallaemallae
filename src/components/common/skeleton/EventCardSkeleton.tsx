import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventCardSkeleton() {
  return (
    <Card className="relative rounded-2xl">
      <CardContent>
        <Skeleton className="absolute top-4 right-4 h-8 w-8 rounded-full" />

        <Skeleton className="mb-2 h-5 w-16 rounded-sm" />

        <Skeleton className="mb-4 h-6 w-3/4" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
