import { PageLayout } from "@/shared/components/layout/PageLayout";
import { BookListSectionSkeleton } from "@/shared/components/loading/BookListSectionSkeleton";
import { Skeleton } from "@/shared/components/shadcn/skeleton";

export default function CategoryDetailsLoading() {
    return (
        <>
            {/* 1. Category Header Skeleton */}
            <header className="relative mb-10">
                {/* Banner Skeleton */}
                <div className="relative h-[200px] md:h-[300px] w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <Skeleton className="h-full w-full rounded-none" />
                </div>

                <div className="container mx-auto px-6">
                    <div className="relative -mt-16 md:-mt-20 flex flex-col items-center text-center">
                        {/* Circle Profile Image Skeleton */}
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-zinc-950 overflow-hidden shadow-xl">
                            <Skeleton className="h-full w-full rounded-full" />
                        </div>

                        <div className="mt-6 max-w-3xl flex flex-col items-center">
                            {/* Category Name Skeleton */}
                            <Skeleton className="h-10 md:h-14 w-64 mb-3" />

                            {/* Description Skeleton (2 Lines) */}
                            <div className="space-y-2 w-full max-w-lg flex flex-col items-center">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <PageLayout>
                <BookListSectionSkeleton />
            </PageLayout>
        </>
    );
}