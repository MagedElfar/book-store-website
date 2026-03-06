import type { SupportedLang } from "@/shared/types";

export interface BookParams {
    search?: string;
    category_id?: string | null;
    author_id?: string | null;
    tagId?: string | null
    is_active?: string;
    sortBy?: "newest" | "oldest" | "price_high" | "price_low" | "alpha" | "stock_high" | "stock_low" | "sales_count";
    page?: number;
    limit?: number;
    lang?: SupportedLang;
    isOffers?: boolean
}