import { supabaseFetch } from "@/shared/utils/supabase/fetch-client";
import { CategoriesParams, Category, CategoryApiProvider } from "../types";
import { GetManyResponse } from "@/shared/types";
import { API_RECORDED_LIMIT } from "@/shared/config";

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

    getCategoryBySlug: async function (slug: string): Promise<Category> {
        const data = await supabaseFetch<Category[]>("categories", {
            params: {
                slug: `eq.${slug}`,
                is_active: "eq.true",
                select: "*"
            },
            tags: [`category-${slug}`],
            revalidate: 86400
        });

        if (!data || data.length === 0) {
            throw new Error("Category not found");
        }

        return data[0];
    },
};