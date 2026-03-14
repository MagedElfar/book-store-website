import { BookCardSkeleton } from "@/features/books/components/loading/BookCardSkeleton";

import { BaseFilterListSkeleton } from "./BaseFilterListSkeleton";
import { Skeleton } from "../shadcn/skeleton";

export function BookListSectionSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row gap-8">

            {/* Desktop Side Filters Skeleton */}
            <aside className="hidden lg:block w-64 shrink-0 space-y-10">
                <BaseFilterListSkeleton />
                <BaseFilterListSkeleton />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
                {/* Mobile Filter & Sorting Header */}
                <div className="flex justify-between md:justify-end items-center mb-6 gap-4">
                    <Skeleton className="h-12 w-full md:hidden rounded-2xl" />

                    <Skeleton className="h-10 w-40 rounded-xl" />
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <BookCardSkeleton key={i} />
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="mt-12 flex justify-center">
                    <Skeleton className="h-10 w-64 rounded-full" />
                </div>
            </div>
        </div>
    );
}