import { getTranslations, getLocale } from 'next-intl/server';

import { AppNamespace } from "@/shared/hooks/use-translation";

export async function getAppTranslation<N extends AppNamespace>(namespace?: N) {
    const t = await getTranslations(namespace);
    const locale = await getLocale();

    const lang = locale as "en" | "ar";
    const dir = lang === "ar" ? "rtl" : "ltr";

    /**
     */
    const getLocalizedValue = <T extends Record<string, any>>(
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
    };

    return {
        t,
        lang,
        dir,
        getLocalizedValue,
    };
}