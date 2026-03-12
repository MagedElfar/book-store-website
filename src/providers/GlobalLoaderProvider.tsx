"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

import { LoaderContext } from "@/shared/context/LoaderContext";


export function GlobalLoadingProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isUpdating, setIsUpdating] = useState(false);

    const [prevUrl, setPrevUrl] = useState(pathname + searchParams.toString());
    const currentUrl = pathname + searchParams.toString();

    if (currentUrl !== prevUrl) {
        setPrevUrl(currentUrl);
        setIsUpdating(false);
    }

    return (
        <LoaderContext.Provider value={{ setIsUpdating }}>
            {isUpdating && (
                <div className="fixed inset-0 z-[100] bg-white/40 dark:bg-black/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-auto cursor-wait">
                    <Loader2 className="animate-spin text-blue-600" size={32} />
                </div>
            )}
            {children}
        </LoaderContext.Provider>
    );
}