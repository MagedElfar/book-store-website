"use client";

import { LibraryBig, RotateCcw } from "lucide-react";

import { useAppTranslation, useBookFilters } from "@/shared/hooks";

interface EmptyStateProps {
    title?: string;
    description?: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
    const { t } = useAppTranslation("common");
    const { handleReset, hasActiveFilters } = useBookFilters();

    return (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-in fade-in zoom-in-95 duration-500">
            {/* Icon Wrapper */}
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-2xl scale-150" />
                <div className="relative p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <LibraryBig size={48} className="text-blue-600 dark:text-blue-500" />
                </div>
            </div>

            {/* Text */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {title || t("empty.title")}
            </h3>
            <p className="text-slate-500 dark:text-zinc-400 max-w-xs mx-auto mb-8 leading-relaxed">
                {description || t("empty.description")}
            </p>

            {/* Action: Reset Filters */}
            {hasActiveFilters && (
                <button
                    onClick={handleReset}
                    className="group flex cursor-pointer items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-zinc-950 rounded-2xl font-bold hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all duration-300 active:scale-95"
                >
                    <RotateCcw size={18} className="group-hover:-rotate-45 transition-transform" />
                    {t("filters.reset")}
                </button>
            )}
        </div>
    );
};