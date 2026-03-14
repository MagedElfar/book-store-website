import { Skeleton } from "@/shared/components/shadcn/skeleton";

export function BaseFilterListSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            {/* Header Skeleton: Title & Counter */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-20 rounded" /> {/* Title */}
                    <Skeleton className="h-[18px] w-[18px] rounded-full" /> {/* Counter */}
                </div>
            </div>

            {/* Search Input Skeleton */}
            <div className="relative">
                <Skeleton className="h-9 w-full rounded-xl" />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Skeleton className="h-3.5 w-3.5 rounded-sm opacity-50" />
                </div>
            </div>

            {/* List Items Skeleton */}
            <div className="flex flex-col gap-1 max-h-60 overflow-hidden">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 px-2 py-2"
                    >
                        {/* Checkbox Skeleton */}
                        <Skeleton className="shrink-0 w-5 h-5 rounded-md" />

                        {/* Label Skeleton */}
                        <Skeleton className="h-3 flex-1 rounded" />
                    </div>
                ))}
            </div>

            {/* Load More Button Skeleton */}
            <Skeleton className="h-8 w-full rounded-xl border border-dashed border-transparent bg-slate-50 dark:bg-zinc-900/50" />
        </div>
    );
}