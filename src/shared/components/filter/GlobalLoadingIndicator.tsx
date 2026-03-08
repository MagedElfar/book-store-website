"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { Loader2 } from "lucide-react";

export function GlobalLoadingIndicator() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setIsUpdating(false);
    }, [pathname, searchParams]);


    if (!isUpdating) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-white/20 dark:bg-black/10 backdrop-blur-[2px] flex items-center justify-center pointer-events-auto">
            <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
    );
}