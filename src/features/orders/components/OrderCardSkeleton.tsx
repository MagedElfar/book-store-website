export function OrderCardSkeleton() {
    return (
        <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-4 rounded-2xl animate-pulse">
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-2 flex-1">
                    <div className="h-5 w-24 bg-slate-200 dark:bg-zinc-800 rounded" />
                    <div className="h-3 w-32 bg-slate-100 dark:bg-zinc-900 rounded" />
                </div>
                <div className="h-6 w-20 bg-slate-200 dark:bg-zinc-800 rounded-full" />
            </div>

            <div className="flex justify-between items-end border-t border-slate-50 dark:border-zinc-900 pt-4">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-slate-100 dark:bg-zinc-900 rounded-lg" />
                    <div className="h-4 w-16 bg-slate-100 dark:bg-zinc-900 rounded" />
                </div>
                <div className="space-y-1 text-right">
                    <div className="h-3 w-12 bg-slate-100 dark:bg-zinc-900 ml-auto rounded" />
                    <div className="h-5 w-20 bg-slate-200 dark:bg-zinc-800 rounded" />
                </div>
            </div>
        </div>
    );
}

export function LoadingOrdersList() {
    return (
        <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
                <OrderCardSkeleton key={i} />
            ))}
        </div>
    );
}