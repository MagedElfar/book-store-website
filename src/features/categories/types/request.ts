import type { SupportedLang } from "@/shared/types";

export type CategoriesParams = {
    search?: string;
    is_active?: string
    sortBy?: "oldest" | "newest" | "alpha";
    limit?: number;
    page?: number;
    lang?: SupportedLang
    is_in_nav?: boolean
    is_featured?: boolean
    ids?: string[]
}