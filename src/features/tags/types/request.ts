import type { SupportedLang } from "@/shared/types";

export type TagsParams = {
    search?: string;
    is_active?: string;
    sortBy?: "oldest" | "newest" | "alpha";
    limit?: number;
    page?: number;
    lang?: SupportedLang
};