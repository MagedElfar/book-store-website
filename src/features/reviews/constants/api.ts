import { supabaseReviewProvider } from "../infrastructure/supabaseReviewProvider";
import { ReviewApiProvider } from "../types/api";

export const reviewApiProvider: ReviewApiProvider = supabaseReviewProvider;

export const REVIEW_QUERY_KEYS = {
    bookReviews: (bookId: string) => ["reviews", "book", bookId],
    userReview: (bookId: string, userId: string) => ["reviews", "user", bookId, userId],
};