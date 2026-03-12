"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

import { useAppTranslation } from "@/shared/hooks/use-translation";
import { cn } from "@/shared/lib/utils";

interface SearchBarProps {
    isMobile?: boolean;
}

export const SearchBar = ({ isMobile = false }: SearchBarProps) => {
    const { t } = useAppTranslation("common");
    const [query, setQuery] = useState("");

    const handleClear = () => setQuery("");

    return (
        <div className={cn(
            "relative group transition-all duration-300",
            isMobile ? "w-full" : "hidden md:block w-full max-w-2xl"
        )}>
            {/* Search Icon - Logical Properties (start) */}
            <div className="absolute inset-s-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-orange-500 transition-colors pointer-events-none">
                <Search size={isMobile ? 16 : 18} />
            </div>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("nav.searchPlaceholder")}
                className={cn(
                    "w-full bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800",
                    "rounded-full transition-all outline-none",
                    "ps-11 pe-10 shadow-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500",
                    isMobile ? "h-10 text-xs" : "h-11 text-sm"
                )}
            />

            {query && (
                <button
                    onClick={handleClear}
                    type="button"
                    className="absolute inset-e-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                    <X size={14} className="text-muted-foreground" />
                </button>
            )}
        </div>
    );
};