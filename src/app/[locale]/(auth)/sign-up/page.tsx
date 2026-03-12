import { Metadata } from "next";

import { SignupForm } from "@/features/auth/forms/SignupForm";
import { getAppTranslation } from "@/shared/lib/getTranslations";

export async function generateMetadata(): Promise<Metadata> {
    const { t } = await getAppTranslation("auth");

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