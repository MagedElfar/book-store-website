"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { useLoaderContext } from "@/shared/context";
import { useAppTranslation } from "@/shared/hooks";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
    const { dir } = useAppTranslation()
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { setIsUpdating } = useLoaderContext();

    if (totalPages <= 1) return null;

    const handlePageChange = (page: number) => {
        if (page === currentPage || page < 1 || page > totalPages) return;

        setIsUpdating(true);

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());

        router.push(`${pathname}?${params.toString()}`, { scroll: true });
    };

    const getVisiblePages = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-12 pb-10">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full cursor-pointer rounded-xl border border-slate-200 dark:border-zinc-800 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
            >
                {
                    dir === "rtl" ? <ChevronRight size={18} /> : <ChevronLeft size={18} />
                }

            </button>

            {/* أرقام الصفحات */}
            <div className="flex items-center gap-1.5">
                {getVisiblePages().map((page, index) => (
                    page === "..." ? (
                        <span key={index} className="px-2 text-slate-400"><MoreHorizontal size={14} /></span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => handlePageChange(Number(page))}
                            className={`min-w-[40px] h-[40px] text-xs font-bold rounded-full transition-all ${currentPage === page
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                : "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-blue-500 cursor-pointer"
                                }`}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            {/* زرار التالي */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-slate-200 dark:border-zinc-800 disabled:opacity-30 cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
            >
                {
                    dir === "rtl" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />
                }
            </button>
        </div>
    );
};