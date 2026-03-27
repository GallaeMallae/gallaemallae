import { Skeleton } from "@/components/ui/skeleton";

export default function EventCardSkeleton() {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-transparent p-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-10 rounded-sm" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-8 rounded-md" />
          <Skeleton className="size-4 rounded-full" />{" "}
        </div>
      </div>

      <div className="mt-1 flex flex-col gap-1.5">
        <Skeleton className="h-4 w-3/4 rounded-md" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-1/2 rounded-md" />
        </div>
      </div>
    </div>
  );
}
