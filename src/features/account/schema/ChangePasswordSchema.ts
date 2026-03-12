import { z } from "zod";

import { PASSWORD_MIN_LENGTH } from "@/shared/config/constants";
import { passwordValidator } from "@/shared/form/utilities/validators";

export const ChangePasswordSchema = (t: any) =>
    z
        .object({
            oldPassword: passwordValidator({
                minLength: PASSWORD_MIN_LENGTH,
                requireMsg: t("validation.password_required"),
                tooShortMsg: t("validation.password_min", { length: PASSWORD_MIN_LENGTH }),
            }),
            newPassword: passwordValidator({
                minLength: PASSWORD_MIN_LENGTH,
                requireMsg: t("validation.password_required"),
                tooShortMsg: t("validation.password_min", { length: PASSWORD_MIN_LENGTH }),
            }),
            confirmPassword: z
                .string()
                .nonempty(t("validation.confirm_password_required"),),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
            message: t("validation.passwords_do_not_match"),
            path: ["confirmPassword"],
        });

export type ChangePasswordSchemaType = z.infer<
    ReturnType<typeof ChangePasswordSchema>
>;
