"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useAppTranslation } from "@/shared/hooks";
import { RotateCcw, Filter } from "lucide-react";
import { BaseFilterList } from "./BaseFilterList";
import { CATEGORY_INFINITE_QUERY, getCategoriesClient } from "@/features/categories";
import { AUTHOR_INFINITE_QUERY, getAuthorsClient } from "@/features/authors";
import { getTagsClient, TAG_INFINITE_QUERY } from "@/features/tags";
import { PriceFilter } from "./PriceFilter";
import { useLoaderContext } from "@/shared/context";

export const BookFilters = () => {
    const { t } = useAppTranslation("common");
    const { setIsUpdating } = useLoaderContext()
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateParams = (key: string, id: string, multi: boolean = false) => {
        setIsUpdating(true)
        const params = new URLSearchParams(searchParams.toString());
        const currentRaw = params.get(key);
        let currentIds = currentRaw ? currentRaw.split(",") : [];

        if (multi) {
            if (currentIds.includes(id)) {
                currentIds = currentIds.filter(i => i !== id);
            } else {
                currentIds.push(id);
            }

            if (currentIds.length > 0) {
                params.set(key, currentIds.join(","));
            } else {
                params.delete(key);
            }
        } else {
            if (currentRaw === id) {
                params.delete(key);
            } else {
                params.set(key, id);
            }
        }

        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const getActiveIds = (key: string) => {
        const val = searchParams.get(key);
        return val ? val.split(",") : [];
    };

    const handleReset = () => {
        setIsUpdating(true)
        router.push(pathname, { scroll: false });
    };

    const hasActiveFilters = searchParams.toString().length > 0;

    return (
        <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-8 p-6 border border-slate-200 dark:border-zinc-800 rounded-3xl bg-slate-50/50 dark:bg-zinc-900/20 backdrop-blur-sm">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                            <Filter size={16} className="text-white" />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">
                            {t("filters.title")}
                        </span>
                    </div>

                    {hasActiveFilters && (
                        <button
                            onClick={handleReset}
                            className="group cursor-pointer flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-500 transition-all duration-200"
                        >
                            <RotateCcw size={14} className="group-hover:-rotate-45 transition-transform" />
                            {t("filters.reset")}
                        </button>
                    )}
                </div>

                <div className="h-px bg-slate-200 dark:bg-zinc-800 w-full" />

                <div className="space-y-8">
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <BaseFilterList
                            title={t("filters.categories")}
                            queryKey={CATEGORY_INFINITE_QUERY}
                            fetchFn={getCategoriesClient}
                            activeIds={getActiveIds("category_ids")}
                            onSelect={(id) => updateParams("category_ids", id, true)}
                            placeholder={t("filters.search")}
                            multiSelect={true}
                        />
                    </div>

                    <div className="h-px bg-slate-200 dark:bg-zinc-800 w-full" />

                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <BaseFilterList
                            title={t("filters.authors")}
                            queryKey={AUTHOR_INFINITE_QUERY}
                            fetchFn={getAuthorsClient}
                            activeIds={getActiveIds("author_ids")}
                            onSelect={(id) => updateParams("author_ids", id, true)}
                            placeholder={t("filters.search")}
                            multiSelect={true}
                        />
                    </div>

                    <div className="h-px bg-slate-200 dark:bg-zinc-800 w-full" />

                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <BaseFilterList
                            title={t("filters.tags")}
                            queryKey={TAG_INFINITE_QUERY}
                            fetchFn={getTagsClient}
                            activeIds={getActiveIds("tag_ids")}
                            onSelect={(id) => updateParams("tag_ids", id, true)}
                            placeholder={t("filters.search")}
                            multiSelect={true}
                        />
                    </div>

                    {/* Price Filter */}
                    <div className="h-px bg-slate-200 dark:bg-zinc-800 w-full" />

                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <PriceFilter
                            title={t("filters.price")}
                            minKey="min_price"
                            maxKey="max_price"
                            updateParams={updateParams}
                            initialMin={searchParams.get("min_price") || ""}
                            initialMax={searchParams.get("max_price") || ""}
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
};