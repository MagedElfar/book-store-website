// src/shared/config/paths.ts

export const paths = {

    home: "/",
    search: "/search",
    cart: "/cart",
    contactUs: "/contact-us",
    aboutUs: "/about-us",
    checkout: "/checkout",
    wishlist: "/wishlist",

    account: {
        root: "/account",
        profile: "/account/profile",
        orders: "/account/orders",
        wishlist: "/account/wishlist",
    },
    categories: {
        root: "/categories",
        details: (slug: string) => `/categories/${slug}`,
    },
    authors: {
        root: "/authors",
        details: (slug: string) => `/authors/${slug}`,
    },
    books: {
        root: "/books",
        filter: (params: string) => `/books?${params}`,
        details: (slug: string) => `/books/${slug}`,
    },


    auth: {
        login: "/login",
        register: "/register",
    },
};