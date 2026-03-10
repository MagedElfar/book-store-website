"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { useLoaderContext } from "@/shared/context";
import { useAppTranslation } from "@/shared/hooks";

export const SortingFilter = () => {
    const { t } = useAppTranslation("common");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { setIsUpdating } = useLoaderContext();

    const currentSort = searchParams.get("sortBy") || "sales_count";

    const options = [
        { value: "sales_count", label: t("sort.mostPopular") },
        { value: "newest", label: t("sort.newest") },
        { value: "oldest", label: t("sort.oldest") },
        { value: "price_low", label: t("sort.priceLow") },
        { value: "price_high", label: t("sort.priceHigh") },
        { value: "alpha", label: t("sort.alphabetical") },
    ];

    const handleSortChange = (newValue: string) => {
        if (newValue === currentSort) return;

        // 1. شغل اللودر الـ Global
        setIsUpdating(true);

        // 2. حدث الـ URL
        const params = new URLSearchParams(searchParams.toString());
        params.set("sortBy", newValue);
        params.set("page", "1"); // ارجع لصفحة 1 دايماً عند تغيير الترتيب

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="relative inline-block">
            <select
                value={currentSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-slate-100 text-xs font-bold py-2.5 pl-4 pr-10 rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all outline-none border-none"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"
            />
        </div>
    );
};