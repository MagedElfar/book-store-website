"use client"

import { Search, X } from "lucide-react";
import { useDebounce } from "minimal-shared/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useLoaderContext } from "@/shared/context/LoaderContext";
import { useAppTranslation } from "@/shared/hooks/use-translation";


interface SearchBarProps {
    searchKey?: string;
}

export const SearchFilter = ({ searchKey = "search" }: SearchBarProps) => {
    const { t } = useAppTranslation("common");
    const { setIsUpdating } = useLoaderContext();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(searchParams.get(searchKey) || "");

    const handleClear = () => setQuery("");

    const debouncedQuery = useDebounce(query, 500);

    const updateParams = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(searchKey, value);
        } else {
            params.delete(searchKey);
        }

        params.set("page", "1");
        setIsUpdating(true);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchKey, searchParams, setIsUpdating]);

    useEffect(() => {
        const currentSearch = searchParams.get(searchKey) || "";
        if (debouncedQuery !== currentSearch) {
            updateParams(debouncedQuery);
        }
    }, [debouncedQuery, searchKey, searchParams, updateParams]);

    return (
        <div className="relative w-full group transition-all duration-300">
            <div className="absolute inset-s-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-orange-500 transition-colors pointer-events-none">
                <Search size={18} />
            </div>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("nav.searchPlaceholder")}
                className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full px-11 transition-all outline-none h-11 text-sm focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5"
            />

            {query && (
                <button
                    onClick={handleClear}
                    type="button"
                    className="absolute cursor-pointer inset-e-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                    <X size={14} className="text-muted-foreground" />
                </button>
            )}
        </div>
    );
};