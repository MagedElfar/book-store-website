import { z } from 'zod';

import { PASSWORD_MIN_LENGTH } from "@/shared/config";
import { emailValidator, passwordValidator } from "@/shared/form";

export const LoginSchema = (t: any) => z
    .object({
        email: emailValidator({
            invalidEmailMsg: t("validation.invalid_email"),
            requireMsg: t("validation.email_required")
        }),

        password: passwordValidator({
            minLength: PASSWORD_MIN_LENGTH,
            requireMsg: t("validation.password_required"),
            tooShortMsg: t("validation.password_min", { length: PASSWORD_MIN_LENGTH }),
        }),

        rememberMe: z.boolean()
    })


export type LoginSchemaType = z.infer<ReturnType<typeof LoginSchema>>;
