import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthState } from "@/features/auth/hooks/useAuthState";

import { deleteReviewApi } from "../api/delete";
import { REVIEW_QUERY_KEYS } from "../constants/api";

export function useDeleteReview(bookId: string) {
    const queryClient = useQueryClient();
    const { user } = useAuthState();

    return useMutation({
        mutationFn: (reviewId: string) => deleteReviewApi(reviewId),
        onSuccess: () => {
            // 1. Refresh the book's reviews list to remove the deleted item
            queryClient.invalidateQueries({
                queryKey: REVIEW_QUERY_KEYS.bookReviews(bookId)
            });

            // 2. Clear the specific user review cache so the "Add Review" button reappears
            if (user?.id) {
                queryClient.invalidateQueries({
                    queryKey: REVIEW_QUERY_KEYS.userReview(bookId, user.id)
                });
            }
        }
    });
}