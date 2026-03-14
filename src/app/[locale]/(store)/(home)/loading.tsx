import { Skeleton } from "@/shared/components/shadcn/skeleton";

export default function HomeLoading() {
    return (
        <div className="space-y-12 pb-12">
            {/* 1. Hero Section Skeleton */}
            <section className="container px-4 pt-6">
                <Skeleton className="h-[400px] w-full rounded-2xl" />
            </section>

            {/* 2. Featured Categories Skeleton */}
            <section className="container px-4">
                <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-6 w-24" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-32 w-full rounded-xl" />
                            <Skeleton className="h-4 w-3/4 mx-auto" />
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Best Sellers / Book Slider Skeleton */}
            <section className="container px-4">
                <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-8 w-64" />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Authors Section Skeleton */}
            <section className="container px-4 py-8 bg-muted/30 rounded-3xl">
                <div className="flex flex-col items-center mb-8 space-y-2">
                    <Skeleton className="h-8 w-56" />
                    <Skeleton className="h-4 w-80" />
                </div>
                <div className="flex justify-center gap-8 overflow-hidden">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center space-y-3">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}