import { Skeleton } from "@/shared/components/shadcn/skeleton";

export function MapSkeleton() {
    return (
        <div className="w-full mb-4">
            <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-5 w-[100px]" />

                <Skeleton className="h-8 w-[120px] rounded-md" />
            </div>

            <div className="mb-3">
                <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <Skeleton
                className="h-[350px] w-full rounded-lg"
            />
        </div>
    );
}