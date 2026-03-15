import { Metadata } from "next";

import { LoginForm } from "@/features/auth/forms/LoginForm";
import { getAppTranslation } from "@/shared/lib/getTranslations";

interface Props {
    params: Promise<{ locale: string }>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const { t } = await getAppTranslation(locale, "auth");

    return {
        title: t("signin"),
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default function SignInPage() {
    return <LoginForm />
}