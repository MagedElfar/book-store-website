import { z } from "zod";

export const ReviewFormSchema = (t: any) => {
    return z.object({
        // Rating is mandatory, usually between 1 and 5
        rating: z
            .number({
                message: t("validation.rating_required"),
            })
            .min(1, { message: t("validation.rating_min") })
            .max(5, { message: t("validation.rating_max") }),

        // Comment is optional but you might want to limit the length
        comment: z
            .string()
            .max(500, { message: t("validation.comment_max") })
            .nullable()
            .or(z.literal("")), // Allows empty string or null

        book_id: z.string().uuid().optional(),
        user_id: z.string().uuid().optional(),
    });
};

export type ReviewFormSchemaType = z.infer<ReturnType<typeof ReviewFormSchema>>;