import { string, z } from "zod";

import { phoneValidator } from "@/shared/form/utilities/validators";


export const AddressFormSchema = (
    t: any,
) =>
    z.object({
        full_name: z
            .string()
            .nonempty({ message: t("validation.full_name_required") })
            .min(2, { message: t("validation.full_name_min") }),

        phone: string().nullish(),

        country: z
            .string()
            .nonempty({ message: t("validation.country_required") }),

        city: z
            .string()
            .nonempty({ message: t("validation.city_required") }),

        street_address: z
            .string()
            .nonempty({ message: t("validation.street_required") })
            .min(5, { message: t("validation.street_min") }),

        lat: z
            .number()
        ,
        lng: z
            .number(),

        is_default: z.boolean(),
    });

export type AddressFormSchemaType = z.infer<ReturnType<typeof AddressFormSchema>>;