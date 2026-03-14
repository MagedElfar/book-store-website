import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createReviewApi } from "../api/post";
import { REVIEW_QUERY_KEYS } from "../constants/api";
import { CreateReviewInput } from "../types/request";

export function useCreateReview(bookId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReviewInput) => createReviewApi(data),
        onSuccess: (newReview) => {
            // 1. Invalidate the list of reviews for this specific book
            queryClient.invalidateQueries({
                queryKey: REVIEW_QUERY_KEYS.bookReviews(bookId)
            });

            // 2. Invalidate the specific user-book check to reflect they have now reviewed it
            queryClient.invalidateQueries({
                queryKey: REVIEW_QUERY_KEYS.userReview(bookId, newReview.user_id)
            })
        }
    });
}