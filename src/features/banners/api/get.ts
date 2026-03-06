import { bannerApiProvider } from "../constants";
import type { BannersParams } from "../types";

export const getBannersApi = (params?: BannersParams) => bannerApiProvider.getBanners(params);

