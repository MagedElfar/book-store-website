import { API_RECORDED_LIMIT } from "@/shared/config";
import { supabaseClient } from "@/shared/lib/supabase";
import { GetManyResponse } from "@/shared/types";
import { supabaseFetch, supabaseFetchSingle } from "@/shared/utils";

import { AuthorApiProvider, AuthorsParams, Author } from "../types";

export const supabaseAuthorProvider: AuthorApiProvider = {

    getAuthors: async function (params?: AuthorsParams) {

        const limit = params?.limit || API_RECORDED_LIMIT
        const page = params?.page || 1;
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        const queryParams: Record<string, string | number | boolean | undefined> = {
            select: "*, count:id",
            is_active: "eq.true",
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




        return await supabaseFetch<GetManyResponse<Author>>("authors_with_counts", {
            params: queryParams,
            headers: {
                "Range": `${from}-${to}`,
                "Prefer": "count=exact"
            },
            revalidate: 43200,
            tags: ["authors"]
        });
    },

    getAuthorsClient: async function (params: AuthorsParams = {}) {
        const {
            search,
            sortBy = "newest",
            page = 1,
            limit = 10
        } = params;

        let query = supabaseClient
            .from("authors")
            .select("*", { count: "exact" });

        query = query.eq("is_active", true);

        if (search) {
            query = query.or(`name_ar.ilike.%${search}%,name_en.ilike.%${search}%,slug.ilike.%${search}%`);
        }

        if (sortBy === "newest") {
            query = query.order("created_at", { ascending: false });
        } else if (sortBy === "oldest") {
            query = query.order("created_at", { ascending: true });
        } else if (sortBy === "most_books") {
            query = query.order("books_count", { ascending: false });
        } else if (sortBy === "alpha") {
            const currentLang = params.lang || "en";
            query = query.order(`name_${currentLang}`, { ascending: true });
        }

        query = query.order("id", { ascending: false });


        // Pagination
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;


        if (error) throw new Error(error.message);

        return {
            items: (data || []) as Author[],
            total: count || 0,
        };
    },

    getAuthorBySlug: async function (slug: string) {

        const queryParams = {
            slug: `eq.${slug}`,
            select: "*",
            limit: 1
        };

        const response = await supabaseFetchSingle<Author>("authors_with_counts", {
            params: queryParams,
            revalidate: 3600,
            tags: [`author-${slug}`]
        });

        if (!response) return null

        return response;
    },
};