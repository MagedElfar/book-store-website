import type { SupportedLang } from "@/shared/types/common";

export interface BookParams {
    search?: string;
    category_id?: string | null;
    category_ids?: string[];
    author_id?: string | null;
    author_ids?: string[];
    tagId?: string | null,
    tag_ids?: string[];
    is_active?: string;
    sortBy?: "newest" | "oldest" | "price_high" | "price_low" | "alpha" | "stock_high" | "stock_low" | "sales_count";
    page?: number;
    limit?: number;
    lang?: SupportedLang;
    isOffers?: boolean,
    minPrice?: number;
    maxPrice?: number;
}