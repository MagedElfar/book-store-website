import { API_RECORDED_LIMIT } from "@/shared/config/constants";
import { useInfiniteLookup } from "@/shared/hooks/useInfiniteLookup";

import { getBookReviewsApi } from "../api/get";
import { REVIEW_QUERY_KEYS } from "../constants/api";

export function useGetBookReviews(bookId: string) {
    const limit = API_RECORDED_LIMIT;

    return useInfiniteLookup(
        // Use the factory key for consistent cache management
        REVIEW_QUERY_KEYS.bookReviews(bookId),

        // Fetcher function with page and limit
        (page) => getBookReviewsApi(bookId, { page, limit }),

        // Enabled only if bookId exists
        !!bookId,

        limit
    );
}