import { useQueryClient, useMutation } from "@tanstack/react-query";

import { updateReviewApi } from "../api/put";
import { REVIEW_QUERY_KEYS } from "../constants/api";
import { CreateReviewInput } from "../types/request";

export function useUpdateReview(bookId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ reviewId, data }: { reviewId: string; data: Partial<CreateReviewInput> }) =>
            updateReviewApi(reviewId, data),
        onSuccess: (updatedReview) => {
            // Update the reviews list
            queryClient.invalidateQueries({
                queryKey: REVIEW_QUERY_KEYS.bookReviews(bookId)
            });

            // Update the single user-review cache
            queryClient.invalidateQueries({
                queryKey: REVIEW_QUERY_KEYS.userReview(bookId, updatedReview.user_id)
            });
        }
    });
}