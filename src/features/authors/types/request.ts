import type { SupportedLang } from "@/shared/types";

import type { Author } from "./author";

export type AuthorsParams = {
    search?: string;
    is_active?: string;
    sortBy?: "oldest" | "newest" | "alpha" | "most_books";
    limit?: number;
    page?: number;
    lang?: SupportedLang
} 