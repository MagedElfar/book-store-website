import CommonEn from "@/shared/locales/en.json"
import CommonAr from "@/shared/locales/ar.json"
import homeEn from "@/features/home/locales/en.json"
import homeAr from "@/features/home/locales/ar.json"

export const messagesData = {
    en: {
        common: CommonEn,
        home: homeEn
    },
    ar: {
        common: CommonAr,
        home: homeAr
    },
} as const;