import { supabaseBannerProvider } from "../infrastructure/supabaseBannerProvider";
import { BannerApiProvider } from "../types/api";

export const bannerApiProvider: BannerApiProvider = supabaseBannerProvider;

export const BANNER_QUERY_KEY = "banners" as const;