import { Skeleton } from "@/components/ui/skeleton";

export default function BlogCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface-1 p-6 space-y-4">
      <Skeleton className="h-2.5 w-20" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-2.5 w-20" />
        <Skeleton className="h-2.5 w-12" />
      </div>
    </div>
  );
}
