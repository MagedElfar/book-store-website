import { GetManyResponse } from "@/shared/types/response";

import { CreateReviewInput, ReviewParams } from "./request";
import { Review } from "../types/review";

export interface ReviewApiProvider {

    getBookReviews: (bookId: string, params?: ReviewParams) => Promise<GetManyResponse<Review>>;

    getUserReviewForBook: (bookId: string, userId: string) => Promise<Review | null>;

    createReview: (data: CreateReviewInput) => Promise<Review>;

    updateReview: (reviewId: string, data: Partial<CreateReviewInput>) => Promise<Review>;

    deleteReview: (reviewId: string) => Promise<void>;
}