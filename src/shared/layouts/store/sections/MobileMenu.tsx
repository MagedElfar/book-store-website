"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppTranslation } from "@/shared/hooks";
import { LangSwitcher, ThemeToggle } from "@/shared/components";
import { NavItems } from "./NavItems";
import { useMobileMenu } from "@/store/use-mobile-menu";
import { SearchBar } from "../components";
import { Logo } from "../../common";

interface MobileMenuProps {
    categories: any[];
}

export const MobileMenu = ({ categories }: MobileMenuProps) => {
    const { t } = useAppTranslation("common");

    // Zustand Store
    const isOpen = useMobileMenu((state) => state.isOpen);
    const closeMenu = useMobileMenu((state) => state.close);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-500",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={closeMenu}
            />

            <aside
                className={cn(
                    "fixed top-0 h-full w-[300px] bg-white dark:bg-zinc-950 shadow-2xl transition-transform duration-500 ease-in-out flex flex-col z-[101]",
                    "left-0 rtl:left-auto rtl:right-0",
                    isOpen
                        ? "translate-x-0"
                        : "ltr:-translate-x-full rtl:translate-x-full"
                )}
            >
                <div className="flex items-center justify-between p-6 border-b dark:border-zinc-800">
                    <Logo />
                    <button
                        onClick={closeMenu}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 no-scrollbar">

                    <div className="mb-8">
                        <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-[0.1em]">
                            {t("nav.searchTitle")}
                        </p>
                        <SearchBar isMobile />
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-[0.1em]">
                            {t("nav.sectionsTitle")}
                        </p>
                        <NavItems
                            categories={categories}
                            isMobile
                            onClick={closeMenu}
                        />
                    </div>
                </div>

                <div className="p-4 border-t dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/20">
                    <div className="flex items-center bg-white dark:bg-zinc-950 px-2 py-2 rounded-xl shadow-sm border dark:border-zinc-800">

                        <div className="flex flex-1 items-center justify-center gap-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                {t("nav.language")}
                            </span>
                            <div className="scale-75 origin-center">
                                <LangSwitcher />
                            </div>
                        </div>

                        <div className="h-5 shrink-0 w-[1px] bg-slate-200 dark:bg-zinc-800" />

                        <div className="flex flex-1 items-center justify-center gap-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                {t("nav.appearance")}
                            </span>
                            <div className="scale-75 origin-center">
                                <ThemeToggle />
                            </div>
                        </div>

                    </div>
                </div>
            </aside>
        </>
    );
};