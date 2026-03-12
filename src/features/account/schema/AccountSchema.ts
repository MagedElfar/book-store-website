import { z } from "zod";

import { phoneValidator, imageValidator } from "@/shared/form/utilities/validators";


export const AccountSchema = (t: any) => z
    .object({
        full_name: z
            .string()
            .nonempty({ message: t("validation.full_name_required") })
            .min(2, { message: t("validation.full_name_min") }),

        phone: phoneValidator(t("validation.phone")).optional().nullable(),
        avatar_url: imageValidator(t("validation.avatar_invalid"))
            .nullable()
            .optional(),



    });

export type AccountSchemaType = z.infer<ReturnType<typeof AccountSchema>>;
