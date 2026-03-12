import { Skeleton } from "@/shared/components/shadcn/skeleton";

export function AddressFormSkeleton() {
    return (
        <div className="w-full p-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Full Name Field Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-12 w-full rounded-md" />
                </div>

                {/* Phone Field Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-12 w-full rounded-md" />
                </div>

                {/* Country Field Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-12 w-full rounded-md" />
                </div>

                {/* City Field Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-12 w-full rounded-md" />
                </div>

                {/* Street Address Field Skeleton (Multiline) */}
                <div className="space-y-2 md:col-span-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-20 w-full rounded-md" />
                </div>

                {/* Is Default Checkbox Skeleton */}
                <div className="flex items-center gap-2 md:col-span-2">
                    <Skeleton className="h-5 w-5 rounded-sm" />
                    <Skeleton className="h-4 w-44" />
                </div>

                {/* Map Picker Area Skeleton */}
                <div className="space-y-3 md:col-span-2">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-28" />
                        <Skeleton className="h-8 w-24 rounded-md" />
                    </div>
                    <Skeleton className="h-[350px] w-full rounded-lg" />
                </div>

                {/* Submit Button Skeleton */}
                <div className="flex justify-center pt-4 md:col-span-2">
                    <Skeleton className="h-11 w-40 rounded-md" />
                </div>
            </div>
        </div>
    );
}