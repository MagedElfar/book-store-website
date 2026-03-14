import { supabaseClient } from "@/shared/lib/supabaseClient";
import { GetManyResponse } from "@/shared/types/response";

import { ReviewApiProvider } from "../types/api";
import { CreateReviewInput, ReviewParams } from "../types/request";
import { Review } from "../types/review";

export const supabaseReviewProvider: ReviewApiProvider = {
    /**
     * Fetch all reviews for a specific book with pagination
     * Includes profile data (name and avatar) for the reviewer
     */
    getBookReviews: async function (bookId: string, params?: ReviewParams): Promise<GetManyResponse<Review>> {
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await supabaseClient
            .from("reviews")
            .select(`
                *,
                user:profiles (
                    full_name,
                    avatar_url
                )
            `, { count: "exact" })
            .eq("book_id", bookId)
            .order("created_at", { ascending: false })
            .range(from, to);

        if (error) throw new Error(error.message);

        return {
            items: data as Review[],
            total: count || 0,
        };
    },

    /**
     * Get a specific user's review for a book
     * Uses maybeSingle() to return null instead of throwing an error if no review exists
     */
    getUserReviewForBook: async function (bookId: string, userId: string): Promise<Review | null> {
        const { data, error } = await supabaseClient
            .from("reviews")
            .select(`
                *,
                user:profiles (
                    full_name,
                    avatar_url
                )
            `)
            .eq("book_id", bookId)
            .eq("user_id", userId)
            .maybeSingle();

        if (error) throw new Error(error.message);
        return data as Review | null;
    },

    /**
     * Create a new review
     * Note: The DB Trigger handle_book_rating_stats will auto-update book's avg rating
     */
    createReview: async function (payload: CreateReviewInput): Promise<Review> {
        const { data, error } = await supabaseClient
            .from("reviews")
            .insert(payload)
            .select(`
                *,
                user:profiles (
                    full_name,
                    avatar_url
                )
            `)
            .single();

        if (error) {
            // Check for Postgres unique constraint violation (User already reviewed this book)
            if (error.code === '23505') {
                throw new Error("You have already reviewed this book.");
            }
            throw new Error(error.message);
        }

        return data as Review;
    },

    /**
     * Update an existing review by ID
     */
    updateReview: async function (reviewId: string, payload: Partial<CreateReviewInput>): Promise<Review> {
        const { data, error } = await supabaseClient
            .from("reviews")
            .update(payload)
            .eq("id", reviewId)
            .select(`
                *,
                user:profiles (
                    full_name,
                    avatar_url
                )
            `)
            .single();

        if (error) throw new Error(error.message);
        return data as Review;
    },

    /**
     * Delete a review and trigger stats recalculation in the database
     */
    deleteReview: async function (reviewId: string): Promise<void> {
        const { error } = await supabaseClient
            .from("reviews")
            .delete()
            .eq("id", reviewId);

        if (error) throw new Error(error.message);
    }
};