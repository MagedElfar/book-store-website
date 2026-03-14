import { reviewApiProvider } from "../constants/api";
import { ReviewParams } from "../types/request";

/**
 * Fetch all reviews for a specific book
 */
export const getBookReviewsApi = (bookId: string, params?: ReviewParams) =>
    reviewApiProvider.getBookReviews(bookId, params);

/**
 * Check if a specific user has already reviewed a book
 */
export const getUserReviewForBookApi = (bookId: string, userId: string) =>
    reviewApiProvider.getUserReviewForBook(bookId, userId);
