import { z } from 'zod';

import { emailValidator } from "@/shared/form";

export const ForgotPasswordSchema = (t: any) => z
    .object({
        email: emailValidator({
            invalidEmailMsg: t("validation.invalid_email"),
            requireMsg: t("validation.email_required")
        }),
    })


export type ForgotPasswordSchemaType = z.infer<ReturnType<typeof ForgotPasswordSchema>>;
