"use client";

import { useAppTranslation } from "@/shared/hooks/use-translation";
import { cn } from "@/shared/lib/utils";
import { formatPrice } from "@/shared/utils/helper";

interface OrderSummaryCardProps {
    subtotal: number;
    shippingCost: number;
    vatCost: number;
    finalTotal: number;
    title?: string;
    className?: string;
}

export function OrderSummaryCard({
    subtotal,
    shippingCost,
    vatCost,
    finalTotal,
    title,
    className,
}: OrderSummaryCardProps) {
    const { t, lang } = useAppTranslation("order");

    return (
        <div className={cn("space-y-4", className)}>

            {title && (
                <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                    {title}
                </h3>
            )}

            <div className="space-y-3">
                <SummaryRow
                    label={t("summary.subtotal")}
                    value={formatPrice(subtotal, lang)}
                />

                <SummaryRow
                    label={t("summary.shipping")}
                    value={formatPrice(shippingCost, lang)}
                    valueClassName="text-emerald-600 dark:text-emerald-400 font-medium"
                />

                <SummaryRow
                    label={t("summary.vat")}
                    value={formatPrice(vatCost, lang)}
                />

                <div className="pt-2 border-t border-slate-100 dark:border-zinc-800" />

                <div className="flex justify-between items-center pt-1">
                    <span className="text-base font-bold text-slate-900 dark:text-zinc-100">
                        {t("summary.total")}
                    </span>
                    <span className="text-xl font-black text-primary">
                        {formatPrice(finalTotal, lang)}
                    </span>
                </div>
            </div>

        </div>
    );
}

interface SummaryRowProps {
    label: string;
    value: string;
    valueClassName?: string;
}

function SummaryRow({ label, value, valueClassName }: SummaryRowProps) {
    return (
        <div className="flex justify-between items-center group">
            <span className="text-sm text-slate-500 dark:text-zinc-400 group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                {label}
            </span>
            <span className={cn(
                "text-sm font-semibold text-slate-900 dark:text-zinc-100",
                valueClassName
            )}>
                {value}
            </span>
        </div>
    );
}