import { supabaseFetch } from "@/shared/utils/supabase";
import type {
    Banner,
    BannerApiProvider,
    BannersParams
} from "../types";

export const supabaseBannerProvider: BannerApiProvider = {
    getBanners: async function (params?: BannersParams) {
        const queryParams: Record<string, string> = {
            select: "*",
            order: "priority",
            is_active: "is.true"
        };


        const result = await supabaseFetch<{ data: Banner[]; count: number }>("banners", {
            params: queryParams,
            headers: {
                "Prefer": "count=exact",
            },
            tags: ["banners"],
            revalidate: 3600,
        });

        return {
            items: result.data || [],
            total: result.count || 0,
        };
    }
};