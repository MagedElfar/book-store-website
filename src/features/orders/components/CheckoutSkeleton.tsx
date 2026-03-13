"use client"

import { Skeleton } from "@/shared/components/shadcn/skeleton"


export function CheckoutSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-slate-100 dark:border-zinc-900 space-y-6"
                        >
                            <Skeleton className="h-7 w-40" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" /> {/* Label */}
                                    <Skeleton className="h-12 w-full rounded-xl" /> {/* Input */}
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" /> {/* Label */}
                                    <Skeleton className="h-12 w-full rounded-xl" /> {/* Input */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-slate-100 dark:border-zinc-900 space-y-6">
                        <Skeleton className="h-6 w-32" />

                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Skeleton className="h-14 w-14 rounded-lg flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/4" />
                                    </div>
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-slate-100 dark:border-zinc-900 pt-6 space-y-4">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <div className="flex justify-between pt-2">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-28" />
                            </div>
                        </div>

                        <Skeleton className="h-12 w-full rounded-xl mt-4" />
                    </div>
                </aside>
            </div>
        </div>
    )
}