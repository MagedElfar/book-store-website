import { Card, CardContent } from "@/shared/components/shadcn/card";
import { Separator } from "@/shared/components/shadcn/separator";
import { Skeleton } from "@/shared/components/shadcn/skeleton";

export function AddressCardSkeleton() {
    return (
        <Card className="h-full border-muted-foreground/10 shadow-sm overflow-hidden">
            <CardContent className="p-5">
                {/* Header: Name & Actions Skeleton */}
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2 w-[70%]">
                        <div className="flex items-center gap-2">
                            {/* Full Name Placeholder */}
                            <Skeleton className="h-5 w-[60%]" />
                            {/* Default Badge Placeholder */}
                            <Skeleton className="h-5 w-14 rounded-full" />
                        </div>
                        {/* Phone Number Placeholder */}
                        <div className="flex items-center gap-1.5">
                            <Skeleton className="h-3.5 w-3.5 rounded-full" />
                            <Skeleton className="h-3 w-[40%]" />
                        </div>
                    </div>

                    {/* Action Buttons (Edit & Delete) */}
                    <div className="flex items-center gap-1">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                </div>

                <Separator className="mb-4 bg-muted/50 border-dashed" />

                {/* Location Text Placeholder */}
                <div className="flex gap-2 mb-4 min-h-[40px]">
                    <Skeleton className="h-4 w-4 rounded-full shrink-0 mt-0.5" />
                    <div className="space-y-2 w-full">
                        <Skeleton className="h-3 w-[90%]" />
                        <Skeleton className="h-3 w-[60%]" />
                    </div>
                </div>

                {/* Map Preview Placeholder */}
                <Skeleton className="h-[150px] w-full rounded-lg" />
            </CardContent>
        </Card>
    );
}

export function LoadingAddressList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="col-span-1">
                    <AddressCardSkeleton />
                </div>
            ))}
        </div>
    );
}