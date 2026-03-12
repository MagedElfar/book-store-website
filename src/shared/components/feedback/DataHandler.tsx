"use client";


import { useAppTranslation } from "@/shared/hooks/use-translation";
import { cn } from "@/shared/lib/utils";

import { ErrorRedirect } from "./ErrorRedirect";
import { NoDataRedirect } from "./NoDataRedirect";
import { Skeleton } from "../shadcn/skeleton";

interface DataHandlerProps<T> {
    isLoading: boolean;
    isError: boolean;
    data: T | null | undefined;
    onRetry?: () => void;
    loadingComponent?: React.ReactNode;
    errorTitle?: string;
    isEmpty?: boolean;
    emptyComponent?: React.ReactNode;
    children: (data: T) => React.ReactNode;
    className?: string; // أضفنا كلاس للتحكم في الحاوية
}

export function DataHandler<T>({
    isLoading,
    isError,
    data,
    onRetry,
    loadingComponent,
    isEmpty,
    emptyComponent,
    children,
    className,
}: DataHandlerProps<T>) {
    const { t } = useAppTranslation("common");

    // 1. حالة التحميل (Loading)
    if (isLoading) {
        return (
            loadingComponent || (
                <div className={cn("space-y-4 p-4", className)}>
                    <Skeleton className="h-14 w-full rounded-xl" />
                    <Skeleton className="h-14 w-full rounded-xl" />
                    <Skeleton className="h-[120px] w-full rounded-xl" />
                </div>
            )
        );
    }

    // 2. حالة الخطأ (Error)
    if (isError) {
        return (
            <ErrorRedirect
                title={t("errorFallback.noRecords")}
                content={t("errorFallback.noRecordsMsg")}
                btnText={t("errorFallback.tryAgain")}
                rest={onRetry}
            />
        );
    }

    // 3. حالة البيانات الفارغة (Empty)
    // لاحظ إننا بنتحقق لو الـ data عبارة عن Array فاضي برضه
    const isActuallyEmpty = isEmpty || !data || (Array.isArray(data) && data.length === 0);

    if (isActuallyEmpty) {
        return emptyComponent || (
            <NoDataRedirect
                title={t("notFound.noRecords")}
                content={t("notFound.noRecordsMsg")}
            />
        );
    }

    // 4. عرض البيانات
    return <>{children(data)}</>;
}