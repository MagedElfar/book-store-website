"use client";

import Image from "next/image";

import { useAppTranslation } from "@/shared/hooks/use-translation";
import { cn } from "@/shared/lib/utils";
import { formatPrice } from "@/shared/utils/helper";

export interface ReviewItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
}

interface OrderItemsReviewProps {
    items: ReviewItem[];
    maxHeight?: string;
    title?: string;
    className?: string;
}

export function OrderItemsReview({
    items,
    maxHeight = "max-h-[320px]",
    title,
    className,
}: OrderItemsReviewProps) {
    const { t, lang } = useAppTranslation("order");

    return (
        <div className={cn("space-y-3", className)}>
            <h3 className="text-sm font-medium text-slate-500 dark:text-zinc-400 ml-1">
                {title || `${t("summary.items_review")} (${items.length})`}
            </h3>

            <div
                className={cn(
                    "overflow-y-auto rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2",
                    "scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800",
                    maxHeight
                )}
            >
                {items.length > 0 ? (
                    <div className="space-y-1">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={cn(
                                    "flex items-center justify-between p-2 rounded-lg transition-colors",
                                    "hover:bg-slate-50 dark:hover:bg-zinc-900/50",
                                    "border-b border-dashed border-slate-100 dark:border-zinc-800 last:border-0"
                                )}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    {/* الصورة بدون شارة الكمية */}
                                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                                sizes="48px"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold truncate text-slate-900 dark:text-zinc-100">
                                            {item.name}
                                        </p>
                                        {/* الكمية تحت الاسم بجانب سعر الوحدة */}
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[11px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                                                {item.quantity}x
                                            </span>
                                            <p className="text-xs text-slate-500 dark:text-zinc-500">
                                                {formatPrice(item.price, lang)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-sm font-bold text-slate-900 dark:text-zinc-100">
                                    {formatPrice(item.price * item.quantity, lang)}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <p className="text-xs text-slate-400 dark:text-zinc-500 italic">
                            {t("messages.noItemsYet")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}