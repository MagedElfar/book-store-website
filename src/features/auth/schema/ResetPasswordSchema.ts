import { z } from "zod";

import { PASSWORD_MIN_LENGTH } from "@/shared/config/constants";
import { passwordValidator } from "@/shared/form/utilities/validators";


export const ResetPasswordSchema = (t: any) =>
    z
        .object({
            password: passwordValidator({
                minLength: PASSWORD_MIN_LENGTH,
                requireMsg: t("validation.password_required"),
                tooShortMsg: t("validation.password_min", { length: PASSWORD_MIN_LENGTH }),
            }),
            confirmPassword: z
                .string()
                .nonempty(t("validation.confirm_password_required"),),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t("validation.passwords_do_not_match"),
            path: ["confirmPassword"],
        });

export type ResetPasswordSchemaType = z.infer<
    ReturnType<typeof ResetPasswordSchema>
>;
