import type { GetManyResponse } from "@/shared/types";

import type { Banner } from "./banner";
import type { BannersParams } from "./request";

export interface OrderedItemPayload { id: string; priority: number }

export interface BannerApiProvider {
    getBanners: (params?: BannersParams) => Promise<GetManyResponse<Banner>>;
}