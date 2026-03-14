import { PageLayout } from "@/shared/components/layout/PageLayout";
import { SectionHeaderSkeleton } from "@/shared/components/loading/SectionHeaderSkeleton";
import { Skeleton } from "@/shared/components/shadcn/skeleton";

export default function AuthorsLoading() {
    return (
        <PageLayout>
            <SectionHeaderSkeleton />

            <div className="grid gap-10 lg:gap-12 mt-8">
                <div >
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6 md:gap-8 lg:gap-10 px-2 sm:px-0">
                        {[...Array(12)].map((_, i) => (
                            <AuthorCardSkeleton key={i} />
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

function AuthorCardSkeleton() {
    return (
        <div className="flex flex-col items-center gap-4">
            {/* Circle Image Skeleton */}
            <div className="relative w-[100px] h-[100px] md:w-[125px] md:h-[125px]">
                <Skeleton className="h-full w-full rounded-full" />
            </div>

            {/* Author Name Skeleton */}
            <Skeleton className="h-5 w-20 md:w-24 rounded-md" />
        </div>
    );
}