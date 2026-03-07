import { supabaseFetch } from "@/shared/utils/supabase";
import type {
    Banner,
    BannerApiProvider,
    BannersParams
} from "../types";
import { GetManyResponse } from "@/shared/types";

export const supabaseBannerProvider: BannerApiProvider = {
    getBanners: async function (params?: BannersParams) {
        const queryParams: Record<string, string> = {
            select: "*",
            order: "priority",
            is_active: "is.true"
        };


        return await supabaseFetch<GetManyResponse<Banner>>("banners", {
            params: queryParams,
            headers: {
                "Prefer": "count=exact",
            },
            tags: ["banners"],
            revalidate: 86400,
        })
    }
};