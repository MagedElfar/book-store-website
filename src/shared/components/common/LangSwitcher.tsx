"use client";

import { Globe } from "lucide-react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/routing";

export function LangSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "ar" : "en";

        router.replace(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            { pathname, params },
            { locale: nextLocale }
        );
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all text-sm font-bold group cursor-pointer"
        >
            <Globe size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="uppercase tracking-wider">
                {locale === "en" ? "ع" : "EN"}
            </span>
        </button>
    );
}