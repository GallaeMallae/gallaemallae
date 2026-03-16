import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecommendCardSkeleton() {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex flex-col items-center gap-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-18 w-18 rounded-full" />
        <Skeleton className="h-8 w-40 rounded-lg" />
      </CardContent>
    </Card>
  );
}
