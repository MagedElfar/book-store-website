import { z } from "zod";


export const OrderItemSchema = (t: any) =>
    z.object({
        price: z.coerce.number(),
        bookId: z.string(),
        quantity: z.coerce
            .number()
            .int()
            .min(1, { message: t("validation.quantity_min") }),
    });



export type OrderItemFormType = z.input<ReturnType<typeof OrderItemSchema>>;