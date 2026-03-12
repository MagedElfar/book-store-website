"use client";
import { Filter, RotateCcw } from "lucide-react";

import { useBookFilters } from "@/shared/hooks/use-book-filters";
import { useAppTranslation } from "@/shared/hooks/use-translation";

import { FilterFields } from "./FilterFields";

export const BookFilters = (props: { hideAuthors?: boolean; hideCategories?: boolean }) => {
    const { t } = useAppTranslation("common");
    const { hasActiveFilters, handleReset } = useBookFilters();

    return (
        <>
            <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-32 flex flex-col h-[calc(100vh-140px)] px-4 py-6 border border-slate-200 dark:border-zinc-800 rounded-3xl bg-slate-50/50 dark:bg-zinc-900/20 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-6 shrink-0">
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-blue-600" />
                            <span className="font-bold">{t("filters.title")}</span>
                        </div>
                        {hasActiveFilters && (
                            <button onClick={handleReset} className="text-xs cursor-pointer font-bold text-slate-400 hover:text-red-500 flex items-center gap-1">
                                <RotateCcw size={14} />
                                {t("filters.reset")}
                            </button>
                        )}
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <FilterFields {...props} />
                    </div>
                </div>
            </aside>
        </>
    );
};