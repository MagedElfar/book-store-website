export function OrderDetailsSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-6 space-y-2">
                <div className="h-6 w-1/2 bg-slate-200 dark:bg-zinc-800 rounded" />
            </div>

            {/* Items Review Skeleton */}
            <div className="space-y-4">
                <div className="h-4 w-1/4 bg-slate-200 dark:bg-zinc-800 rounded mb-4" />
                {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-slate-200 dark:bg-zinc-800 rounded-md" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 bg-slate-200 dark:bg-zinc-800 rounded" />
                            <div className="h-3 w-1/4 bg-slate-200 dark:bg-zinc-800 rounded" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Card Skeleton */}
            <div className="bg-slate-50 dark:bg-zinc-900/50 p-4 rounded-2xl space-y-3">
                <div className="h-4 w-full bg-slate-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-full bg-slate-200 dark:bg-zinc-800 rounded" />
                <div className="h-6 w-full bg-slate-200 dark:bg-zinc-800 rounded mt-4" />
            </div>

            {/* Info Sections Skeleton */}
            <div className="grid grid-cols-1 gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-100 dark:border-zinc-800 space-y-3">
                        <div className="h-3 w-1/3 bg-slate-100 dark:bg-zinc-900 rounded" />
                        <div className="h-4 w-1/2 bg-slate-200 dark:bg-zinc-800 rounded" />
                        <div className="h-3 w-2/3 bg-slate-200 dark:bg-zinc-800 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}