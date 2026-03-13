"use client";

import { Filter, RotateCcw } from "lucide-react";

import { Button } from "@/shared/components/shadcn/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/shared/components/shadcn/sheet";
import { useBookFilters } from "@/shared/hooks/use-book-filters";
import { useAppTranslation } from "@/shared/hooks/use-translation";

import { FilterFields } from "./FilterFields";

export const MobileBookFilters = (props: any) => {
    const { hasActiveFilters, handleReset } = useBookFilters();
    const { t, dir } = useAppTranslation("common");

    const side = dir === "rtl" ? "right" : "left";

    return (
        <div className="lg:hidden mb-4">
            <Sheet>
                {/* 1. الزر الذي يفتح الـ Drawer */}
                <SheetTrigger asChild>
                    <button className="flex items-center justify-center gap-2 w-full py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl font-bold px-3 shadow-sm active:scale-[0.98] transition-transform">
                        <Filter size={18} className="text-primary" />
                        {t("filters.title")}
                        {hasActiveFilters && (
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        )}
                    </button>
                </SheetTrigger>

                <SheetContent
                    side={side}
                    className="w-[85%] sm:max-w-[350px] p-0 flex flex-col border-none"
                >
                    <SheetHeader className="p-6 border-b border-slate-50 dark:border-zinc-900 flex-row justify-between items-center space-y-0">
                        <SheetTitle className="text-lg font-bold">
                            {t("filters.title")}
                        </SheetTitle>

                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleReset}
                                className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full"
                            >
                                <RotateCcw size={18} />
                            </Button>
                        )}
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                        <FilterFields {...props} />
                    </div>

                    <div className="p-4 bg-white dark:bg-zinc-950 border-t border-slate-100 dark:border-zinc-900 shrink-0">
                        <SheetClose asChild>
                            <Button
                                className="w-full h-12 rounded-xl font-bold text-base shadow-lg shadow-primary/20 active:scale-[0.97] transition-all"
                            >
                                {t("filters.apply") || "Apply Filters"}
                            </Button>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};