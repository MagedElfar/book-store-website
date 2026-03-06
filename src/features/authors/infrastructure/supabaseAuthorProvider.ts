import { supabaseFetch } from "@/shared/utils";
import { AuthorApiProvider, AuthorsParams, Author } from "../types";

export const supabaseAuthorProvider: AuthorApiProvider = {

    getAuthors: async function (params: AuthorsParams) {
        const limit = params?.limit || 10
        const page = params?.page || 1;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const queryParams: Record<string, string | number | boolean | undefined> = {
            select: "*",
            is_active: "eq.true",
            offset: from,
            limit,
        };

        if (params?.search) {
            queryParams.or = `(name_ar.ilike.%${params.search}%,name_en.ilike.%${params.search}%,slug.ilike.%${params.search}%)`;
        }

        if (params?.is_active !== undefined && params?.is_active !== "") {
            queryParams.is_active = `eq.${params.is_active === "active"}`;
        }

        const currentLang = params?.lang || "en";
        let orderString = "";
        switch (params?.sortBy) {
            case "oldest": orderString = "created_at.asc"; break;
            case "most_books": orderString = "books_count.desc.nullslast"; break;
            case "alpha": orderString = `name_${currentLang}.asc`; break;
            case "newest":
            default: orderString = "created_at.desc"; break;
        }
        queryParams.order = `${orderString},id.desc`;

        const response = await supabaseFetch<{ data: Author[]; count: number }>("authors_with_counts", {
            params: queryParams,
            headers: {
                "Prefer": "count=exact",
            },
            revalidate: 3600,
            tags: ["authors_with_counts"]
        });

        return {
            items: response.data || [],
            total: response.count || 0
        };
    },

    getAuthorBySlug: async function (slug: string) {

        const queryParams = {
            slug: `eq.${slug}`,
            select: "*",
            limit: 1
        };

        const response = await supabaseFetch<Author[]>("authors_with_counts", {
            params: queryParams,
            revalidate: 3600,
            tags: [`author-${slug}`]
        });

        if (!response || response.length === 0) {
            throw new Error("Author not found");
        }

        return response[0];
    },
};