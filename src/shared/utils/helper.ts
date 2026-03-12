import { API_RECORDED_LIMIT } from "../config/constants";
import { SupportedLang } from "../types/common";

export function formatPrice(price: number, lang: SupportedLang = "en") {
    return new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
}

export function ensureArray(value: any) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return value.split(",");
};

export function calcTotalPages(total: number, limit: number = API_RECORDED_LIMIT) {
    return Math.ceil(total / limit);
}

