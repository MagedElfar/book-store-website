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
                    <Button
                        className="
            flex items-center justify-center gap-2 w-full py-6
            /* Light Mode: خلفية بيضاء ناصعة مع حدود واضحة */
            bg-white text-slate-900 border-slate-200 shadow-sm
            /* Dark Mode: خلفية رمادية فاتحة (Zinc-800) لتعطي تباين مع خلفية الصفحة السوداء */
            dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700
            /* Hovers: تفاعل ألوان حقيقي */
            hover:bg-slate-50 dark:hover:bg-zinc-700/80
            /* الـ Border: خليه واضح وحاد */
            border rounded-2xl font-bold px-4 
            /* التفاعل الحركي */
            active:scale-[0.97] transition-all duration-200
        "
                    >
                        <Filter size={18} className="text-primary stroke-[2.5px]" />

                        <span className="text-[15px]">{t("filters.title")}</span>

                        {hasActiveFilters && (
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-white dark:border-zinc-800"></span>
                            </span>
                        )}
                    </Button>
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