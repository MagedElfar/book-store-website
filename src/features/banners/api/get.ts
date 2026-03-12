import { bannerApiProvider } from "../constants/api";
import { BannersParams } from "../types/request";

export const getBannersApi = (params?: BannersParams) => bannerApiProvider.getBanners(params);

