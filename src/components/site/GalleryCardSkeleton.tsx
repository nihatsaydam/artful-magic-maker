import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-surface-1">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-2.5 w-1/3" />
          <Skeleton className="h-2.5 w-8" />
        </div>
      </div>
    </div>
  );
}
