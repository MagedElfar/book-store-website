import BookActionFallback from "@/features/books/components/BookActionFallback";
import { PageLayout } from "@/shared/components/layout/PageLayout";
import { Skeleton } from "@/shared/components/shadcn/skeleton";

export default function LoadingSingleBookPage() {
    return (
        <PageLayout>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                {/* 1. Book Gallery Skeleton (Left Side - col 5) */}
                <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-28 flex flex-col gap-6 w-full max-w-[500px] mx-auto">
                        {/* Main Image Display */}
                        <Skeleton className="aspect-[0.9] w-full rounded-[1.5rem]" />

                        {/* Thumbnails */}
                        <div className="flex gap-3 px-2">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-20 flex-1 rounded-lg" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Book Info Skeleton (Right Side - col 7) */}
                <div className="lg:col-span-7 flex flex-col gap-8">

                    {/* Header Actions (Stock & Icons) */}
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-8 w-28 rounded-lg" />
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </div>

                    {/* Title & Meta */}
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-3/4 rounded-lg" />
                        <div className="flex flex-col gap-3">
                            <Skeleton className="h-5 w-48 rounded" /> {/* Authors */}
                            <div className="flex gap-2"> {/* Categories */}
                                <Skeleton className="h-8 w-24 rounded-full" />
                                <Skeleton className="h-8 w-24 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Rating & Price */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-8 w-20 rounded-lg" />
                            <Skeleton className="h-5 w-32 rounded" />
                        </div>
                        <hr className="border-slate-100 dark:border-zinc-800" />
                        <Skeleton className="h-12 w-40 rounded-lg" />
                    </div>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-2 py-6 border-y border-slate-100 dark:border-zinc-800">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-3 w-12" />
                                <Skeleton className="h-5 w-24" />
                            </div>
                        ))}
                    </div>

                    {/* Description Paragraphs */}
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>

                    {/* Action Buttons (Add to Cart) */}
                    <BookActionFallback />

                    {/* Footer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>

                </div>
            </div>
        </PageLayout>
    );
}