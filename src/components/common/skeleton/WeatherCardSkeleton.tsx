import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function WeatherCardSkeleton() {
  return (
    <Card className="relative overflow-hidden rounded-2xl">
      {/* 배경 원 장식 */}
      <div className="bg-muted/40 absolute -top-10 -left-5 h-32 w-32 rounded-full" />
      <div className="bg-muted/50 absolute -right-10 -bottom-10 h-40 w-40 rounded-full" />
      <div className="bg-muted/30 absolute top-1/2 right-10 h-24 w-24 -translate-y-1/2 rounded-full" />

      <CardContent className="flex flex-col justify-between gap-4">
        <div className="mb-4 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Separator className="opacity-80" />
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
