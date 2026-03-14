import { PageLayout } from "@/shared/components/layout/PageLayout";
import { SectionHeaderSkeleton } from "@/shared/components/loading/SectionHeaderSkeleton";
import { Skeleton } from "@/shared/components/shadcn/skeleton";

export default function CategoriesLoading() {
    return (
        <PageLayout>
            <SectionHeaderSkeleton />

            <div className="grid gap-10 lg:gap-12 mt-8">
                <div className="max-w-md">
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6 md:gap-8 lg:gap-10 px-2 sm:px-0">
                        {[...Array(12)].map((_, i) => (
                            <CategoryCardSkeleton key={i} />
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <Skeleton className="h-10 w-64 rounded-md" />
                </div>
            </div>
        </PageLayout>
    );
}

function CategoryCardSkeleton() {
    return (
        <div className="flex flex-col w-full border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden">
            {/* Image Skeleton */}
            <div className="relative aspect-[4/3] w-full">
                <Skeleton className="h-full w-full rounded-none" />
            </div>

            {/* Content Skeleton */}
            <div className="p-3 md:p-4 flex items-center justify-center">
                <Skeleton className="h-5 w-2/3" />
            </div>
        </div>
    );
}