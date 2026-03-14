import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { useLoaderContext } from "../context/LoaderContext";


export const useBookFilters = () => {
    const { setIsUpdating } = useLoaderContext();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateParams = (keyOrObject: string | Record<string, string>, id?: string, multi: boolean = false) => {
        setIsUpdating(true);
        const params = new URLSearchParams(searchParams.toString());

        if (typeof keyOrObject === "object") {
            Object.entries(keyOrObject).forEach(([k, v]) => {
                if (v && v !== "") params.set(k, v);
                else params.delete(k);
            });
        } else {
            const key = keyOrObject;
            const currentRaw = params.get(key);
            let currentIds = currentRaw ? currentRaw.split(",") : [];

            if (multi) {
                if (currentIds.includes(id!)) {
                    currentIds = currentIds.filter(i => i !== id);
                } else {
                    currentIds.push(id!);
                }
                if (currentIds.length > 0) params.set(key, currentIds.join(","));
                else params.delete(key);
            } else {
                if (!id || id === "" || currentRaw === id) params.delete(key);
                else params.set(key, id);
            }
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleReset = () => {
        setIsUpdating(true);
        router.push(pathname, { scroll: false });
    };

    const getActiveIds = (key: string) => {
        const val = searchParams.get(key);
        return val ? val.split(",") : [];
    };

    const hasActiveFilters = Array.from(searchParams.keys()).some(k => k !== "locale" && k !== "page");

    return { updateParams, handleReset, getActiveIds, hasActiveFilters, searchParams };
};