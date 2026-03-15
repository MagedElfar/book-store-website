import { Metadata } from "next";

import { ResetPasswordForm } from "@/features/auth/forms/ResetPasswordForm";
import { getAppTranslation } from "@/shared/lib/getTranslations";

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const { t } = await getAppTranslation(locale, "auth");

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