import { Metadata } from "next";

import { ForgotPasswordForm } from "@/features/auth/forms/ForgotPasswordForm";
import { getAppTranslation } from "@/shared/lib/getTranslations";

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const { t } = await getAppTranslation(locale, "auth");

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