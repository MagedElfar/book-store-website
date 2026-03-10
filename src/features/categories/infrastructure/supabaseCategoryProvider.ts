import { API_RECORDED_LIMIT } from "@/shared/config";
import { supabaseClient } from "@/shared/lib/supabase";
import { GetManyResponse } from "@/shared/types";
import { supabaseFetch, supabaseFetchSingle } from "@/shared/utils/supabase/fetch-client";

import { CategoriesParams, Category, CategoryApiProvider } from "../types";

export const supabaseCategoryProvider: CategoryApiProvider = {
    getCategories: async function (params: CategoriesParams): Promise<GetManyResponse<Category>> {
        const {
            search,
            sortBy = "newest",
            page = 1,
            limit = API_RECORDED_LIMIT,
            is_in_nav,
            is_featured,
            lang = 'en'
        } = params;

        const from = (page - 1) * limit;
        const to = from + limit - 1;


        const queryParams: Record<string, string | number | boolean | undefined> = {
            is_active: "eq.true",
            select: "*",
        };

        if (is_in_nav) {
            queryParams.is_in_nav = "eq.true";
        }

        if (is_featured) {
            queryParams.is_featured = "eq.true"
        }


        if (search) {
            queryParams.or = `(name_ar.ilike.%${search}%,name_en.ilike.%${search}%,slug.ilike.%${search}%)`;
        }

        let order = "id.desc";

        if (sortBy === "newest") order = "created_at.desc";
        if (sortBy === "oldest") order = "created_at.asc";
        if (sortBy === "alpha") order = `name_${lang}.asc`;

        queryParams.order = order;

        return await supabaseFetch<GetManyResponse<Category>>("categories", {
            params: queryParams,
            headers: {
                "Range": `${from}-${to}`,
                "Prefer": "count=exact"
            },
            tags: ["categories"],
            revalidate: 86400
        });
    },

    getCategoriesClient: async function (params: CategoriesParams) {
        const {
            search,
            sortBy = "newest",
            page = 1,
            limit = 10,
            is_in_nav,
            is_featured
        } = params;

        let query = supabaseClient
            .from("categories")
            .select("*", { count: "exact" });

        query = query.eq("is_active", true);

        if (search) {
            query = query.or(`name_ar.ilike.%${search}%,name_en.ilike.%${search}%,slug.ilike.%${search}%`);
        }

        if (is_in_nav) {
            query = query.eq("is_in_nav", true);
        }

        if (is_featured) {
            query = query.eq("is_featured", true);
        }

        if (sortBy === "newest") {
            query = query.order("created_at", { ascending: false });
        } else if (sortBy === "oldest") {
            query = query.order("created_at", { ascending: true });
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
            items: (data || []) as Category[],
            total: count || 0,
        };
    },


    getCategoryBySlug: async function (slug: string): Promise<Category | null> {
        const data = await supabaseFetchSingle<Category>("categories", {
            params: {
                slug: `eq.${slug}`,
                is_active: "eq.true",
                select: "*"
            },
            tags: [`category-${slug}`],
            revalidate: 86400
        });

        if (!data) return null;


        return data;
    },
};