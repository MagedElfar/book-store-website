"use client";

import { Search, X, Loader2, BookOpen, ArrowUpRight } from "lucide-react";
import { useDebounce } from "minimal-shared/hooks";
import Image from "next/image";
import { useState, useRef } from "react";

import { getBooKsApi } from "@/features/books/api/get";
import { BOOK_INFINITE_QUERY } from "@/features/books/constants/api";
import { Book } from "@/features/books/types/book";
import { Link } from "@/i18n/routing";
import { Input } from "@/shared/components/shadcn/input";
import { ScrollArea } from "@/shared/components/shadcn/scroll-area";
import { paths } from "@/shared/config/paths";
import { useOnClickOutside } from "@/shared/hooks/use-onclick-outside";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { useInfiniteLookup } from "@/shared/hooks/useInfiniteLookup";
import { cn } from "@/shared/lib/utils";

export const SearchBar = ({ isMobile = false, onClick }: { isMobile?: boolean; onClick?: () => void }) => {
    const { t, getLocalizedValue, lang: locale } = useAppTranslation("common");
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const debouncedSearch = useDebounce(query, 500);
    const isRtl = locale === "ar";

    useOnClickOutside(containerRef, () => setIsOpen(false));

    const { data, isLoading, isFetchingNextPage } = useInfiniteLookup<Book>(
        [...BOOK_INFINITE_QUERY, debouncedSearch],
        (page) => getBooKsApi({ search: debouncedSearch, page, limit: 10, sortBy: "alpha" }),
        !!debouncedSearch,
        10
    );

    const allBooks = data?.pages.flatMap((page) => page.items) || [];

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full z-50", !isMobile && "hidden md:block max-w-2xl")}
            dir={isRtl ? "rtl" : "ltr"}
        >
            {/* Search Input Field */}
            <div className="relative group">
                <div className={cn(
                    "absolute inset-y-0 flex items-center justify-center text-muted-foreground/90 group-focus-within:text-orange-500 transition-colors pointer-events-none z-10",
                    isRtl ? "right-4" : "left-4"
                )}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-orange-500" /> : <Search className="h-4 w-4" />}
                </div>

                <Input
                    value={query}
                    onFocus={() => setIsOpen(true)}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    placeholder={t("nav.searchPlaceholder")}
                    className={cn(
                        "rounded-2xl bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-sm focus-visible:ring-4 focus-visible:ring-orange-500/10 focus-visible:border-orange-500 transition-all text-foreground w-full",
                        isRtl ? "pr-11 pl-10 text-right" : "pl-11 pr-10 text-left",
                        isMobile ? "h-10 text-xs" : "h-11 text-sm"
                    )}
                />

                {query && (
                    <button
                        type="button"
                        onClick={() => { setQuery(""); setIsOpen(false); }}
                        className={cn(
                            "absolute inset-y-0 flex items-center justify-center p-1 text-muted-foreground hover:text-orange-500 transition-colors z-10",
                            isRtl ? "left-3" : "right-3"
                        )}
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Results Dropdown */}
            {isOpen && debouncedSearch && (
                <div className={cn(
                    "absolute top-full mt-2 w-full bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl z-[999] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200",
                    isRtl ? "text-right" : "text-left"
                )}>
                    <ScrollArea className={cn(isMobile ? "h-[320px]" : "h-[400px]", "w-full")}>
                        <div className="p-2">
                            {allBooks.length > 0 ? (
                                <>
                                    <div className={cn(
                                        "px-4 py-2 flex items-center justify-between border-b border-gray-50 dark:border-zinc-900 mb-2",
                                        isRtl ? "flex-row-reverse" : "flex-row"
                                    )}>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                            {t("nav.searchResults")}
                                        </span>
                                        <span className="text-[10px] bg-orange-500/10 text-orange-600 px-2 py-0.5 rounded-full font-bold">
                                            {allBooks.length}
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        {allBooks.map((book) => (
                                            <Link
                                                key={book.id}
                                                href={paths.books.details(book.slug)}
                                                onClick={() => { setIsOpen(false); onClick?.(); }}
                                                className={cn(
                                                    "flex items-start p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-500/5 transition-all group/item",
                                                    isRtl ? "flex-row-reverse space-x-reverse" : "flex-row"
                                                )}
                                            >
                                                {/* Book Cover - Fixed Sizes */}
                                                <div className={cn(
                                                    "relative flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm bg-gray-50",
                                                    isMobile ? "h-[54px] w-[40px]" : "h-14 w-10"
                                                )}>
                                                    <Image
                                                        src={book.cover_image || "/images/img-ph.jpg"}
                                                        alt={getLocalizedValue(book, "title")}
                                                        fill
                                                        sizes={isMobile ? "40px" : "48px"}
                                                        className="object-cover transition-transform duration-300 group-hover/item:scale-110"
                                                    />
                                                </div>

                                                {/* Book Details - Tight Layout & Spacing */}
                                                <div className={cn(
                                                    "flex-1 min-w-0 flex flex-col justify-center self-center",
                                                    isRtl ? "pr-3 text-right" : "pl-3 text-left"
                                                )}>
                                                    <h4 className={cn(
                                                        "font-semibold text-gray-900 dark:text-zinc-100 group-hover/item:text-orange-600 transition-colors line-clamp-2 leading-[1.2]",
                                                        isMobile ? "text-[13px]" : "text-sm"
                                                    )}>
                                                        {getLocalizedValue(book, "title")}
                                                    </h4>
                                                    <p className={cn(
                                                        "text-muted-foreground truncate mt-1",
                                                        isMobile ? "text-[10px]" : "text-[11px]"
                                                    )}>
                                                        {getLocalizedValue(book?.authors?.[0], "name")}
                                                    </p>
                                                </div>

                                                {/* Navigation Icon */}
                                                <ArrowUpRight className={cn(
                                                    "h-4 w-4 opacity-0 transition-all text-orange-500 group-hover/item:opacity-100 flex-shrink-0 self-center",
                                                    isRtl ? "rotate-[-90deg] group-hover/item:-translate-x-1" : "group-hover/item:translate-x-1",
                                                    isMobile && "hidden"
                                                )} />
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : !isLoading && (
                                <div className="py-20 flex flex-col items-center justify-center text-center">
                                    <BookOpen className="h-8 w-8 text-muted-foreground/30 mb-4" />
                                    <p className="text-sm font-medium text-muted-foreground px-10">
                                        {t("nav.noResults")} "{query}"
                                    </p>
                                </div>
                            )}

                            {isFetchingNextPage && (
                                <div className="p-4 flex justify-center border-t border-gray-50 dark:border-zinc-900 mt-2">
                                    <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            )}
        </div>
    );
};