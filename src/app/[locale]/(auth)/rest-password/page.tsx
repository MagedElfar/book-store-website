import { Metadata } from "next";

import { ResetPasswordForm } from "@/features/auth/forms/ResetPasswordForm";
import { getAppTranslation } from "@/shared/lib/getTranslations";

export async function generateMetadata(): Promise<Metadata> {
    const { t } = await getAppTranslation("auth");

    return {
        title: t("restPassword"),
        robots: {
            index: false,
            follow: false,
        },
    };
}


export default function ResetPasswordPage() {
    return <ResetPasswordForm />
}