// src/shared/config/paths.ts

export const paths = {

    home: "/",
    search: "/search",
    cart: "/cart",
    contactUs: "/contact-us",
    aboutUs: "/about-us",
    checkout: "/checkout",
    wishlist: "/wishlist",
    offers: "/offers",

    account: {
        root: "/account",
        password: "/account/password",
        orders: "/account/orders",
        addresses: "/account/addresses",
        email: "/account/email",
        verified: "/account/verified"
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
        login: "/sign-in",
        register: "/sign-up",
        forgetPassword: "/forget-password",
        restPassword: "/rest-password"
    },
};