import { Skeleton } from '@/shared/components/shadcn/skeleton'

export default function BookActionFallback() {
    return (
        <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
                <Skeleton className="h-[56px] w-full sm:w-[140px] rounded-xl" />
                <Skeleton className="h-[56px] flex-1 rounded-xl" />
            </div>
        </div>
    )
}
