"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Check, Loader2, ChevronDown } from "lucide-react";
import { useInfiniteLookup } from "@/shared/hooks/useInfiniteLookup";
import { GetManyResponse } from "@/shared/types";
import { useAppTranslation } from "@/shared/hooks";
import { useDebounce } from 'minimal-shared/hooks';
import { APP_CLIENT_INTERNALS } from "next/dist/shared/lib/constants";
import { INFINITE_RECORDED_LIMIT } from "@/shared/config";

interface BaseFilterListProps<T> {
    title: string;
    queryKey: any[];
    fetchFn: (params: {
        search: string;
        page: number;
        limit: number;
        sortBy: any
    }) => Promise<GetManyResponse<T>>;
    activeIds: string[]; // مصفوفة للتعامل مع المجموعات
    onSelect: (id: string) => void;
    placeholder: string;
    multiSelect?: boolean; // خاصية للتبديل بين النوعين
}

export function BaseFilterList<T>({
    title,
    queryKey,
    fetchFn,
    activeIds,
    onSelect,
    placeholder,
    multiSelect = false
}: BaseFilterListProps<T>) {
    const { t, getLocalizedValue } = useAppTranslation("common");
    const [searchTerm, setSearchTerm] = useState("");
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const debouncedSearch = useDebounce(searchTerm, 500);
    const limit = INFINITE_RECORDED_LIMIT;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteLookup(
        [...queryKey, debouncedSearch],
        (page) => fetchFn({ search: debouncedSearch, page, limit, sortBy: "alpha" })
    );

    const items = data?.pages.flatMap((page) => page.items) || [];

    useEffect(() => {
        if (isFetchingNextPage === false && items.length > limit) {
            scrollContainerRef.current?.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [items.length, isFetchingNextPage]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h4 className="font-bold text-xs text-slate-400 dark:text-zinc-500 uppercase tracking-[0.15em]">
                    {title}
                </h4>

                {activeIds.length > 0 && (
                    <span className="flex items-center justify-center bg-blue-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full shadow-sm shadow-blue-500/20 animate-in zoom-in duration-300">
                        {activeIds.length}
                    </span>
                )}
            </div>
            {/* Search Input */}
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={14} />
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div
                ref={scrollContainerRef}
                className="flex flex-col gap-1 max-h-60 overflow-y-auto 
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                {isLoading ? (
                    <div className="flex justify-center py-4">
                        <Loader2 className="animate-spin text-blue-500/50" size={18} />
                    </div>
                ) : (
                    items.map((item: any) => {
                        const isSelected = activeIds.includes(String(item.id));
                        return (
                            <button
                                key={item.id}
                                onClick={() => onSelect(String(item.id))}
                                className={`flex items-center gap-3 px-2 py-2 rounded-xl text-sm transition-all group ${isSelected
                                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                                    : "hover:bg-slate-100 dark:hover:bg-zinc-800/50 text-slate-600 dark:text-zinc-400"
                                    }`}
                            >
                                {/* Checkbox/Radio UI */}
                                <div className={`shrink-0 w-5 h-5 flex items-center justify-center transition-all duration-200 border ${multiSelect ? "rounded-md" : "rounded-full"
                                    } ${isSelected
                                        ? "bg-blue-600 border-blue-600 shadow-sm shadow-blue-500/30"
                                        : "border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 group-hover:border-blue-400"
                                    }`}>
                                    {isSelected && <Check size={12} strokeWidth={4} className="text-white" />}
                                </div>

                                <span className="truncate flex-1 text-left rtl:text-right text-[13px]">
                                    {getLocalizedValue(item)}
                                </span>
                            </button>
                        );
                    })
                )}

                {!isLoading && items.length === 0 && (
                    <p className="text-[11px] text-slate-400 text-center py-2 italic">
                        {t("common.noResults")}
                    </p>
                )}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="w-full py-2 text-[10px] font-bold text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-xl transition-all flex items-center justify-center gap-1 border border-dashed border-slate-200 dark:border-zinc-800"
                >
                    {isFetchingNextPage ? (
                        <Loader2 className="animate-spin" size={12} />
                    ) : (
                        <>
                            {t("common.loadMore")}
                            <ChevronDown size={12} />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}