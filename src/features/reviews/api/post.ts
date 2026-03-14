import { reviewApiProvider } from "../constants/api";
import { CreateReviewInput } from "../types/request";

/**
 * Submit a new review for a book
 */
export const createReviewApi = (data: CreateReviewInput) =>
    reviewApiProvider.createReview(data);
