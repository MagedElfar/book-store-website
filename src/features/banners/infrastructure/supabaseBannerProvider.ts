import { GetManyResponse } from "@/shared/types/response";
import { supabaseFetch } from "@/shared/utils/fetch-client";

import { BannerApiProvider } from "../types/api";
import { Banner } from "../types/banner";

export const supabaseBannerProvider: BannerApiProvider = {
    getBanners: async function () {
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