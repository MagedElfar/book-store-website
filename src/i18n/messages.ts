import CommonEn from "@/shared/locales/en.json"
import CommonAr from "@/shared/locales/ar.json"
import homeEn from "@/features/home/locales/en.json"
import homeAr from "@/features/home/locales/ar.json"
import booksEn from "@/features/books/locales/en.json"
import booksAr from "@/features/books/locales/ar.json"

export const messagesData = {
    en: {
        common: CommonEn,
        home: homeEn,
        books: booksEn
    },
    ar: {
        common: CommonAr,
        home: homeAr,
        books: booksAr
    },
} as const;