import { z } from "zod";

import { PASSWORD_MIN_LENGTH } from "@/shared/config/constants";
import { emailValidator, passwordValidator, phoneValidator } from "@/shared/form/utilities/validators";


export const SignupSchema = (
    t: any
) =>
    z.object({
        email: emailValidator({
            invalidEmailMsg: t("validation.invalid_email"),
            requireMsg: t("validation.email_required")
        }),

        password: passwordValidator({
            minLength: PASSWORD_MIN_LENGTH,
            requireMsg: t("validation.password_required"),
            tooShortMsg: t("validation.password_min", { length: PASSWORD_MIN_LENGTH }),
        }),

        full_name: z
            .string()
            .nonempty({ message: t("validation.full_name_required") })
            .min(2, { message: t("validation.full_name_min") }),

        phone: phoneValidator(t("validation.phone")).optional().nullable(),

        rememberMe: z.boolean()

    });

export type SignupSchemaType = z.infer<ReturnType<typeof SignupSchema>>