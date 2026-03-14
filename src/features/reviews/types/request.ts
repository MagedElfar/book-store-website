import { Review } from "./review";

export type CreateReviewInput = Pick<Review, "book_id" | "user_id" | "rating" | "comment">;

export interface ReviewParams { page?: number; limit?: number }