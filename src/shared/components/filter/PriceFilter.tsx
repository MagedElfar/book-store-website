"use client";

import { useState, useEffect } from "react";
import { useAppTranslation } from "@/shared/hooks";
import { useDebounce } from 'minimal-shared/hooks'; // استخدم نفس الـ hook اللي استعملناه في البحث

interface PriceFilterProps {
    title: string;
    minKey: string;
    maxKey: string;
    updateParams: (key: string, id: string, multi?: boolean) => void;
    initialMin: string;
    initialMax: string;
}

export const PriceFilter = ({ title, minKey, maxKey, updateParams, initialMin, initialMax }: PriceFilterProps) => {
    const { t } = useAppTranslation("common");

    const [min, setMin] = useState(initialMin);
    const [max, setMax] = useState(initialMax);

    const debouncedMin = useDebounce(min, 800);
    const debouncedMax = useDebounce(max, 800);

    useEffect(() => {
        if (debouncedMin !== initialMin) {
            updateParams(minKey, debouncedMin);
        }
    }, [debouncedMin, minKey, updateParams, initialMin]);

    useEffect(() => {
        if (debouncedMax !== initialMax) {
            updateParams(maxKey, debouncedMax);
        }
    }, [debouncedMax, maxKey, updateParams, initialMax]);

    useEffect(() => {
        setMin(initialMin);
        setMax(initialMax);
    }, [initialMin, initialMax]);

    const handleInputChange = (val: string, setter: (v: string) => void) => {
        if (/^\d*$/.test(val)) setter(val);
    };

    return (
        <div className="space-y-4">
            <h4 className="font-bold text-xs text-slate-400 dark:text-zinc-500 uppercase tracking-[0.15em] px-1">
                {title}
            </h4>

            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder={t("filters.min")}
                        value={min}
                        onChange={(e) => handleInputChange(e.target.value, setMin)}
                        className="w-full px-3 py-2 text-[13px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                </div>

                <span className="text-slate-300 dark:text-zinc-700">—</span>

                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder={t("filters.max")}
                        value={max}
                        onChange={(e) => handleInputChange(e.target.value, setMax)}
                        className="w-full px-3 py-2 text-[13px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                </div>
            </div>
        </div>
    );
};