import authAR from "@/features/auth/locales/ar.json";
import authEN from "@/features/auth/locales/en.json";
import authorsAr from "@/features/authors/locales/ar.json"
import authorsEN from "@/features/authors/locales/en.json"
import booksAr from "@/features/books/locales/ar.json"
import booksEn from "@/features/books/locales/en.json"
import categoriesAr from "@/features/categories/locales/ar.json"
import categoriesEN from "@/features/categories/locales/en.json"
import homeAr from "@/features/home/locales/ar.json"
import homeEn from "@/features/home/locales/en.json"
import CommonAr from "@/shared/locales/ar.json"
import CommonEn from "@/shared/locales/en.json"

export const messagesData = {
    en: {
        common: CommonEn,
        home: homeEn,
        books: booksEn,
        categories: categoriesEN,
        authors: authorsEN,
        auth: authEN,
    },
    ar: {
        common: CommonAr,
        home: homeAr,
        books: booksAr,
        categories: categoriesAr,
        authors: authorsAr,
        auth: authAR,
    },
} as const;