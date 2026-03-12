import { Metadata } from "next";

import { ForgotPasswordForm } from "@/features/auth/forms/ForgotPasswordForm";
import { getAppTranslation } from "@/shared/lib/getTranslations";

export async function generateMetadata(): Promise<Metadata> {
    const { t } = await getAppTranslation("auth");

    return {
        title: t("forgetPassword"),
        robots: {
            index: false,
            follow: false,
        },
    };
}


export default function ForgetPasswordPage() {
    return <ForgotPasswordForm />
}