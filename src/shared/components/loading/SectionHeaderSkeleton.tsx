import { Skeleton } from "@/shared/components/shadcn/skeleton"

export function SectionHeaderSkeleton() {
    return (
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="space-y-3 flex-1">
                <Skeleton className="h-9 md:h-11 w-48 md:w-64 rounded-lg" />

                <div className="space-y-2">
                    <Skeleton className="h-4 w-full max-w-md" />
                    <Skeleton className="h-4 w-3/4 max-w-xs" />
                </div>
            </div>

            <div className="shrink-0">
                <Skeleton className="h-10 w-28 md:w-32 rounded-xl" />
            </div>
        </header>
    )
}