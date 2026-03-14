import { Skeleton } from "@/shared/components/shadcn/skeleton";

export function BookCardSkeleton() {
    return (
        <div className="flex flex-col w-full bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden h-full">

            <Skeleton className="relative aspect-[3/4] w-full rounded-none" />

            <div className="p-4 flex flex-col flex-grow space-y-3">

                <Skeleton className="h-3 w-20 rounded" />

                <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                </div>

                <div className="flex items-center gap-2 mt-1">
                    <Skeleton className="h-3 w-8 rounded" />
                    <Skeleton className="h-3 w-16 rounded" />
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="space-y-1">
                        <Skeleton className="h-5 w-24 rounded" />
                        <Skeleton className="h-3 w-12 rounded" />
                    </div>
                    <Skeleton className="h-9 w-9 rounded-full" />
                </div>
            </div>
        </div>
    );
}