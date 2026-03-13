import { z } from "zod";

import { OrderItemSchema } from "./OrderItemSchema";
import { ShippingAddressSchema } from "./ShippingAddressSchema";

export const CreateOrderFormSchema = (t: any) => {
    return z.object({
        user_id: z.string().optional().nullable(),
        customer_name: z
            .string()
            .nonempty({ message: t("validation.name_required") })
            .min(3, { message: t("validation.name_min") }),
        customer_email: z
            .email({ message: t("validation.email_invalid") }),
        customer_phone: z
            .string()
            .nonempty({ message: t("validation.phone_required") })
            .regex(/^[0-9+]+$/, { message: t("validation.phone_invalid") }),

        shipping_details: ShippingAddressSchema(t),

        payment_method: z.enum(['cod',], {
            message: t("validation.payment_method_required"),
        }),

        items: z
            .array(OrderItemSchema(t))
            .min(1, { message: t("validation.items_min") }),

        note: z.string().nullish()
    });
};

export type CreateOrderFormSchemaType = z.input<ReturnType<typeof CreateOrderFormSchema>>;