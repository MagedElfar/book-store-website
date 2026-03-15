import { Metadata } from "next";

import { SignupForm } from "@/features/auth/forms/SignupForm";
import { getAppTranslation } from "@/shared/lib/getTranslations";

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const { t } = await getAppTranslation(locale, "auth");

    return {
        title: t("signup"),
        robots: {
            index: false,
            follow: false,
        },
    };
}


export default function SignUpPage() {
    return <SignupForm />
}