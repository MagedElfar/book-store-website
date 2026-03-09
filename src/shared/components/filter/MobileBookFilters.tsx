"use client";
import { useState, useEffect } from "react";
import { Filter, X, RotateCcw } from "lucide-react";
import { FilterFields } from "./FilterFields";
import { useAppTranslation, useBookFilters } from "@/shared/hooks";

export const MobileBookFilters = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const { hasActiveFilters, handleReset } = useBookFilters();
    const { t } = useAppTranslation("common");

    // منع سكرول الصفحة الأساسية لما المنيو تفتح
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    return (
        <>

            <div className="lg:hidden mb-4">

                <button onClick={() => setIsOpen(true)} className="flex items-center justify-center gap-2 w-full py-3 bg-white dark:bg-zinc-900 border rounded-2xl font-bold px-3">

                    <Filter size={18} className="text-blue-600" />

                    {t("filters.title")}

                    {hasActiveFilters && <span className="w-2 h-2 bg-red-500 rounded-full" />}

                </button>

            </div>

            {/* 2. الـ Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="absolute right-0 top-0 h-full w-[85%] max-w-[320px] bg-white dark:bg-zinc-950 p-6 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="flex justify-between items-center mb-6 shrink-0">
                            <span className="font-bold text-lg">{t("filters.title")}</span>
                            <div className="flex gap-4">
                                {hasActiveFilters && (
                                    <button onClick={handleReset} className="text-slate-400 hover:text-red-500">
                                        <RotateCcw size={20} />
                                    </button>
                                )}
                                <button onClick={() => setIsOpen(false)} className="p-1">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide">
                            <FilterFields {...props} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};