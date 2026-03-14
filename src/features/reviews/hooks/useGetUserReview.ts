import { useQuery } from "@tanstack/react-query";

import { useAuthState } from "@/features/auth/hooks/useAuthState";

import { getUserReviewForBookApi } from "../api/get";
import { REVIEW_QUERY_KEYS } from "../constants/api";

export function useGetUserReview(bookId: string) {
    const { user } = useAuthState();
    const userId = user?.id;

    return useQuery({
        queryKey: REVIEW_QUERY_KEYS.userReview(bookId, userId!),
        queryFn: () => getUserReviewForBookApi(bookId, userId!),
        // Enabled only if both bookId and userId are present
        enabled: !!bookId && !!userId,
    });
}