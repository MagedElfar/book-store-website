import { ensureArray } from "@/shared/utils";
import { BookParams } from "../types";
import { API_RECORDED_LIMIT } from "@/shared/config";

export function mapQuerySearchParamsToBookSearchParams(params: Record<string, string>, limit: number = API_RECORDED_LIMIT): BookParams {
    return {
        ...params,
        category_ids: ensureArray(params.category_ids),
        author_ids: ensureArray(params.author_ids),
        tag_ids: ensureArray(params.tag_ids),
        page: Number(params.page) || 1,
        minPrice: params.min_price ? Number(params.min_price) : undefined,
        maxPrice: params.max_price ? Number(params.max_price) : undefined,
        limit
    };
}