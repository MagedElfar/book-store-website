import { reviewApiProvider } from "../constants/api";
import { CreateReviewInput } from "../types/request";

/**
 * Update an existing review
 */
export const updateReviewApi = (reviewId: string, data: Partial<CreateReviewInput>) =>
    reviewApiProvider.updateReview(reviewId, data);
