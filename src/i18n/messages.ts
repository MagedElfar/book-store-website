import accountAr from "@/features/account/locales/ar.json"
import accountEN from "@/features/account/locales/en.json"
import addressesAr from "@/features/addresses/locales/ar.json"
import addressesEN from "@/features/addresses/locales/en.json"
import authAR from "@/features/auth/locales/ar.json";
import authEN from "@/features/auth/locales/en.json";
import authorsAr from "@/features/authors/locales/ar.json"
import authorsEN from "@/features/authors/locales/en.json"
import booksAr from "@/features/books/locales/ar.json"
import booksEn from "@/features/books/locales/en.json"
import cartAr from "@/features/cart/locales/ar.json"
import cartEN from "@/features/cart/locales/en.json"
import categoriesAr from "@/features/categories/locales/ar.json"
import categoriesEN from "@/features/categories/locales/en.json"
import homeAr from "@/features/home/locales/ar.json"
import homeEn from "@/features/home/locales/en.json"
import ordersAr from "@/features/orders/locales/ar.json"
import ordersEn from "@/features/orders/locales/en.json"
import reviewsAr from "@/features/reviews/locales/ar.json"
import reviewsEn from "@/features/reviews/locales/en.json"
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
        account: accountEN,
        addresses: addressesEN,
        cart: cartEN,
        order: ordersEn,
        reviews: reviewsEn
    },
    ar: {
        common: CommonAr,
        home: homeAr,
        books: booksAr,
        categories: categoriesAr,
        authors: authorsAr,
        auth: authAR,
        account: accountAr,
        addresses: addressesAr,
        cart: cartAr,
        order: ordersAr,
        reviews: reviewsAr
    },
} as const;