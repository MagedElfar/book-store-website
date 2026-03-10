"use client";

import { useTranslations, useLocale } from "next-intl";
import { useMemo, useCallback } from "react";

import { usePathname, useRouter } from "@/i18n/routing";

export type AppNamespace = keyof IntlMessages;

export function useAppTranslation<N extends AppNamespace>(namespace?: N) {
    const t = useTranslations(namespace);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const lang = locale as "en" | "ar";
    const dir = lang === "ar" ? "rtl" : "ltr";

    const getLocalizedValue = useCallback(
        <T extends Record<string, any>>(
            data: T | null | undefined,
            prefix: string = "name",
            fallbackKey?: keyof T
        ): string => {
            if (!data) return "";

            const localizedKey = `${prefix}_${lang}`;
            const defaultFallback = `${prefix}_en`;

            const value =
                data[localizedKey] ||
                (fallbackKey ? data[fallbackKey] : data[defaultFallback]);

            return (value || "---") as string;
        },
        [lang]
    );

    const toggleLanguage = useCallback(() => {
        const nextLocale = lang === "en" ? "ar" : "en";
        router.replace(pathname, { locale: nextLocale });
    }, [lang, pathname, router]);

    return useMemo(
        () => ({
            lang,
            dir,
            t,
            getLocalizedValue,
            toggleLanguage,
        }),
        [lang, dir, t, getLocalizedValue, toggleLanguage]
    );
}