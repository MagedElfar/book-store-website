import { SupportedLang } from "@/shared/types/common";

export type AuthorsParams = {
    search?: string;
    is_active?: string;
    sortBy?: "oldest" | "newest" | "alpha" | "most_books";
    limit?: number;
    page?: number;
    lang?: SupportedLang
} 