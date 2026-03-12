import { z } from "zod";

import { emailValidator } from "@/shared/form/utilities/validators";


export const EmailSchema = (t: any) => z
    .object({
        email: emailValidator({
            invalidEmailMsg: t("validation.invalid_email"),
            requireMsg: t("validation.email_required")
        })
    });

export type EmailSchemaType = z.infer<ReturnType<typeof EmailSchema>>;
