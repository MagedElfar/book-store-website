import { z } from "zod";

export const ShippingAddressSchema = (t: any) =>
    z.object({
        country: z
            .string()
            .nonempty({ message: t("validation.country_required") }),
        city: z
            .string()
            .nonempty({ message: t("validation.city_required") }),
        street_address: z
            .string()
            .nonempty({ message: t("validation.address_required") })
            .min(3, { message: t("validation.address_min") }),
    });

export type ShippingAddressFormType = z.infer<ReturnType<typeof ShippingAddressSchema>>;
