import { SupportedLang } from "@/shared/types/common";

export type TagsParams = {
    search?: string;
    is_active?: string;
    sortBy?: "oldest" | "newest" | "alpha";
    limit?: number;
    page?: number;
    lang?: SupportedLang
};