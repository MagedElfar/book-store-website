import { supabaseClient } from "@/shared/lib/supabase";
import type {
    Tag,
    TagApiProvider,
    TagsParams
} from "../types";

export const supabaseTagProvider: TagApiProvider = {


    getTagsClient: async function (params: TagsParams) {
        const {
            search,
            is_active,
            sortBy = "newest",
            page = 1,
            limit = 10
        } = params;

        let query = supabaseClient
            .from("tags")
            .select("*", { count: "exact" });

        query = query.eq("is_active", true);

        if (search) {
            query = query.or(`name_ar.ilike.%${search}%,name_en.ilike.%${search}%,slug.ilike.%${search}%`);
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
            items: (data || []) as Tag[],
            total: count || 0,
        };
    },

};