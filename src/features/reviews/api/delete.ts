import { reviewApiProvider } from "../constants/api";

/**
 * Delete a specific review
 */
export const deleteReviewApi = (reviewId: string) =>
    reviewApiProvider.deleteReview(reviewId);