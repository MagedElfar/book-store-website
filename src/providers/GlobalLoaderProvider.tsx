"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";
import { Loader2 } from "lucide-react";
import { LoaderContext } from "@/shared/context";

export function GlobalLoadingProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setIsUpdating(false);
    }, [pathname, searchParams]);

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