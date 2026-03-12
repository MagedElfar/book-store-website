"use client";

import { useState } from "react";

import { useAppTranslation } from "@/shared/hooks/use-translation";

interface PriceFilterProps {
    title: string;
    minKey: string;
    maxKey: string;
    updateParams: (params: string | Record<string, string>, id?: string, multi?: boolean) => void;
    initialMin: string;
    initialMax: string;
}

export const PriceFilter = ({ title, minKey, maxKey, updateParams, initialMin, initialMax }: PriceFilterProps) => {
    const { t } = useAppTranslation("common");

    const [min, setMin] = useState(initialMin || "");
    const [max, setMax] = useState(initialMax || "");

    const [prevInitial, setPrevInitial] = useState({ min: initialMin, max: initialMax });

    if (initialMin !== prevInitial.min || initialMax !== prevInitial.max) {
        setPrevInitial({ min: initialMin, max: initialMax });
        setMin(initialMin || "");
        setMax(initialMax || "");
    }

    const handleApply = () => {
        updateParams({
            [minKey]: min,
            [maxKey]: max
        });
    };

    const handleInputChange = (val: string, setter: (v: string) => void) => {
        if (/^\d*$/.test(val)) setter(val);
    };

    const isDirty = min !== (initialMin || "") || max !== (initialMax || "");

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h4 className="font-bold text-xs text-slate-400 dark:text-zinc-500 uppercase tracking-[0.15em]">
                    {title}
                </h4>

                {isDirty && (
                    <button
                        onClick={handleApply}
                        className="text-[10px] cursor-pointer font-bold text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors uppercase tracking-wider"
                    >
                        {t("common.apply")}
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder={t("filters.min")}
                    value={min}
                    onChange={(e) => handleInputChange(e.target.value, setMin)}
                    onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                    className="w-full px-3 py-2 text-[13px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                />

                <span className="text-slate-300 dark:text-zinc-700">—</span>

                <input
                    type="text"
                    placeholder={t("filters.max")}
                    value={max}
                    onChange={(e) => handleInputChange(e.target.value, setMax)}
                    onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                    className="w-full px-3 py-2 text-[13px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                />
            </div>
        </div>
    );
};