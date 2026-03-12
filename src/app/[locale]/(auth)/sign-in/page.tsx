import { Metadata } from "next";

import { LoginForm } from "@/features/auth/forms/LoginForm";
import { getAppTranslation } from "@/shared/lib/getTranslations";

export async function generateMetadata(): Promise<Metadata> {
    const { t } = await getAppTranslation("auth");

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